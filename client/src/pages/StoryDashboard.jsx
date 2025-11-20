// client/src/pages/StoryDashboard.jsx
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const StoryDashboard = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("gameAnswers");
    if (saved) {
      setAnswers(JSON.parse(saved));
      // don't remove immediately; optional: localStorage.removeItem('gameAnswers');
    } else {
      navigate("/game");
    }
  }, [navigate]);

  const { data: storyData, isLoading, error, refetch } = useQuery({
    queryKey: ["story", answers],
    queryFn: async () => {
      if (!answers) throw new Error("No answers");
      const res = await api.post("/api/story/generate", { answers });
      return res.data;
    },
    enabled: !!answers,
    retry: 1,
  });

  useEffect(() => {
    setCurrentScene(0);
  }, [storyData]);

  const speakStory = () => {
    if (!storyData || isPlaying) return;
    const utterance = new SpeechSynthesisUtterance(storyData.storyText);
    utterance.lang = "ar-SA";
    utterance.rate = 0.9;
    setIsPlaying(true);

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setCurrentScene((prev) => {
        if (!storyData.scenes) return prev;
        if (prev < storyData.scenes.length - 1) return prev + 1;
        return prev;
      });
      if (idx > (storyData.scenes?.length || 1) * 2) {
        clearInterval(interval);
      }
    }, 5000);

    utterance.onend = () => {
      clearInterval(interval);
      setIsPlaying(false);
    };

    speechSynthesis.speak(utterance);
  };

  if (!answers) return null; // navigating back handled by effect
  if (isLoading) return <div className="flex items-center justify-center min-h-screen">جاري إنشاء قصتك...</div>;
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
      خطأ في إنشاء القصة: {error.message}
      <div className="mt-4">
        <button onClick={() => refetch()} className="px-4 py-2 bg-emerald-500 text-white rounded">حاول مرة أخرى</button>
      </div>
    </div>
  );

  const { storyText, scenes = [] } = storyData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4" dir="rtl">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 space-y-6">
        <div className="text-center">
          <button onClick={speakStory} disabled={isPlaying} className="bg-emerald-500 text-white px-8 py-4 rounded-lg font-bold text-xl">
            {isPlaying ? "جاري التشغيل..." : "شغّل القصة"}
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-600 text-center mb-6">هذه هي قصتك!</h1>

          <div className="relative overflow-hidden rounded-2xl mb-6">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentScene * 100}%)` }}>
              {scenes.map((scene, idx) => (
                <div key={idx} className="w-full flex-shrink-0">
                  {/* If you later generate images on the backend, scene.imageUrl should be available */}
                  {scene.imageUrl ? (
                    <img src={scene.imageUrl} alt={`scene-${idx}`} className="w-full h-64 object-cover rounded-lg" />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600 px-4">{scene.paragraph}</p>
                    </div>
                  )}
                  <p className="text-center text-gray-700 mt-2">{scene.paragraph}</p>
                </div>
              ))}
            </div>

            {scenes.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {scenes.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentScene(idx)} className={`w-3 h-3 rounded-full ${idx === currentScene ? "bg-teal-600" : "bg-gray-300"}`} />
                ))}
              </div>
            )}
          </div>

          <div className="prose max-w-none text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{storyText}</div>

          <div className="text-center mt-10">
            <button onClick={() => navigate("/game")} className="flex items-center gap-3 mx-auto bg-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg">
              🔄 العب مرة أخرى
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
      `}</style>
    </div>
  );
};

export default StoryDashboard;

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const feedbackOptions = [
  { id: 1, label: "Very Happy", img: "/faces/very-happy.png" },
  { id: 2, label: "Happy", img: "/faces/happy.png" },
  { id: 3, label: "Neutral", img: "/faces/neutral.png" },
  { id: 4, label: "Sad", img: "/faces/sad.png" },
];

const StoryDashboard = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);

  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("gameAnswers");
    if (saved) setAnswers(JSON.parse(saved));
    else navigate("/game");
  }, [navigate]);

  const { data: storyData, isLoading, error, refetch } = useQuery({
    queryKey: ["story", answers],
    enabled: !!answers,
    staleTime: Infinity,
    retry: 1,
    queryFn: async () => {
      const res = await api.post("/api/story/generate", { answers });
      return res.data;
    },
  });

  useEffect(() => {
    if (storyData) setCurrentScene(0);
  }, [storyData]);

  const speakStory = () => {
    if (!storyData || isPlaying) return;

    window.speechSynthesis.cancel();
    setIsPlaying(true);

    const utterance = new SpeechSynthesisUtterance(storyData.storyText);
    utterance.lang = "ar-SA";
    utterance.rate = 0.9;

    const interval = setInterval(() => {
      setCurrentScene((prev) => {
        if (!storyData.scenes) return prev;
        if (prev < storyData.scenes.length - 1) return prev + 1;
        return prev;
      });
    }, 6000);

    utterance.onend = () => {
      clearInterval(interval);
      setIsPlaying(false);
      setShowFeedback(true);
    };

    speechSynthesis.speak(utterance);
  };

  const submitFeedback = () => {
    if (!selectedFeedback) return;
    console.log("Story feedback:", selectedFeedback);
    setShowFeedback(false);
    setSelectedFeedback(null);
  };

  const nextScene = () => {
    if (currentScene < (storyData?.scenes?.length || 0) - 1)
      setCurrentScene((p) => p + 1);
  };

  const prevScene = () => {
    if (currentScene > 0) setCurrentScene((p) => p - 1);
  };

  if (!answers) return null;

  if (isLoading)
    return (
      <div className="relative min-h-screen flex items-center justify-center text-xl font-bold">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/generating-story-bg.mp4"
        />
        <h2 className="relative z-10 text-white">
          جاري تأليف قصتك ورسم المشاهد ...
        </h2>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 text-red-500 font-bold">
          حدث خطأ أثناء إنشاء القصة
        </p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 bg-emerald-700 text-white rounded-full"
        >
          حاول مرة أخرى
        </button>
      </div>
    );

  const { scenes = [] } = storyData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden" dir="rtl">
      <Navbar />

      {/* Carousel */}
      <div className="w-full h-[calc(85vh-80px)] relative overflow-hidden rounded-3xl bg-gray-100" dir="ltr">
        <div
          className="flex transition-transform duration-500 h-full"
          style={{ transform: `translateX(-${currentScene * 100}%)` }}
        >
          {scenes.map((scene, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0 relative">
              <img
                src={scene.imageUrl}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white p-4 text-right">
                {scene.paragraph}
              </div>
            </div>
          ))}
        </div>

        {scenes.length > 1 && (
          <>
            <button
              onClick={prevScene}
              disabled={currentScene === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={nextScene}
              disabled={currentScene === scenes.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={speakStory}
          disabled={isPlaying}
          className={`px-8 py-3 rounded-full font-bold ${
            isPlaying ? "bg-gray-400" : "bg-orange-500 text-white"
          }`}
        >
          {isPlaying ? "🔊 جاري القراءة..." : "▶️ استمع للقصة"}
        </button>
      </div>

      {/* Feedback Overlay */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-400/60 to-teal-50/60 backdrop-blur-sm">
          <div className="bg-white/80 rounded-3xl p-8 shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-6">كيف كانت القصة؟</h2>

            <div className="flex gap-6 flex-wrap justify-center">
              {feedbackOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedFeedback(opt.id)}
                  className={`relative w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[300px] md:h-[300px]
                  rounded-full overflow-hidden border-2 shadow-md transition-transform duration-300
                  ${
                    selectedFeedback === opt.id
                      ? "border-sky-500 scale-110 shadow-lg"
                      : "border-gray-300 hover:scale-110"
                  }`}
                >
                  <img
                    src={opt.img}
                    alt={opt.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <button
              onClick={submitFeedback}
              disabled={!selectedFeedback}
              className="mt-8 px-10 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg disabled:opacity-50"
            >
              إرسال التقييم
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryDashboard;
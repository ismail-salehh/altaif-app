// client/src/pages/StoryDashboard.jsx
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"; // Assuming Heroicons are installed; install via npm if needed

const StoryDashboard = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("gameAnswers");
    if (saved) {
      setAnswers(JSON.parse(saved));
    } else {
      navigate("/game");
    }
  }, [navigate]);

  const {
    data: storyData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["story", answers],
    queryFn: async () => {
      if (!answers) throw new Error("No answers");
      const res = await api.post("/api/story/generate", { answers });
      return res.data;
    },
    enabled: !!answers,
    retry: 1,
    staleTime: Infinity, // Don't refetch automatically
  });

  // Reset to scene 0 when data loads
  useEffect(() => {
    if (storyData) setCurrentScene(0);
  }, [storyData]);

  const speakStory = () => {
    if (!storyData || isPlaying) return;
    const utterance = new SpeechSynthesisUtterance(storyData.storyText);
    utterance.lang = "ar-SA";
    utterance.rate = 0.9;
    setIsPlaying(true);

    // Simple timer to approximate scene changes based on total text length
    // (A more advanced version would split audio by paragraph)
    const totalDuration = storyData.storyText.length * 100; // rough estimate
    const timePerScene = totalDuration / (storyData.scenes.length || 1);

    const interval = setInterval(() => {
      setCurrentScene((prev) => {
        if (!storyData.scenes) return prev;
        if (prev < storyData.scenes.length - 1) return prev + 1;
        return prev;
      });
    }, 6000); // Switch every 6 seconds roughly

    utterance.onend = () => {
      clearInterval(interval);
      setIsPlaying(false);
    };

    speechSynthesis.speak(utterance);
  };

  // Helper to get full image URL
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${path}`;
  };

  // Manual Navigation
  const nextScene = () => {
    if (currentScene < (storyData?.scenes?.length || 0) - 1) {
      setCurrentScene((prev) => prev + 1);
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setCurrentScene((prev) => prev - 1);
    }
  };

  if (!answers) return null;
  if (isLoading)
    return (
      <div className="relative min-h-screen flex items-center justify-center text-xl font-bold text-emerald-600">
        <video
          autoPlay
          muted
          loop
          playsInline
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
      <div className="flex flex-col bg-teal-300 items-center justify-center min-h-screen text-red-500 font-bold">
        <p className="text-xl mb-4">حدث خطأ أثناء إنشاء القصة</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 bg-emerald-700 text-white rounded-full hover:bg-emerald-900 transition"
        >
          حاول مرة أخرى
        </button>
      </div>
    );

  const { storyText, scenes = [] } = storyData;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pb-10 relative overflow-hidden"
      dir="rtl"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="/videos/generating-story-bg.mp4"
      />
      <div className="relative z-10">
        <Navbar />
        {/* Full-screen Carousel Below Navbar */}
        <div
          className="w-full h-[calc(100vh-80px)] relative overflow-hidden rounded-3xl bg-gray-100 group"
          dir="ltr"
        >
          <div
            className="flex transition-transform duration-500 ease-out h-full w-full"
            style={{ transform: `translateX(-${currentScene * 100}%)` }}
          >
            {scenes.map((scene, idx) => (
              <div key={idx} className="w-full flex-shrink-0 h-full relative">
                {scene.imageUrl ? (
                  <img
                    src={getImageUrl(scene.imageUrl)}
                    alt={`Scene ${idx + 1}`}
                    className="w-full h-full object-cover rounded-b-3xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/800x450?text=Image+Loading+Error";
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-end bg-gray-200"
                    dir="rtl"
                  >
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm text-white p-6 text-right">
                      <p className="text-base md:text-xl leading-relaxed">
                        {scene.paragraph}
                      </p>
                    </div>
                  </div>
                )}

                {/* Caption Overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 text-right rounded-b-3xl"
                  dir="rtl"
                >
                  <p className="text-sm md:text-base line-clamp-2">
                    {scene.paragraph}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows (Only visible if > 1 scene) */}
          {scenes.length > 1 && (
            <>
              {/* Left Arrow (Previous) */}
              <button
                onClick={prevScene}
                disabled={currentScene === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-teal-800 p-2 rounded-full shadow-lg disabled:opacity-30 z-10"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>

              {/* Right Arrow (Next) */}
              <button
                onClick={nextScene}
                disabled={currentScene === scenes.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-teal-800 p-2 rounded-full shadow-lg disabled:opacity-30 z-10"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {scenes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentScene(idx)}
                className={`w-3 h-3 rounded-full transition-all shadow ${
                  idx === currentScene
                    ? "bg-orange-500 scale-125"
                    : "bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Controls Below Carousel */}
        <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
          <div class="flex justify-center space-x-4 dir-rtl">
            <button
              onClick={speakStory}
              disabled={isPlaying}
              className={`px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all transform hover:scale-105 ${
                isPlaying
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              {isPlaying ? "🔊 جاري القراءة..." : "▶️ استمع للقصة"}
            </button>
            <button
              onClick={() => navigate("/game")}
              className="bg-teal-600 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-700 transition shadow-lg"
            >
              🔄 اصنع قصة جديدة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDashboard;

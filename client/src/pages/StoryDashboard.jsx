// client/src/pages/StoryDashboard.jsx
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const StoryDashboard = () => {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load answers
  useEffect(() => {
    const saved = localStorage.getItem("gameAnswers");
    if (!saved) {
      navigate("/game");
      return;
    }
    setAnswers(JSON.parse(saved));
  }, [navigate]);

  // Fetch story
  const {
    data: storyData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["story", answers],
    enabled: !!answers,
    staleTime: Infinity,
    retry: 1,
    queryFn: async () => {
      const res = await api.post("/api/story/generate", { answers });
      return res.data;
    },
  });

  // Reset scene when story loads
  useEffect(() => {
    if (storyData?.scenes?.length) {
      setCurrentScene(0);
    }
  }, [storyData]);

  // Stop speech on scene change
  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, [currentScene]);

  // Text-to-speech
  const speakScene = () => {
    if (!storyData?.scenes?.length) return;

    const text = storyData.scenes[currentScene]?.paragraph;
    if (!text) return;

    window.speechSynthesis.cancel();
    setIsPlaying(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find((v) => v.lang.startsWith("ar"));
    if (arabicVoice) utterance.voice = arabicVoice;

    utterance.onend = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const nextScene = () => {
    if (currentScene < storyData.scenes.length - 1) {
      setCurrentScene((s) => s + 1);
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setCurrentScene((s) => s - 1);
    }
  };

  if (!answers) return null;

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center text-xl font-bold text-white">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/generating-story-bg.mp4"
        />
        <div className="relative z-10">جاري تأليف قصتك...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600">
        <p className="text-xl mb-4">حدث خطأ أثناء إنشاء القصة</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 bg-emerald-600 text-white rounded-full"
        >
          حاول مرة أخرى
        </button>
      </div>
    );
  }

  const { scenes = [] } = storyData;

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
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 pointer-events-none"
        src="/videos/generating-story-bg.mp4"
      />

      <div className="relative z-10">
        <Navbar />

        {/* Carousel */}
        <div
          className="w-full max-w-5xl mx-auto h-[60vh] md:h-[70vh] mt-6 relative overflow-hidden rounded-3xl bg-black shadow-2xl"
          dir="ltr"
        >
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentScene * 100}%)` }}
          >
            {scenes.map((scene, idx) => (
              <div
                key={idx}
                className="w-full flex-shrink-0 h-full relative"
              >
                <img
                  src={scene.imageUrl}
                  alt={`Scene ${idx + 1}`}
                  className="w-full h-full object-contain bg-black"
                  loading="lazy"
                />

                {/* Caption */}
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent text-white p-6 pt-12 text-right"
                  dir="rtl"
                >
                  <p className="text-lg md:text-xl leading-relaxed font-medium">
                    {scene.paragraph}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {scenes.length > 1 && (
            <>
              <button
                onClick={prevScene}
                disabled={currentScene === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition disabled:opacity-0"
              >
                <ChevronLeftIcon className="w-8 h-8" />
              </button>

              <button
                onClick={nextScene}
                disabled={currentScene === scenes.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition disabled:opacity-0"
              >
                <ChevronRightIcon className="w-8 h-8" />
              </button>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="max-w-2xl mx-auto mt-8 flex justify-center gap-4 flex-wrap">
          <button
            onClick={speakScene}
            disabled={isPlaying}
            className={`px-8 py-3 rounded-full font-bold text-lg transition ${
              isPlaying
                ? "bg-gray-400 text-gray-700"
                : "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
            }`}
          >
            {isPlaying ? "🔊 جاري القراءة..." : "▶️ استمع للمشهد"}
          </button>

          <button
            onClick={() => navigate("/game")}
            className="px-8 py-3 bg-white text-teal-700 border-2 border-teal-100 rounded-full font-bold"
          >
            🔄 قصة جديدة
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryDashboard;
// client/src/pages/StoryDashboard.jsx
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"; 

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
    staleTime: Infinity,
  });

  // Reset to scene 0 when data loads
  useEffect(() => {
    if (storyData) setCurrentScene(0);
  }, [storyData]);

  const speakStory = () => {
    if (!storyData) return;
    window.speechSynthesis.cancel();
    setIsPlaying(true);

    const currentText = scenes[currentScene]?.paragraph;
    if (!currentText) return;

    const utterance = new SpeechSynthesisUtterance(currentText);
    utterance.lang = "ar-SA"; // Force Arabic
    utterance.rate = 0.9;

    // Attempt to pick a good voice
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.includes("ar"));
    if (arabicVoice) utterance.voice = arabicVoice;

    utterance.onend = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Stop audio if user changes scene manually
  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, [currentScene]);

  // Helper to get full image URL
  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/800x450?text=No+Image";
    return path;
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
      <div className="flex flex-col bg-teal-50 items-center justify-center min-h-screen text-red-600 font-bold p-4">
        <p className="text-xl mb-4">حدث خطأ أثناء إنشاء القصة</p>
        <p className="text-sm text-gray-500 mb-6 font-mono bg-gray-200 p-2 rounded">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition shadow-lg"
        >
          حاول مرة أخرى ↻
        </button>
      </div>
    );

  console.log(storyData)

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
    </div>
  );
};

export default StoryDashboard;

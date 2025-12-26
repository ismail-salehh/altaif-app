import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const feedbackOptions = [
  { id: 1, label: "Very Happy", img: "/images/feedback/very-happy.png" },
  { id: 2, label: "Happy", img: "/images/feedback/happy.png" },
  { id: 3, label: "Neutral", img: "/images/feedback/neutral.png" },
  { id: 4, label: "Not Happy", img: "/images/feedback/not-happy.png" },
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

  useEffect(() => {
    if (storyData) setCurrentScene(0);
  }, [storyData]);

  const speakStory = () => {
    if (!storyData || isPlaying) return;

    window.speechSynthesis.cancel();
    setIsPlaying(true);
    setCurrentScene(0);

    const speakScene = (index) => {
      if (index >= storyData.scenes.length) {
        setIsPlaying(false);
        setShowFeedback(true);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(
        storyData.scenes[index].paragraph
      );
      utterance.lang = "ar-SA";
      utterance.rate = 0.9;

      utterance.onend = () => {
        setCurrentScene(index + 1);
        speakScene(index + 1);
      };

      speechSynthesis.speak(utterance);
    };

    speakScene(0);
  };

  const nextScene = () => {
    if (currentScene < storyData.scenes.length - 1)
      setCurrentScene((p) => p + 1);
  };

  const prevScene = () => {
    if (currentScene > 0) setCurrentScene((p) => p - 1);
  };

  if (!answers) return null;

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/generating-story-bg.mp4"
        />
        <h2 className="relative z-10 text-white text-xl font-bold">
          جاري تأليف قصتك ورسم المشاهد ...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 text-red-500 font-bold">حدث خطأ أثناء إنشاء القصة</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 bg-emerald-700 text-white rounded-full"
        >
          حاول مرة أخرى
        </button>
      </div>
    );
  }

  const { scenes = [] } = storyData;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-300 to-teal-100 overflow-hidden"
      dir="rtl"
    >
      <Navbar />

      {/* Carousel */}
      <div
        className="relative w-full h-[calc(85vh-80px)] overflow-hidden rounded-3xl bg-gray-100"
        dir="ltr"
      >
        {/* TRACK */}
        <div
          className="flex w-full h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentScene * 100}%)` }}
        >
          {scenes.map((scene, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0 relative">
              <img
                src={scene.imageUrl}
                alt={`Scene ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white p-4 text-right">
                {scene.paragraph}
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        {scenes.length > 1 && (
          <>
            <button
              onClick={prevScene}
              disabled={isPlaying || currentScene === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <button
              onClick={nextScene}
              disabled={isPlaying || currentScene === scenes.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={speakStory}
          disabled={isPlaying}
          className={`px-8 py-3 rounded-full font-bold ${
            isPlaying ? "bg-gray-400" : "bg-pink-500 text-white"
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
                  className={`relative w-[160px] h-[160px] rounded-full overflow-hidden border-2 transition ${
                    selectedFeedback === opt.id
                      ? "border-sky-500 scale-110"
                      : "border-gray-300 hover:scale-105"
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
              onClick={() => setShowFeedback(false)}
              disabled={!selectedFeedback}
              className="mt-8 px-10 py-4 bg-emerald-600 text-white rounded-full font-bold disabled:opacity-50"
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

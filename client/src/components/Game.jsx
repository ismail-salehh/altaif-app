import React, { useEffect, useState, useRef, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Added missing imports
import imageMap from "../utils/imageMap.js";
import { gameData } from "../utils/gameData.js";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdventureGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [questions, setQuestions] = useState(gameData);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [background, setBackground] = useState("assets/images/game-dashboard.jpg");
  
  const { logout } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const {
  mutate: logoutMutation,
  isPending,
  isError,
  error,
  } = useMutation({
    mutationFn: async () => {
      return await logout();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["authUser"] });
        // Optional but recommended: Redirect to login page
      navigate("/login", { replace: true }); // Replace to avoid back-button issues
    },
    onError: (err) => {
      console.error("Logout mutation failed:", err);
      // Optionally show a toast or alert, but since backend logout is idempotent, you could still clear cache here
      queryClient.removeQueries({ queryKey: ["authUser"] });
    },
  });
  
  const questionAudioRef = useRef(null);
  const choiceAudioRef = useRef(null);

  const currentNode = currentBranch || questions[currentIndex];

  const playSound = (filename) => {
    if (!filename) return;
    const audio = new Audio(`/sounds/${filename}.mp3`);
    audio.play().catch(() => {});
  };

  useEffect(() => {
    if (currentNode?.soundname) {
      playSound(currentNode.soundname.toLowerCase());
    }
  }, [currentIndex, currentBranch]);

  const updateBackground = () => {
    let currentQuestion = currentNode?.question;
    let context = "root";

    if (selectedAnswers.length > 0) {
      const lastAnswer = selectedAnswers[selectedAnswers.length - 1];
      if (["Beach", "Mountain", "City", "Space", "Jungle"].includes(lastAnswer)) {
        context = lastAnswer;
      }
    }

    let imageKey =
      currentBranch && context !== "root"
        ? `${context}:${currentQuestion}`
        : `root:${currentQuestion}`;

    if (!imageMap[imageKey] && currentBranch) {
      const firstOptionText = currentBranch.options?.[0]?.text || "";
      imageKey = `${context}:${firstOptionText}`;
    } else if (!imageMap[imageKey]) {
      const firstOptionText = questions[currentIndex]?.options?.[0]?.text || "";
      imageKey = `root:${firstOptionText}`;
    }

    let image = imageMap[imageKey] || "game-dashboard.jpg";
    setBackground(`images/${image}`);
  };

  const handleChoice = (selected) => {
    setSelectedAnswers((prev) => [...prev, selected]);

    if (currentBranch) {
      const nextNode = currentBranch.branches?.[selected];
      if (nextNode) {
        setCurrentBranch(nextNode);
      } else {
        showEnd();
      }
    } else {
      const nextIndex = currentIndex + 1;
      if (nextIndex < questions.length && !questions[nextIndex].branches) {
        setCurrentIndex(nextIndex);
      } else if (nextIndex < questions.length && questions[nextIndex].branches) {
        setCurrentIndex(nextIndex);
        setCurrentBranch(questions[nextIndex]);
      } else {
        showEnd();
      }
    }
  };

  const showEnd = () => {
    setCurrentBranch({
      question: "! هيا لنستمع لهذه القصة معا",
    });
    playSound("theend");
  };

  useEffect(() => {
    updateBackground();
  }, [currentIndex, currentBranch, selectedAnswers]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-comic-sans">
      {/* Background */}
      <img
        src={background}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-10 transition-opacity duration-500"
      />

      {/* Logout Button */}
      <button
        onClick={() => logoutMutation()} // Added () to call mutate properly
        disabled={isPending} // Disable during logout
        className="absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
        title={isPending ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
      >
        {isPending ? "جاري الخروج..." : "تسجيل الخروج"}
      </button>
      {isError && (
        <p className="absolute top-20 right-4 z-50 text-red-300 text-sm bg-black/80 p-2 rounded">
          خطأ في تسجيل الخروج: {error?.message || "جرب مرة أخرى"}
        </p>
      )} {/* Added error display */}

      {/* Friendly Character */}
      <div className="absolute left-[10%] top-[25%] w-[180px] md:w-[240px]">
        <img
          src="images/friendly-friend.gif"
          alt="Friendly Character"
          className="w-full h-auto"
        />
      </div>

      {/* Captions */}
      <div className="absolute left-[25%] top-[10%] -translate-x-1/2 bg-black/90 border-4 border-white text-center text-white text-xl sm:text-2xl rounded-xl shadow-lg p-4 md:p-6 transition-opacity duration-700">
        <p>{currentNode?.question}</p>
        <div className="absolute left-[30%] top-full -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[24px] border-l-transparent border-r-transparent border-t-white" />
      </div>

      {/* Choices */}
      <div
        className="absolute top-[50%] left-[65%] -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center items-center gap-x-20 gap-y-8 w-[90%] max-w-[800px] md:gap-x-16 md:gap-y-12"
      >
        {currentNode?.options?.map((option, index) => {
          const choiceSound = option.choice.replace(/\s+/g, "").toLowerCase();
          return (
            <button
              key={index}
              onClick={() => handleChoice(option.choice)}
              onMouseEnter={() => playSound(choiceSound)}
              style={{ animationDelay: `${index * 0.2}s` }}
              className="relative w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden border-2 border-sky-500 shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-300 ease-out"
            >
              {option.media.endsWith(".mp4") ? (
                <video
                  src={`images/${option.media}`}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={`images/${option.media}`}
                  alt={option.choice}
                  className="w-full h-full object-cover"
                />
              )}
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 text-sm sm:text-base px-3 py-1 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300">
                {option.choice}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AdventureGame;

import React, { useEffect, useState, useRef, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Added missing imports
import { gameData } from "../utils/gameData.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const Game = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [questions, setQuestions] = useState(gameData);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const navigate = useNavigate();

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
      } else if (
        nextIndex < questions.length &&
        questions[nextIndex].branches
      ) {
        setCurrentIndex(nextIndex);
        setCurrentBranch(questions[nextIndex]);
      } else {
        showEnd();
      }
    }
  };

  const showEnd = () => {
    // Save answers for story gen
    localStorage.setItem("gameAnswers", JSON.stringify(selectedAnswers));

    setCurrentBranch({
      question: "! هيا لنستمع لهذه القصة معا",
      options: [],
    });

    // Navigate after short delay
    setTimeout(() => {
      navigate("/story-dashboard");
    }, 3000); // 3s delay for end sound
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden bg-black text-white font-comic-sans"
      style={{
        backgroundImage: "url(/images/game/background.jpg)",
      }}
    >
      <Navbar />
      <div className="">
        {/* Added error display */}
        {/* Friendly Character */}
        <div className="absolute left-[10%] top-[30%] w-[180px] md:w-[240px]">
          <img
            src="images/game/friendly-friend.gif"
            alt="Friendly Character"
            className="w-full h-auto"
          />
        </div>
        {/* Captions */}
        <div className="absolute left-[25%] top-[15%] -translate-x-1/2 bg-white border-4 border-white text-center text-black text-xl font-bold sm:text-2xl rounded-xl shadow-lg p-4 md:p-6 transition-opacity duration-700">
          <p>{currentNode?.question}</p>
          <div className="absolute left-[30%] top-full -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[24px] border-l-transparent border-r-transparent border-t-white" />
        </div>
        {/* Choices */}
        <div className="absolute top-[50%] left-[65%] -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center items-center gap-x-20 gap-y-8 w-[90%] max-w-[800px] md:gap-x-16 md:gap-y-12">
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
                    src={`videos/game/${option.media}`}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={`images/game/${option.media}`}
                    alt={option.choice}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Game;

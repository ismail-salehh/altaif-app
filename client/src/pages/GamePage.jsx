import React, { use, useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Game from "./Game";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";

const GamePage = () => {
  const navigate = useNavigate();
  const { me } = useContext(AuthContext);
  
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      return await me();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
    retry: false, // Don't retry on failure
  });

  const isGuest = !authUser;

  const [showAuthModal, setShowAuthModal] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  // If guest → show two centered buttons
  if (isGuest) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            اختر طريقة اللعب
          </h1>

          {/* Play as Guest */}
          <button
            onClick={() => navigate("/game")} // or navigate(0) if already on same page
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-emerald-600 transition"
          >
            العب مباشرة كضيف
          </button>

          {/* Open AuthModal */}
          <button
            onClick={() => setShowAuthModal(true)}
            className="text-emerald-600 underline text-lg hover:text-emerald-700"
          >
            تسجيل الدخول أو إنشاء حساب
          </button>
        </div>

        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </div>
    );
  }

  // If authenticated → show full game
  return (
    <div>
      <Navbar />
      <Game isGuest={false} />
    </div>
  );
};

export default GamePage;

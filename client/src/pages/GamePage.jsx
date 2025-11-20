// client/src/pages/GamePage.jsx
import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Game from "./Game";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { AuthContext } from "../context/AuthContext";

const GamePage = () => {
  const navigate = useNavigate();
  const { user, isAuthLoading } = useContext(AuthContext);

  const isGuest = !user;
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  if (isGuest) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">اختر طريقة اللعب</h1>

          <button
            onClick={() => navigate("/game")}
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-emerald-600 transition"
          >
            العب مباشرة كضيف
          </button>

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

  // Authenticated
  return (
    <div>
      <Game isGuest={false} />
    </div>
  );
};

export default GamePage;
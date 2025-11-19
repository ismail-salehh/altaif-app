import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Index = () => {
  return (
    <div className="bg-gradient-to-br bg-cover bg-center bg-no-repeat relative w-full h-screen overflow-hidden from-emerald-50 to-teal-50 "
        style={{
          backgroundImage: "url(/images/website/Index-background.png)",
        }}>
      <Navbar />
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center"
      >
        <div className="max-w-4xl w-full space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900">
              مرحباً بك في الطيف
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              قصص مخصصة للأطفال من طيف التوحد – ابدأ مغامرتك الآن!
            </p>
          </div>

          {/* Play Button - Guest Access */}
          <Link
            to="/gamepage"
            className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-emerald-600 transition-colors shadow-lg transform hover:scale-105"
          >
             العب الآن (بدون تسجيل)
          </Link>

          {/* Footer About Link */}
          <div className="text-center">
            <Link
              to="/about"
              className="text-emerald-600 hover:text-emerald-700 text-sm underline"
            >
              تعرف على المشروع
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

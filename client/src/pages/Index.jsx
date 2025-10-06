import React, { useState } from "react";
import { Link } from "react-router-dom";
import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import Overlay from "../components/Overlay";

const Index = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => setIsSignUp(true);
  const toggleSignIn = () => setIsSignUp(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-teal-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <div
          id="container"
          className={`relative overflow-hidden w-[768px] max-w-full min-h-[480px] bg-white rounded-xl shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] mx-auto ${
            isSignUp ? "right-panel-active" : ""
          }`}
        >
          <SigninForm />
          <SignupForm isSignUp={isSignUp} />

          <Overlay
            isSignUp={isSignUp}
            toggleSignIn={toggleSignIn}
            toggleSignUp={toggleSignUp}
          />
        </div>

        {/* About Link */}
        <div className="text-center mt-8">
          <Link
            to="/about"
            className="text-emerald-600 hover:text-emerald-700 text-sm underline"
          >
            وصف مشروعنا
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
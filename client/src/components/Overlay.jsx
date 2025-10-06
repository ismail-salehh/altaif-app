import React from "react";

export default function Overlay({ isSignUp, toggleSignIn, toggleSignUp }) {
  return (
    <div
      className={`overlay-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-50 ${
        isSignUp ? "-translate-x-full" : ""
      }`}
    >
      <div
        className="overlay relative left-[-100%] h-full w-[200%] bg-cover bg-center bg-no-repeat transition-transform duration-600 ease-in-out flex"
        style={{
          backgroundImage: "url(/images/landing-bg.png)",
          backgroundSize: "50% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: isSignUp ? "left center" : "right center",
          transform: isSignUp ? "translateX(50%)" : "translateX(0)",
        }}
      >
        {/* Overlay Left Panel (Sign In Prompt) */}
        <div className="overlay-panel overlay-left absolute top-0 h-full w-1/2 flex flex-col items-center justify-center p-10 text-center text-black transform -translate-x-5 transition-transform duration-600 ease-in-out">
          <h1 className="text-3xl font-bold mb-10">!مرحبًا بك</h1>
          <h2 className="text-shadow-black font-bold mb-2"> لديك حساب؟ </h2>
          <button
            onClick={toggleSignIn}
            className="py-3 px-6 border border-white bg-gray-900 text-emerald-100 font-bold rounded-full uppercase tracking-wide text-sm hover:bg-white hover:text-gray-900 transition-colors"
          >
            سجّل الدخول
          </button>
        </div>

        {/* Overlay Right Panel (Sign Up Prompt) */}
        <div
          className={`overlay-panel overlay-right absolute top-0 right-0 h-full w-1/2 flex flex-col items-center justify-center p-10 text-center text-black transition-transform duration-600 ease-in-out ${
            isSignUp ? "translate-x-5" : ""
          }`}
        >
          <h1 className="text-3xl font-bold mb-4">
            مرحبًا بك في عالم القصص المصمّمة لطفلك
          </h1>

          <button
            onClick={toggleSignUp}
            className="py-3 px-6 border border-white bg-gray-900 text-emerald-100 font-bold rounded-full uppercase tracking-wide text-sm hover:bg-white hover:text-gray-900 transition-colors"
          >
            إنشاء حساب
          </button>
        </div>
      </div>
    </div>
  );
}

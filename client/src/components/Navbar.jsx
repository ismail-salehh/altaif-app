// /src/components/Navbar.jsx - Fixed with internal useQuery for auth
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  // Internal auth query (same as App.jsx)
  const { me } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: authUser, isLoading: authLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      return await me();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
    retry: false, // Don't retry on failure
  });
  const { logout } = useContext(AuthContext);

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

  if (authLoading) {
    return <nav className="bg-white shadow-md p-4">Loading...</nav>;
  }

  return (
    //add margin between buttons in the navbar
    <nav className="bg-opacity-100 shadow-md p-4 flex justify-between items-center ">
      {/* Logo and Home Link */}
      <Link
        to="/"
        className="bg-pink-500 px-2 py-2  rounded-3xl text-2xl font-bold text-white"
      >
        <img
          src="/StoryLogo.png"
          alt="Logo"
          className="h-8 inline-block mr-2"
        />
        الطيف
      </Link>

      {/* About */}
      <div className="flex items-center gap-4 space-x-4 space-x-reverse">
        {!window.location.pathname.startsWith("/game") && (
          <Link
            to="/gamepage"
            className="bg-emerald-500 text-white px-4 py-2 rounded-3xl hover:bg-emerald-600 transition-colors"
          >
            العب
          </Link>
        )}

        {authUser ? (
          <button
            onClick={() => logoutMutation()} // Added () to call mutate properly
            disabled={isPending} // Disable during logout
            title={isPending ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
            className="bg-white px-4 py-2 text-red-600 hover:underline"
          >
            تسجيل الخروج
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-white rounded-3xl px-4 py-2 text-emerald-600 hover:bg-emerald-800 transition-colors"
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-emerald-800 text-white px-4 py-2 rounded-3xl hover:bg-emerald-600 transition-colors"
            >
              إنشاء حساب
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

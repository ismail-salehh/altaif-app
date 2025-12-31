import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, logout, isAuthLoading } = useContext(AuthContext);

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });

  if (isAuthLoading) {
    return <nav className="bg-white shadow-md p-4">Loading...</nav>;
  }

  return (
    <nav className="bg-opacity-100 shadow-md p-4 flex justify-between items-center">
      <Link
        to="/"
        className="bg-pink-500 px-2 py-2 rounded-3xl text-2xl font-bold text-white"
      >
        <img src="/StoryLogo.png" alt="Logo" className="h-8 inline-block mr-2" />
        الطَّيف
      </Link>

      <div className="flex items-center gap-4">
        {!window.location.pathname.startsWith("/game") && (
          <Link
            to="/gamepage"
            className="bg-emerald-500 text-white px-4 py-2 rounded-3xl hover:bg-emerald-600"
          >
            العب
          </Link>
        )}

        {user ? (
          <button
            onClick={logoutMutation}
            disabled={isPending}
            className="bg-white px-4 py-2 text-red-600 hover:underline"
          >
            تسجيل الخروج
          </button>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>تسجيل الدخول</button>
            <button onClick={() => navigate("/register")}>إنشاء حساب</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
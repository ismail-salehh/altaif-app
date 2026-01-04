import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { string } from "joi";

const Navbar = () => {
  const { me, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
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

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      navigate("/", { replace: true });
    },
  });

  if (isAuthLoading) {
    return <nav className="bg-white shadow-md p-4">Loading...</nav>;
  }

  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <nav className="bg-opacity-100 shadow-md p-4 flex justify-between items-center ">
      {/* Logo and Home Link */}
      <Link
        to="/"
        className="bg-pink-500 px-2 py-2 rounded-3xl text-2xl font-bold text-white"
      >
        <img
          src="/StoryLogo.png"
          alt="Logo"
          className="h-8 inline-block mr-2"
        />
        الطَّيف
      </Link>

      {/* About */}
      <div className="hidden md:flex items-center gap-4 space-x-4 space-x-reverse">
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
            onClick={() => logoutMutation()}
            disabled={isPending}
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

      {/* Mobile Menu Button */}
      <div className="md:hidden" ref={menuRef}>
        <button
          className="bg-emerald-800 text-white px-4 py-2 rounded-3xl hover:bg-emerald-600 transition-colors"
          onClick={() => setOpen(!open)}
        >
          القائمة
        </button>

        {/* Mobile Menu */}
        {open && (
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-pink-500 shadow-lg transform transition-transform ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 flex flex-col gap-4">
              {authUser ? (
                <button
                  onClick={() => logoutMutation()}
                  disabled={isPending}
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
              {!window.location.pathname.startsWith("/game") && (
                <Link
                  to="/gamepage"
                  className="bg-emerald-500 text-white px-4 py-2 rounded-3xl hover:bg-emerald-600 transition-colors"
                >
                  العب
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

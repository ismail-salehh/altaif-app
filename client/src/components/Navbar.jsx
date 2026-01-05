import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user: authUser, logout, isAuthLoading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
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

  // Close menu on route change (mobile UX fix, no visual change)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  if (isAuthLoading) {
    return <nav className="bg-white shadow-md p-4">Loading...</nav>;
  }

  return (
    <nav className="bg-opacity-100 shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
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

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4 space-x-4 space-x-reverse">
        {!location.pathname.startsWith("/game") && (
          <Link
            to="/gamepage"
            className="bg-emerald-500 text-white px-4 py-2 rounded-3xl hover:bg-emerald-600"
          >
            العب
          </Link>
        )}

        {authUser ? (
          <button
            onClick={async () => {
              await logout();
              navigate("/", { replace: true });
            }}
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

      {/* Mobile Menu */}
      <div className="md:hidden" ref={menuRef}>
        <button
          className="bg-emerald-800 text-white px-4 py-2 rounded-3xl hover:bg-emerald-600 transition-colors"
          onClick={() => setOpen((prev) => !prev)}
        >
          القائمة
        </button>

        {open && (
          <div className="fixed top-0 right-0 h-full w-64 bg-pink-500 shadow-lg transform transition-transform translate-x-0">
            <div className="p-4 flex flex-col gap-4">
              {authUser ? (
                <button
                  onClick={async () => {
                    await logout();
                    navigate("/", { replace: true });
                  }}
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

              {!location.pathname.startsWith("/game") && (
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

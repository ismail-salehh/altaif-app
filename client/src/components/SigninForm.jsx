import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SigninForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setError] = useState(null);
  const { login, googleLogin } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      return await login({ email, password });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/game");
    },
  });

  const validateInputs = () => {
    const { email, password } = formData;
    if (!email || !password)
      return "املأ البريد البريد الالكتروني أو كلمة المرور";
    if (!/\S+@\S+\.\S+/.test(email)) return "البريد الالكتروني خاطئ";
    return null;
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      const userData = await googleLogin(credential);

      navigate("/game");
    } catch (err) {
      console.error(err);
      setError("فشل تسجيل الدخول باستخدام جوجل");
    }
  };

  const handleGoogleError = () => {
    setError("فشل تسجيل الدخول باستخدام جوجل");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) return setError(validationError);
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container sign-in-container absolute top-0 left-0 w-1/2 h-full z-10 transition-all duration-600 ease-in-out flex items-center justify-center p-12 text-center">
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">تسجيل الدخول</h1>

        <div className="social-container flex justify-center items-center space-x-4 mb-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="medium"
            text="sign_in_with_google"
            shape="rectangular"
          />
          <span className="text-xs text-gray-500 mb-0">
            أو الدخول باستخدام جوجل
          </span>
        </div>

        <input
          type="email"
          placeholder="البريد الالكتروني"
          name="email"
          className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
          onChange={handleInputChange}
          value={formData.email}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          name="password"
          className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
          onChange={handleInputChange}
          value={formData.password}
        />

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        {isError && <p className="text-red-500 text-sm">{error.message}</p>}

        <Link
          to="../forgot-password"
          className="text-xs text-emerald-600 hover:underline block mb-4"
        >
          هل نسيت كلمة المرور؟
        </Link>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-emerald-500 text-white font-bold rounded-lg uppercase tracking-wide text-sm transition-transform hover:scale-95 focus:outline-none"
          disabled={isPending}
        >
          {isPending ? "جاري الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
    </div>
  );
}

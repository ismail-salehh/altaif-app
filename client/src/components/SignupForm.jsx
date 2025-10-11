import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function SignupForm({ isSignUp }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setError] = useState(null);

  const { signup, googleLogin } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ username, email, password }) => {
      return await signup({ username, email, password });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/game");
    },
  });

  const validateInputs = () => {
    const { username, email, password } = formData;
    if (!username || !email || !password) return "الرجاء تعبئة جميع الحقول";
    if (username.length < 2) return "الاسم يجب أن يتكون من حرفين على الأقل";
    if (!/\S+@\S+\.\S+/.test(email)) return "الرجاء ادخال بريد الكتروني مناسب";
    if (password.length < 6) return "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل";
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
    if (validationError) {
      setError(validationError);
      return;
    }
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`form-container sign-up-container absolute top-0 left-0 w-1/2 h-full z-0 opacity-0 transition-all duration-600 ease-in-out flex items-center justify-center p-12 text-center ${
        isSignUp ? "opacity-100 z-20 translate-x-full" : "translate-x-full"
      }`}
    >
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">إنشاء حساب</h1>

        <div className="social-container flex justify-center space-x-4 mb-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="medium"
            text="signup_with_google"
            shape="rectangular"
          />
        </div>

        <span className="text-xs text-gray-500 block mb-4">
          أو التسجيل باستخدام جوجل
        </span>

        <input
          type="text"
          placeholder="الاسم"
          name="username"
          className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
          onChange={handleInputChange}
          value={formData.username}
        />
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

        <button
          type="submit"
          className="w-full py-3 px-6 bg-emerald-500 text-white font-bold rounded-lg uppercase tracking-wide text-sm transition-transform hover:scale-95 focus:outline-none"
          disabled={isPending}
        >
          {isPending ? "جاري التسجيل..." : "إنشاء حساب"}
        </button>
      </form>
    </div>
  );
}
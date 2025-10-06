import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SignupForm({ isSignUp }) {
  
  	const [formData, setFormData] = useState({
		username: "",
    email: "",
		password: "",
	});

  const { signup } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ username, email, password }) => {
      return await signup({ username, email, password });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <button className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <img
              src="/images/google-icon.webp"
              alt="Google"
              className="w-5 h-5"
            />
          </button>
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
        <button
          type="submit"
          className="w-full py-3 px-6 bg-emerald-500 text-white font-bold rounded-lg uppercase tracking-wide text-sm transition-transform hover:scale-95 focus:outline-none"
        >
          إنشاء حساب
        </button>
      </form>
    </div>
  );
}
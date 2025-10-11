import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("https://altaif-app.onrender.com/api/auth/forgot-password", { email });
      setMessage(res.data.message || "! تم إرسال رابط إعادة تعيين كلمة المرور الى بريدك الإلكتروني");
    } catch (err) {
      setMessage(err.response?.data?.message || "حدث خطأ في عملية الإرسال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          نسيت كلمة المرور
        </h2>

        <input
          type="email"
          placeholder="الرجاء ادخال بريد الكتروني"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 text-white font-bold py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          {loading ? "جاري الإرسال" : "إرسال"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;

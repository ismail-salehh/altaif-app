import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.put(`https://altaif-app.onrender.com/api/auth/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password.");
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
          إعادة تعيين كلمة المرور
        </h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 text-white font-bold py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          {loading ? "...جاري إعادة تعيين كلمة المرور" : "تم إعادة تعيين كلمة المرور"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;

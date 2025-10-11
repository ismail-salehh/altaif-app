import { BrowserRouter as Router,  Routes,  Route,  Navigate,} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Game from "./pages/GamePage";
import { useQuery } from "@tanstack/react-query";
import api from "./utils/api"; // Import api
import AboutPage from "./pages/AboutPage";
import About from "./pages/AboutPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgotPassword from "./pages/ForgotPassowrd";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await api.get("/api/auth/me"); // Uses cookies automatically
        const data = res.data; // Simplified—no await needed
        console.log("authUser is here:", data); // getMe returns { user }
        if (data.error) return null;
        return data.user; // Nested user
      } catch (error) {
        if (error.response?.status === 401) return null; // Graceful unauth
        console.error("Auth query error:", error.response?.data || error);
        throw error;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes—added here
    cacheTime: 10 * 60 * 1000, // 10 minutes—added here (use gcTime if React Query v5+)
  });

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                isLoading ? (
                  <div className="flex items-center justify-center min-h-screen">
                    Loading...
                  </div>
                ) : authUser ? (
                  <Game />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                isLoading ? (
                  <div className="flex items-center justify-center min-h-screen">
                    Loading...
                  </div>
                ) : !authUser ? (
                  <Index />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

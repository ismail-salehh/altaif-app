import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import GamePage from "./pages/GamePage"; // Fixed import
import { useQuery } from "@tanstack/react-query";
import api from "./utils/api"; // Import api
import AboutPage from "./pages/AboutPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgotPassword from "./pages/ForgotPassword"; // Fixed spelling
import ResetPassword from "./pages/ResetPassword";
import AuthModal from "./pages/AuthModal";
import Game from "./pages/Game";
import StoryDashboard from "./pages/StoryDashboard";

export default function App() {
  const isLoading = false;

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Landing: Always Index (hero with Play Now button) */}
            <Route
              path="/"
              element={
                isLoading ? (
                  <div className="flex items-center justify-center min-h-screen">
                    Loading...
                  </div>
                ) : (
                  <Index />
                )
              }
            />
            {/* Game: Always accessible (guest OK) */}
            <Route
              path="/gamepage"
              element={
                isLoading ? (
                  <div className="flex items-center justify-center min-h-screen">
                    Loading...
                  </div>
                ) : (
                  <GamePage />
                )
              }
            />
            <Route
              path="/game"
              element={<Game />}
            />
            {/* About */}
            <Route path="/about" element={<AboutPage />} />
            {/* Auth Routes (modals handle UI, but these for forgot/reset) */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            {/* Redirect /login to / (landing) - Auth via Navbar modal */}
            <Route path="/login" element={<AuthModal />} />
            <Route path="/story-dashboard" element={<StoryDashboard />} /> {/* New */}
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
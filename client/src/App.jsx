import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ErrorBoundary from './components/ErrorBoundary';
import Index from './pages/Index';
import GamePage from './pages/GamePage';
import AboutPage from './pages/AboutPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AuthModal from './pages/AuthModal';
import Game from './pages/Game';
import StoryDashboard from './pages/StoryDashboard';

export default function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route path="/"                      element={<ErrorBoundary><Index /></ErrorBoundary>} />
              <Route path="/gamepage"              element={<ErrorBoundary><GamePage /></ErrorBoundary>} />
              <Route path="/game"                  element={<ErrorBoundary><Game /></ErrorBoundary>} />
              <Route path="/about"                 element={<ErrorBoundary><AboutPage /></ErrorBoundary>} />
              <Route path="/forgot-password"       element={<ErrorBoundary><ForgotPassword /></ErrorBoundary>} />
              <Route path="/reset-password/:token" element={<ErrorBoundary><ResetPassword /></ErrorBoundary>} />
              <Route path="/login"                 element={<ErrorBoundary><AuthModal /></ErrorBoundary>} />
              <Route path="/story-dashboard"       element={<ErrorBoundary><StoryDashboard /></ErrorBoundary>} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
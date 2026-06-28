import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import AITutor from "./pages/AITutor";
import StudyPlan from "./pages/StudyPlan";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PrivateRoute from "./components/PrivateRoute";
import { isAuthenticated, logout } from "./api/auth";

function Layout() {
  const navigate = useNavigate();

  const authenticated = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-lg">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition"
          >
            🇯🇵 AI Study Buddy
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-3">

            <Link
              to="/"
              className="px-4 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              Home
            </Link>

            {authenticated ? (
              <>
                <Link
                  to="/quiz"
                  className="px-4 py-2 rounded-lg hover:bg-slate-800 transition"
                >
                  Quiz
                </Link>

                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-lg hover:bg-slate-800 transition"
                >
                  Dashboard
                </Link>

                <Link
                  to="/study-plan"
                  className="px-4 py-2 rounded-lg hover:bg-slate-800 transition"
                >
                  Study Plan
                </Link>

                <Link
                  to="/ai-tutor"
                  className="px-4 py-2 rounded-lg hover:bg-slate-800 transition"
                >
                  AI Tutor
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg hover:bg-slate-800 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}

          </nav>
        </div>
      </header>

      {/* Pages */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/quiz"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/study-plan"
            element={
              <PrivateRoute>
                <StudyPlan />
              </PrivateRoute>
            }
          />

          <Route
            path="/ai-tutor"
            element={
              <PrivateRoute>
                <AITutor />
              </PrivateRoute>
            }
          />

        </Routes>

      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
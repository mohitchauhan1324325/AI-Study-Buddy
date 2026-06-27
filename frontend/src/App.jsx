import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import AITutor from './pages/AITutor'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

            <h1 className="text-2xl font-bold text-blue-700">
              🇯🇵 AI Study Buddy
            </h1>

            <nav className="flex gap-4">

              <Link
                to="/"
                className="px-4 py-2 rounded-lg hover:bg-blue-100 font-medium text-gray-700"
              >
                Home
              </Link>

              <Link
                to="/quiz"
                className="px-4 py-2 rounded-lg hover:bg-blue-100 font-medium text-gray-700"
              >
                Quiz
              </Link>

              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg hover:bg-blue-100 font-medium text-gray-700"
              >
                Dashboard
              </Link>

              <Link
                to="/ai-tutor"
                className="px-4 py-2 rounded-lg hover:bg-blue-100 font-medium text-gray-700"
              >
                AI Tutor
              </Link>

            </nav>

          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/ai-tutor" element={<AITutor />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

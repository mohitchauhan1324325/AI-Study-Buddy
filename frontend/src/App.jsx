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
        <header className="border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-xl font-semibold">AI Study Buddy</Link>
            <nav className="flex gap-3">
              <Link to="/" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
              <Link to="/quiz" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Quiz</Link>
              <Link to="/ai-tutor" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">AI Tutor</Link>
              <Link to="/dashboard" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
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

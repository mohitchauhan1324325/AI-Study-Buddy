import { useState, useEffect } from 'react'


export default function Home() {

const [message, setMessage] = useState("");


    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
            <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100">Welcome to AI Study Buddy</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl">A lightweight companion to practice quizzes, review lessons, and get AI-powered tutoring.</p>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl">hy</p>
            <div className="flex gap-3">
                <a href="/quiz" className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700">Start Quiz</a>
                <a href="/ai-tutor" className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">Open AI Tutor</a>
            </div>
        </div>
    )
}

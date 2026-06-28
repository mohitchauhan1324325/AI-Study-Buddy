import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
    
    return (
        <div className="min-h-[85vh] flex items-center justify-center px-6">

            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">

                {/* Left */}

                <div>

                    <span className="inline-block bg-blue-500/20 text-blue-400 border border-blue-500 px-4 py-2 rounded-full text-sm font-medium">
                        🇯🇵 AI Powered JLPT Learning Platform
                    </span>

                    <h1 className="text-6xl font-extrabold text-white leading-tight mt-8">
                        Master
                        <span className="text-blue-400"> JLPT </span>
                        with your
                        <span className="text-cyan-400"> AI Study Buddy</span>
                    </h1>

                    <p className="text-slate-400 text-xl mt-8 leading-9">
                        Generate unlimited AI quizzes, learn with an AI tutor,
                        track your progress and prepare for the JLPT smarter.
                    </p>

                    <div className="flex gap-5 mt-10">

                        <Link
                            to="/quiz/setup"
                            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
                        >
                            🚀 Start AI Quiz
                        </Link>

                        <Link
                            to="/ai-tutor"
                            className="px-8 py-4 rounded-xl border border-blue-500 hover:bg-slate-800"
                        >
                            🤖 AI Tutor
                        </Link>

                    </div>

                </div>

                {/* Right */}

                <div className="grid grid-cols-2 gap-6">

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                        <div className="text-5xl">🧠</div>
                        <h2 className="text-2xl font-bold mt-5">
                            AI Quiz
                        </h2>
                        <p className="text-slate-400 mt-3">
                            Unlimited AI-generated JLPT questions.
                        </p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                        <div className="text-5xl">🤖</div>
                        <h2 className="text-2xl font-bold mt-5">
                            AI Tutor
                        </h2>
                        <p className="text-slate-400 mt-3">
                            Ask anything about Japanese grammar.
                        </p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                        <div className="text-5xl">📈</div>
                        <h2 className="text-2xl font-bold mt-5">
                            Dashboard
                        </h2>
                        <p className="text-slate-400 mt-3">
                            Analyze your learning progress.
                        </p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                        <div className="text-5xl">🎯</div>
                        <h2 className="text-2xl font-bold mt-5">
                            Study Plan
                        </h2>
                        <p className="text-slate-400 mt-3">
                            AI creates your daily JLPT roadmap.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}
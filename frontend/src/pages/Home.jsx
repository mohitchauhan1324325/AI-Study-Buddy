import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-[85vh] flex items-center justify-center px-6">

            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Side */}

                <div>

                    <span className="inline-block bg-blue-500/20 text-blue-400 border border-blue-500 px-4 py-2 rounded-full text-sm font-medium">
                        🇯🇵 AI Powered JLPT Learning Platform
                    </span>

                    <h1 className="text-6xl font-extrabold text-white leading-tight mt-8">

                        Master
                        <span className="text-blue-400"> JLPT </span>

                        with your

                        <span className="text-cyan-400">
                            {" "}AI Study Buddy
                        </span>

                    </h1>

                    <p className="text-slate-400 text-xl mt-8 leading-9">

                        Learn Japanese faster through AI tutoring,
                        interactive quizzes, personalized study plans,
                        and detailed progress tracking.

                    </p>

                    <div className="flex gap-5 mt-10">

                        <Link
                            to="/quiz"
                            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-lg"
                        >
                            🚀 Start Quiz
                        </Link>

                        <Link
                            to="/ai-tutor"
                            className="px-8 py-4 rounded-xl border border-blue-500 hover:bg-slate-800 transition font-semibold"
                        >
                            🤖 AI Tutor
                        </Link>

                    </div>

                </div>

                {/* Right Side */}

                <div className="grid grid-cols-2 gap-6">

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

                        <div className="text-5xl">
                            📚
                        </div>

                        <h2 className="text-2xl font-bold mt-6">
                            Smart Quizzes
                        </h2>

                        <p className="text-slate-400 mt-4">
                            Practice JLPT N5 to N1 with hundreds of AI-powered questions.
                        </p>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

                        <div className="text-5xl">
                            🤖
                        </div>

                        <h2 className="text-2xl font-bold mt-6">
                            AI Tutor
                        </h2>

                        <p className="text-slate-400 mt-4">
                            Get grammar explanations and vocabulary help instantly.
                        </p>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

                        <div className="text-5xl">
                            📈
                        </div>

                        <h2 className="text-2xl font-bold mt-6">
                            Dashboard
                        </h2>

                        <p className="text-slate-400 mt-4">
                            Track scores, progress, and quiz history in one place.
                        </p>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

                        <div className="text-5xl">
                            🎯
                        </div>

                        <h2 className="text-2xl font-bold mt-6">
                            Study Plans
                        </h2>

                        <p className="text-slate-400 mt-4">
                            Generate personalized JLPT study schedules with AI.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}
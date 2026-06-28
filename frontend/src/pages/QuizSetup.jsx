import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizSetup() {
    const navigate = useNavigate();

    const [level, setLevel] = useState("N5");
    const [category, setCategory] = useState("Vocabulary");
    const [count, setCount] = useState(10);

    const handleGenerate = () => {
        navigate(
            `/quiz?level=${level}&category=${category}&count=${count}`
        );
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8">

                <div className="text-center">

                    <div className="text-6xl mb-4">
                        🧠
                    </div>

                    <h1 className="text-4xl font-bold text-white">
                        Generate AI Quiz
                    </h1>

                    <p className="text-slate-400 mt-3">
                        Create a personalized JLPT quiz powered by AI.
                    </p>

                </div>

                <div className="mt-10 space-y-6">

                    {/* Level */}

                    <div>

                        <label className="block text-slate-300 mb-2 font-medium">
                            JLPT Level
                        </label>

                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-blue-500"
                        >
                            <option value="N5">N5</option>
                            <option value="N4">N4</option>
                            <option value="N3">N3</option>
                            <option value="N2">N2</option>
                            <option value="N1">N1</option>
                        </select>

                    </div>

                    {/* Category */}

                    <div>

                        <label className="block text-slate-300 mb-2 font-medium">
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-blue-500"
                        >
                            <option value="Vocabulary">Vocabulary</option>
                            <option value="Grammar">Grammar</option>
                            <option value="Kanji">Kanji</option>
                            <option value="Reading">Reading</option>
                            <option value="Listening">Listening</option>
                        </select>

                    </div>

                    {/* Number of Questions */}

                    <div>

                        <label className="block text-slate-300 mb-2 font-medium">
                            Number of Questions
                        </label>

                        <select
                            value={count}
                            onChange={(e) => setCount(Number(e.target.value))}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-blue-500"
                        >
                            <option value={5}>5 Questions</option>
                            <option value={10}>10 Questions</option>
                            <option value={15}>15 Questions</option>
                            <option value={20}>20 Questions</option>
                        </select>

                    </div>

                </div>

                {/* Button */}

                <button
                    onClick={handleGenerate}
                    className="w-full mt-10 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-lg py-4 rounded-xl transition duration-300 hover:scale-[1.02]"
                >
                    🚀 Generate AI Quiz
                </button>

                <div className="mt-8 grid grid-cols-3 gap-4">

                    <div className="bg-slate-800 rounded-xl p-4 text-center">

                        <h3 className="text-2xl">🤖</h3>

                        <p className="text-sm text-slate-400 mt-2">
                            AI Generated
                        </p>

                    </div>

                    <div className="bg-slate-800 rounded-xl p-4 text-center">

                        <h3 className="text-2xl">⚡</h3>

                        <p className="text-sm text-slate-400 mt-2">
                            Instant Quiz
                        </p>

                    </div>

                    <div className="bg-slate-800 rounded-xl p-4 text-center">

                        <h3 className="text-2xl">🎯</h3>

                        <p className="text-sm text-slate-400 mt-2">
                            Personalized
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}
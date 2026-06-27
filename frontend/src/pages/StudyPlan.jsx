import { useState } from "react";
import { generateStudyPlan } from "../api/ai.js";

export default function StudyPlan() {
    const [level, setLevel] = useState("N5");
    const [examDate, setExamDate] = useState("");
    const [studyHours, setStudyHours] = useState(2);

    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState("");

    const handleGenerate = async () => {
        try {
            setLoading(true);

            const res = await generateStudyPlan({
                level,
                examDate,
                studyHours,
                quizResults: `
Vocabulary: 8/10
Grammar: 5/10
Kanji: 4/10
Reading: 7/10
Listening: 6/10
        `,
            });

            setPlan(res.plan);
        } catch (error) {
            console.log(error);
            alert("Failed to generate study plan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] text-white py-12 px-4">
            <div className="max-w-4xl mx-auto bg-[#1E293B] rounded-2xl shadow-2xl border border-slate-700 p-8">

                <h1 className="text-4xl font-bold text-center text-cyan-400 mb-2">
                    📚 AI Study Planner
                </h1>

                <p className="text-center text-slate-400 mb-10">
                    Generate a personalized JLPT study plan using AI.
                </p>

                <div className="grid md:grid-cols-2 gap-6">

                    <div>
                        <label className="block mb-2 font-medium text-slate-300">
                            Target JLPT Level
                        </label>

                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <option>N5</option>
                            <option>N4</option>
                            <option>N3</option>
                            <option>N2</option>
                            <option>N1</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-slate-300">
                            Exam Date
                        </label>

                        <input
                            type="date"
                            value={examDate}
                            onChange={(e) => setExamDate(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 font-medium text-slate-300">
                            Daily Study Hours
                        </label>

                        <input
                            type="number"
                            min="1"
                            max="8"
                            value={studyHours}
                            onChange={(e) => setStudyHours(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 transition duration-300 py-3 rounded-xl font-semibold text-lg"
                >
                    {loading ? "Generating Study Plan..." : "🚀 Generate AI Study Plan"}
                </button>

                {plan && (
                    <div className="mt-10">

                        <h2 className="text-2xl font-bold text-cyan-400 mb-5">
                            📖 Your Personalized Study Plan
                        </h2>

                        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 whitespace-pre-wrap leading-8 text-slate-300 overflow-auto max-h-[600px]">
                            {plan}
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}
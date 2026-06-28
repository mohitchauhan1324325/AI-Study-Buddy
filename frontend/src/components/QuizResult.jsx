export default function QuizResult({ result }) {
    return (
        <div className="min-h-screen bg-[#0F172A] text-white py-10 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header */}

                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-8 mb-8 text-center">

                    <h1 className="text-4xl font-bold text-green-400 mb-3">
                        🎉 Quiz Completed
                    </h1>

                    <p className="text-slate-400">
                        Review your performance and see how you can improve.
                    </p>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                    <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4">
                        <h3 className="text-sm text-slate-400">Score</h3>
                        <p className="text-2xl font-bold text-blue-400">
                            {result.score}/{result.totalQuestions}
                        </p>
                    </div>

                    <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4">
                        <h3 className="text-sm text-slate-400">Correct</h3>
                        <p className="text-2xl font-bold text-green-400">
                            {result.correct}
                        </p>
                    </div>

                    <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4">
                        <h3 className="text-sm text-slate-400">Incorrect</h3>
                        <p className="text-2xl font-bold text-red-400">
                            {result.incorrect}
                        </p>
                    </div>

                    <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4">
                        <h3 className="text-sm text-slate-400">Percentage</h3>
                        <p className="text-2xl font-bold text-purple-400">
                            {result.percentage}%
                        </p>
                    </div>

                </div>

                {/* Review */}

                <h2 className="text-3xl font-bold mb-6">
                    Review Answers
                </h2>

                {result.review.map((item, index) => (

                    <div
                        key={index}
                        className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-lg p-6 mb-6"
                    >

                        <h3 className="text-xl font-semibold mb-4">
                            {index + 1}. {item.question}
                        </h3>

                        <p>

                            <span className="font-semibold">
                                Your Answer:
                            </span>

                            <span
                                className={`ml-2 font-bold ${item.isCorrect
                                        ? "text-green-400"
                                        : "text-red-400"
                                    }`}
                            >
                                {item.userAnswer}
                            </span>

                        </p>

                        {!item.isCorrect && (
                            <>
                                <p className="mt-2">

                                    <span className="font-semibold">
                                        Correct Answer:
                                    </span>

                                    <span className="ml-2 text-green-400">
                                        {item.correctAnswer}
                                    </span>

                                </p>

                                <div className="mt-4 bg-slate-800 rounded-xl p-4">

                                    <h3 className="font-bold text-blue-400">
                                        Explanation
                                    </h3>

                                    <p className="mt-2 text-slate-300">
                                        {item.explanation}
                                    </p>

                                </div>
                            </>
                        )}

                    </div>

                ))}

            </div>
        </div>
    );
}
export default function QuizContent({
    questions,
    currentQuestion,
    current,
    answers,
    selectedAnswer,
    timeLeft,
    handleAnswer,
    previousQuestion,
    nextQuestion,
    handleSubmit,
}) {
    return (
        <div className="min-h-screen bg-[#0F172A] text-white py-8 px-4 md:px-6">

            <div className="max-w-5xl mx-auto">

                {/* Header */}

                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-8 mb-8">

                    <div className="text-center">

                        <h1 className="text-4xl font-bold">
                            🧠 JLPT Practice Quiz
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Stay focused and challenge yourself with each question.
                        </p>

                    </div>

                </div>

                {/* Stats */}

                <div className="grid md:grid-cols-3 gap-4 mb-8">

                    <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4 text-center">

                        <p className="text-slate-400 text-sm">
                            Question
                        </p>

                        <h2 className="text-2xl font-bold text-blue-400">
                            {currentQuestion + 1}/{questions.length}
                        </h2>

                    </div>

                    <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4 text-center">

                        <p className="text-slate-400 text-sm">
                            Time Left
                        </p>

                        <h2 className="text-2xl font-bold text-red-400">
                            {Math.floor(timeLeft / 60)}:
                            {(timeLeft % 60)
                                .toString()
                                .padStart(2, "0")}
                        </h2>

                    </div>

                    <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4 text-center">

                        <p className="text-slate-400 text-sm">
                            Answered
                        </p>

                        <h2 className="text-2xl font-bold text-green-400">
                            {answers.length}
                        </h2>

                    </div>

                </div>

                {/* Progress */}

                <div className="w-full h-3 bg-slate-700 rounded-full mb-8 overflow-hidden">

                    <div
                        className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 transition-all duration-500"
                        style={{
                            width: `${((currentQuestion + 1) /
                                    questions.length) *
                                100
                                }%`,
                        }}
                    />

                </div>

                {/* Question */}

                <div className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-xl p-6 md:p-8">

                    <div className="rounded-2xl bg-slate-800 border border-slate-700 p-6 mb-8">

                        <h2 className="text-2xl font-semibold">
                            {current.question}
                        </h2>

                    </div>

                    <div className="space-y-4">

                        {current.options.map((option) => (

                            <label
                                key={option}
                                className={`flex items-center gap-4 border-2 rounded-2xl p-5 cursor-pointer transition-all ${selectedAnswer === option
                                        ? "border-blue-500 bg-blue-500/10"
                                        : "border-slate-700 hover:border-slate-500 hover:bg-slate-800"
                                    }`}
                            >

                                <input
                                    type="radio"
                                    checked={selectedAnswer === option}
                                    onChange={() => handleAnswer(option)}
                                    className="w-5 h-5 accent-blue-500"
                                />

                                <span>{option}</span>

                            </label>

                        ))}

                    </div>

                    {/* Buttons */}

                    <div className="flex justify-between mt-10">

                        <button
                            onClick={previousQuestion}
                            disabled={currentQuestion === 0}
                            className="px-8 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {currentQuestion === questions.length - 1 ? (

                            <button
                                onClick={handleSubmit}
                                className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700"
                            >
                                Submit Quiz
                            </button>

                        ) : (

                            <button
                                onClick={nextQuestion}
                                disabled={!selectedAnswer}
                                className={`px-8 py-3 rounded-xl ${selectedAnswer
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-slate-600 cursor-not-allowed"
                                    }`}
                            >
                                Next
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}
import { useEffect, useState } from "react";
import { getQuiz, submitQuiz } from "../api/quiz";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (loading || result) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, result]);

  const fetchQuestions = async () => {
    try {
      const res = await getQuiz("N5");
      setQuestions(res.questions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (option) => {
    const answer = {
      questionId: questions[currentQuestion].questionId,
      selectedAnswer: option,
    };

    setAnswers((prev) => {
      const filtered = prev.filter(
        (item) => item.questionId !== answer.questionId
      );

      return [...filtered, answer];
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        level: "N5",
        answers,
      };

      const res = await submitQuiz(payload);
      setResult(res);
    } catch (error) {
      console.log(error.response?.data);
      console.log(error.response?.status);
      console.log(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex justify-center items-center px-4">
        <div className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-2xl p-10 text-center">
          <h1 className="text-3xl font-bold text-white animate-pulse">
            Loading Quiz...
          </h1>
          <p className="mt-2 text-slate-400">Preparing your JLPT practice questions.</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex justify-center items-center px-4">
        <div className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-2xl p-10 text-center">
          <h1 className="text-3xl font-bold text-white">No Questions Found</h1>
          <p className="mt-2 text-slate-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-8 mb-8 text-center">
            <h1 className="text-4xl font-bold text-green-400 mb-3">🎉 Quiz Completed</h1>
            <p className="text-slate-400">Review your performance and see how you can improve.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4">
              <h3 className="text-sm text-slate-400">Score</h3>
              <p className="text-2xl font-bold text-blue-400">{result.score}/{result.totalQuestions}</p>
            </div>
            <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4">
              <h3 className="text-sm text-slate-400">Correct</h3>
              <p className="text-2xl font-bold text-green-400">{result.correct}</p>
            </div>
            <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4">
              <h3 className="text-sm text-slate-400">Incorrect</h3>
              <p className="text-2xl font-bold text-red-400">{result.incorrect}</p>
            </div>
            <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4">
              <h3 className="text-sm text-slate-400">Percentage</h3>
              <p className="text-2xl font-bold text-purple-400">{result.percentage}%</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Review Answers</h2>

          {result.review.map((item, index) => (
            <div key={index} className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">
                {index + 1}. {item.question}
              </h3>

              <div className="space-y-3 text-slate-300">
                <p>
                  <span className="font-semibold text-white">Your Answer:</span>
                  <span className={`ml-2 font-bold ${item.isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {item.userAnswer}
                  </span>
                </p>

                {!item.isCorrect && (
                  <>
                    <p>
                      <span className="font-semibold text-white">Correct Answer:</span>
                      <span className="ml-2 text-green-400 font-bold">{item.correctAnswer}</span>
                    </p>

                    <div className="bg-slate-800 border border-blue-500/30 rounded-2xl p-4">
                      <p className="font-semibold text-blue-400">Explanation</p>
                      <p className="text-slate-300 mt-1">{item.explanation}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const current = questions[currentQuestion];
  const selectedAnswer = answers.find(
    (item) => item.questionId === current.questionId
  )?.selectedAnswer;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white py-8 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">🧠 JLPT Practice Quiz</h1>
            <p className="text-slate-400 mt-2">Stay focused and challenge yourself with each question.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4 text-center">
            <p className="text-slate-400 text-sm">Question</p>
            <h2 className="text-2xl font-bold text-blue-400">{currentQuestion + 1}/{questions.length}</h2>
          </div>
          <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4 text-center">
            <p className="text-slate-400 text-sm">Time Left</p>
            <h2 className="text-2xl font-bold text-red-400">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </h2>
          </div>
          <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4 text-center">
            <p className="text-slate-400 text-sm">Answered</p>
            <h2 className="text-2xl font-bold text-green-400">{answers.length}</h2>
          </div>
        </div>

        <div className="w-full h-3 bg-slate-700 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-xl p-6 md:p-8">
          <div className="rounded-2xl bg-slate-800/70 border border-slate-700 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white">{current.question}</h2>
          </div>

          <div className="space-y-4">
            {current.options.map((option) => (
              <label
                key={option}
                className={`flex items-center gap-4 border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${selectedAnswer === option
                  ? "border-blue-500 bg-blue-500/10 shadow-md scale-[1.01]"
                  : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/80"
                }`}
              >
                <input
                  type="radio"
                  checked={selectedAnswer === option}
                  onChange={() => handleAnswer(option)}
                  className="w-5 h-5 accent-blue-500"
                />
                <span className="text-lg font-medium text-slate-200">{option}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="px-8 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition text-white"
            >
              ← Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transition"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={!selectedAnswer}
                className={`px-8 py-3 rounded-xl text-white transition ${selectedAnswer
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105"
                  : "bg-slate-600 cursor-not-allowed"
                }`}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
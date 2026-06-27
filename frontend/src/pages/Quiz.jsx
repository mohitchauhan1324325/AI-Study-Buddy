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
        userId: "mohit123",
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
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        No Questions Found
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Result Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">

            <h1 className="text-4xl font-bold text-green-600 mb-4">
              🎉 Quiz Completed
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

              <div className="bg-blue-100 rounded-lg p-4">
                <h3 className="text-sm text-gray-600">Score</h3>
                <p className="text-2xl font-bold">
                  {result.score}/{result.totalQuestions}
                </p>
              </div>

              <div className="bg-green-100 rounded-lg p-4">
                <h3 className="text-sm text-gray-600">Correct</h3>
                <p className="text-2xl font-bold text-green-700">
                  {result.correct}
                </p>
              </div>

              <div className="bg-red-100 rounded-lg p-4">
                <h3 className="text-sm text-gray-600">Incorrect</h3>
                <p className="text-2xl font-bold text-red-700">
                  {result.incorrect}
                </p>
              </div>

              <div className="bg-yellow-100 rounded-lg p-4">
                <h3 className="text-sm text-gray-600">Percentage</h3>
                <p className="text-2xl font-bold">
                  {result.percentage}%
                </p>
              </div>

            </div>

          </div>

          {/* Review Answers */}

          <h2 className="text-3xl font-bold mb-6">
            Review Answers
          </h2>

          {result.review.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >

              <h3 className="text-xl font-semibold mb-4">
                {index + 1}. {item.question}
              </h3>

              <div className="space-y-3">

                <p>

                  <span className="font-semibold">
                    Your Answer :
                  </span>

                  <span
                    className={`ml-2 font-bold ${item.isCorrect
                        ? "text-green-600"
                        : "text-red-600"
                      }`}
                  >
                    {item.userAnswer}
                  </span>

                </p>

                {!item.isCorrect && (
                  <>
                    <p>
                      <span className="font-semibold">
                        Correct Answer :
                      </span>

                      <span className="ml-2 text-green-700 font-bold">
                        {item.correctAnswer}
                      </span>
                    </p>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">

                      <p className="font-semibold text-blue-700">
                        Explanation
                      </p>

                      <p className="text-gray-700">
                        {item.explanation}
                      </p>

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700">
            🤖 AI Study Buddy
          </h1>

          <p className="text-gray-500 mt-2">
            JLPT N5 Practice Quiz
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">

          <div className="bg-blue-100 rounded-xl p-4 text-center">
            <p className="text-gray-500 text-sm">Question</p>

            <h2 className="text-2xl font-bold text-blue-700">
              {currentQuestion + 1}/{questions.length}
            </h2>
          </div>

          <div className="bg-red-100 rounded-xl p-4 text-center">
            <p className="text-gray-500 text-sm">Time Left</p>

            <h2 className="text-2xl font-bold text-red-600">
              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </h2>
          </div>

          <div className="bg-green-100 rounded-xl p-4 text-center">
            <p className="text-gray-500 text-sm">Answered</p>

            <h2 className="text-2xl font-bold text-green-600">
              {answers.length}
            </h2>
          </div>

        </div>

        {/* Progress */}
        <div className="w-full h-3 bg-gray-200 rounded-full mb-8 overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />

        </div>

        {/* Question */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 shadow-sm">

          <h2 className="text-2xl font-semibold text-gray-800">
            {current.question}
          </h2>

        </div>

        {/* Options */}
        <div className="space-y-4">

          {current.options.map((option) => (

            <label
              key={option}
              className={`flex items-center gap-4 border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 ${selectedAnswer === option
                ? "border-blue-600 bg-blue-50 shadow-md scale-[1.02]"
                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
            >

              <input
                type="radio"
                checked={selectedAnswer === option}
                onChange={() => handleAnswer(option)}
                className="w-5 h-5 accent-blue-600"
              />

              <span className="text-lg font-medium">
                {option}
              </span>

            </label>

          ))}

        </div>

        {/* Buttons */}

        <div className="flex justify-between mt-10">

          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            ← Previous
          </button>

          {currentQuestion === questions.length - 1 ? (

            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white hover:scale-105 transition"
            >
              Submit Quiz
            </button>

          ) : (

            <button
              onClick={nextQuestion}
              disabled={!selectedAnswer}
              className={`px-8 py-3 rounded-xl text-white transition ${selectedAnswer
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105"
                : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Next →
            </button>

          )}

        </div>

      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { getQuiz, submitQuiz } from "../api/quiz";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

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
      console.log(error);
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
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-6">
            🎉 Quiz Completed
          </h1>

          <p className="text-xl font-semibold mb-3">
            Score: {result.score} / {result.totalQuestions}
          </p>

          <p className="text-lg text-gray-600">
            Percentage: {result.percentage}%
          </p>
        </div>
      </div>
    );
  }

  const current = questions[currentQuestion];

  const selectedAnswer = answers.find(
    (item) => item.questionId === current.questionId
  )?.selectedAnswer;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          AI Study Buddy
        </h1>

        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>

          <div className="w-48 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-8">
          {current.question}
        </h2>

        <div className="space-y-4">
          {current.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`w-full text-left p-4 rounded-lg border transition duration-200 ${
                selectedAnswer === option
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-blue-50 border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-10">

          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
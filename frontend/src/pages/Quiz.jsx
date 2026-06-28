import { useEffect, useState } from "react";
import { getQuiz, submitQuiz } from "../api/quiz";
import QuizResult from "../components/QuizResult";
import QuizContent from "../components/QuizContent";

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
      <QuizResult
        result={result}
      />
    );
  }

  const current = questions[currentQuestion];
  const selectedAnswer = answers.find(
    (item) => item.questionId === current.questionId
  )?.selectedAnswer;

  return (
    <QuizContent
      questions={questions}
      currentQuestion={currentQuestion}
      current={current}
      answers={answers}
      selectedAnswer={selectedAnswer}
      timeLeft={timeLeft}
      handleAnswer={handleAnswer}
      previousQuestion={previousQuestion}
      nextQuestion={nextQuestion}
      handleSubmit={handleSubmit}
    />
  );
}
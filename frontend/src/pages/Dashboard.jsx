import { useEffect, useState } from "react";
import { getDashboard } from "../api/quiz";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard("mohit123");
      setDashboard(res.dashboard);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  const percentage =
    dashboard.totalQuizzes > 0
      ? (dashboard.averageScore / 10) * 100
      : 0;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-8 py-10">

          <h1 className="text-5xl font-bold">
            📊 JLPT Dashboard
          </h1>

          <p className="mt-3 text-blue-100 text-lg">
            Track your Japanese learning journey.
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Welcome */}

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

          <h2 className="text-3xl font-bold text-gray-900">
            👋 Welcome Back
          </h2>

          <p className="text-gray-600 mt-2">
            Keep practicing every day to improve your JLPT score.
          </p>

        </div>

        {/* Stats */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl shadow-md p-8">

            <div className="text-5xl">📝</div>

            <p className="text-gray-500 mt-4">
              Total Quizzes
            </p>

            <h2 className="text-5xl font-bold text-blue-600 mt-2">
              {dashboard.totalQuizzes}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-8">

            <div className="text-5xl">🏆</div>

            <p className="text-gray-500 mt-4">
              Highest Score
            </p>

            <h2 className="text-5xl font-bold text-green-600 mt-2">
              {dashboard.highestScore}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-8">

            <div className="text-5xl">📈</div>

            <p className="text-gray-500 mt-4">
              Average Score
            </p>

            <h2 className="text-5xl font-bold text-purple-600 mt-2">
              {dashboard.averageScore}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-8">

            <div className="text-5xl">🎯</div>

            <p className="text-gray-500 mt-4">
              Success Rate
            </p>

            <h2 className="text-5xl font-bold text-orange-500 mt-2">
              {percentage.toFixed(0)}%
            </h2>

          </div>

        </div>

        {/* Progress */}

        <div className="bg-white rounded-3xl shadow-lg mt-8 p-8">

          <div className="flex justify-between">

            <h2 className="text-2xl font-bold">
              Learning Progress
            </h2>

            <span className="font-semibold">
              {percentage.toFixed(0)}%
            </span>

          </div>

          <div className="w-full h-4 bg-gray-200 rounded-full mt-5 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-green-400 to-blue-600 rounded-full"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>

        {/* Achievements */}

        <div className="bg-white rounded-3xl shadow-lg mt-8 p-8">

          <h2 className="text-2xl font-bold mb-6">
            🏅 Achievements
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-yellow-50 rounded-xl p-6 border">

              <div className="text-4xl">🥇</div>

              <h3 className="font-bold mt-3">
                First Quiz
              </h3>

              <p className="text-gray-600 text-sm">
                Completed your first quiz.
              </p>

            </div>

            <div className="bg-green-50 rounded-xl p-6 border">

              <div className="text-4xl">🔥</div>

              <h3 className="font-bold mt-3">
                Keep Going
              </h3>

              <p className="text-gray-600 text-sm">
                Finish 10 quizzes.
              </p>

            </div>

            <div className="bg-blue-50 rounded-xl p-6 border">

              <div className="text-4xl">🌸</div>

              <h3 className="font-bold mt-3">
                JLPT Learner
              </h3>

              <p className="text-gray-600 text-sm">
                Average above 80%.
              </p>

            </div>

          </div>

        </div>

        {/* Recent Quizzes */}

        <div className="bg-white rounded-3xl shadow-lg mt-8">

          <div className="border-b px-8 py-6">

            <h2 className="text-3xl font-bold">
              📚 Recent Quiz Attempts
            </h2>

          </div>

          <div>

            {dashboard.recentQuizzes.map((quiz) => (

              <div
                key={quiz.id}
                className="flex justify-between items-center px-8 py-5 hover:bg-slate-50 border-b"
              >

                <div>

                  <h3 className="text-xl font-semibold">
                    🇯🇵 JLPT {quiz.level}
                  </h3>

                  <p className="text-gray-500">
                    {new Date(
                      quiz.submittedAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-3xl font-bold text-blue-600">
                    {quiz.score}/{quiz.totalQuestions}
                  </p>

                  <p className="text-green-600 font-semibold">
                    Completed
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}
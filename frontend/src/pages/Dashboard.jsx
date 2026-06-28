import { useEffect, useState } from "react";
import { getDashboard } from "../api/quiz";
import { getUserId } from "../utils/user";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard(getUserId());
      setDashboard(res.dashboard);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex justify-center items-center">
        <h1 className="text-3xl font-bold text-white animate-pulse">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  const percentage =
    dashboard.totalQuizzes > 0
      ? (dashboard.averageScore / 10) * 100
      : 0;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">

      {/* Header */}

      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 shadow-xl">

        <div className="max-w-7xl mx-auto px-8 py-10">

          <h1 className="text-5xl font-bold">
            📊 JLPT Dashboard
          </h1>

          <p className="mt-3 text-slate-400 text-lg">
            Track your Japanese learning journey.
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Welcome */}

        <div className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-xl p-8 mb-8">

          <h2 className="text-3xl font-bold">
            👋 Welcome Back
          </h2>

          <p className="text-slate-400 mt-2">
            Keep practicing every day to improve your JLPT score.
          </p>

        </div>

        {/* Stats */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

          <div className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-lg p-8 hover:scale-105 transition">

            <div className="text-5xl">📝</div>

            <p className="text-slate-400 mt-4">
              Total Quizzes
            </p>

            <h2 className="text-5xl font-bold text-blue-400 mt-2">
              {dashboard.totalQuizzes}
            </h2>

          </div>

          <div className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-lg p-8 hover:scale-105 transition">

            <div className="text-5xl">🏆</div>

            <p className="text-slate-400 mt-4">
              Highest Score
            </p>

            <h2 className="text-5xl font-bold text-green-400 mt-2">
              {dashboard.highestScore}
            </h2>

          </div>

          <div className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-lg p-8 hover:scale-105 transition">

            <div className="text-5xl">📈</div>

            <p className="text-slate-400 mt-4">
              Average Score
            </p>

            <h2 className="text-5xl font-bold text-purple-400 mt-2">
              {dashboard.averageScore}
            </h2>

          </div>

          <div className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-lg p-8 hover:scale-105 transition">

            <div className="text-5xl">🎯</div>

            <p className="text-slate-400 mt-4">
              Success Rate
            </p>

            <h2 className="text-5xl font-bold text-orange-400 mt-2">
              {percentage.toFixed(0)}%
            </h2>

          </div>

        </div>

        {/* Progress */}

        <div className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-xl mt-8 p-8">

          <div className="flex justify-between items-center">

            <h2 className="text-2xl font-bold">
              📈 Learning Progress
            </h2>

            <span className="font-bold text-green-400 text-xl">
              {percentage.toFixed(0)}%
            </span>

          </div>

          <div className="w-full h-4 bg-slate-700 rounded-full mt-6 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

          <div className="flex justify-between mt-4 text-slate-400 text-sm">

            <span>Beginner</span>

            <span>Intermediate</span>

            <span>Advanced</span>

          </div>

        </div>

        {/* Achievements */}

        <div className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-xl mt-8 p-8">

          <h2 className="text-3xl font-bold mb-8">
            🏅 Achievements
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* Card 1 */}

            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-800/20 border border-yellow-500 rounded-2xl p-6 hover:scale-105 transition-all duration-300">

              <div className="flex justify-between items-center">

                <div className="text-5xl">
                  🥇
                </div>

                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                  UNLOCKED
                </span>

              </div>

              <h3 className="text-xl font-bold mt-5">
                First Quiz
              </h3>

              <p className="text-slate-400 mt-2">
                Congratulations! You completed your first JLPT quiz.
              </p>

            </div>

            {/* Card 2 */}

            <div className="bg-gradient-to-br from-green-500/20 to-green-900/20 border border-green-500 rounded-2xl p-6 hover:scale-105 transition-all duration-300">

              <div className="flex justify-between items-center">

                <div className="text-5xl">
                  🔥
                </div>

                <span className="bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                  IN PROGRESS
                </span>

              </div>

              <h3 className="text-xl font-bold mt-5">
                Quiz Streak
              </h3>

              <p className="text-slate-400 mt-2">
                Complete 10 quizzes to unlock this achievement.
              </p>

            </div>

            {/* Card 3 */}

            <div className="bg-gradient-to-br from-blue-500/20 to-indigo-900/20 border border-blue-500 rounded-2xl p-6 hover:scale-105 transition-all duration-300">

              <div className="flex justify-between items-center">

                <div className="text-5xl">
                  🌸
                </div>

                <span className="bg-blue-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                  GOAL
                </span>

              </div>

              <h3 className="text-xl font-bold mt-5">
                JLPT Master
              </h3>

              <p className="text-slate-400 mt-2">
                Reach an average score above 80% to earn this badge.
              </p>

            </div>

          </div>

        </div>

                {/* Recent Quizzes */}

        <div className="bg-[#1E293B] border border-slate-700 rounded-3xl shadow-xl mt-8 overflow-hidden">

          <div className="border-b border-slate-700 px-8 py-6 flex justify-between items-center">

            <h2 className="text-3xl font-bold">
              📚 Recent Quiz Attempts
            </h2>

            <span className="text-slate-400">
              {dashboard.recentQuizzes.length} Attempts
            </span>

          </div>

          <div>

            {dashboard.recentQuizzes.length === 0 ? (

              <div className="py-16 text-center">

                <h2 className="text-3xl">
                  📖
                </h2>

                <p className="mt-4 text-slate-400">
                  No quiz attempts yet.
                </p>

              </div>

            ) : (

              dashboard.recentQuizzes.map((quiz) => {

                const scorePercent =
                  (quiz.score / quiz.totalQuestions) * 100;

                return (

                  <div
                    key={quiz.id}
                    className="flex justify-between items-center px-8 py-6 border-b border-slate-700 hover:bg-slate-800 transition duration-300"
                  >

                    <div>

                      <h3 className="text-xl font-semibold">

                        🇯🇵 JLPT {quiz.level}

                      </h3>

                      <p className="text-slate-400 mt-2">

                        {new Date(
                          quiz.submittedAt
                        ).toLocaleDateString()}

                      </p>

                    </div>

                    <div className="text-center">

                      <p className="text-3xl font-bold text-blue-400">

                        {quiz.score}/{quiz.totalQuestions}

                      </p>

                      <p className="text-sm text-slate-400 mt-1">

                        Score

                      </p>

                    </div>

                    <div>

                      <span
                        className={`px-5 py-2 rounded-full font-semibold ${
                          scorePercent >= 80
                            ? "bg-green-500/20 text-green-400 border border-green-500"
                            : scorePercent >= 60
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500"
                            : "bg-red-500/20 text-red-400 border border-red-500"
                        }`}
                      >
                        {scorePercent.toFixed(0)}%
                      </span>

                    </div>

                  </div>

                );

              })

            )}

          </div>

        </div>

        {/* Footer */}

        <div className="mt-10 text-center">

          <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-8">

            <h2 className="text-2xl font-bold">

              🌸 Keep Learning Japanese!

            </h2>

            <p className="text-slate-400 mt-3">

              Every quiz makes you one step closer to passing the JLPT.

            </p>

            <button
              className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
            >
              🚀 Take Another Quiz
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
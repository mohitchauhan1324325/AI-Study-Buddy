import React from 'react'

export default function Dashboard() {
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Progress</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Overview of recent quizzes and learning streaks.</p>
        </div>
        <aside className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Stats</h3>
          <ul className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <li>Completed quizzes: 3</li>
            <li>Current streak: 5 days</li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

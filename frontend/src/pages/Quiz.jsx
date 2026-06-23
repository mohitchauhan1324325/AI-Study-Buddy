import React from 'react'

export default function Quiz() {
  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Practice Quiz</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Pick a topic and test your knowledge. This is a placeholder layout for quiz items.</p>

        <div className="mt-6 space-y-4">
          <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Sample Question 1</h3>
                <p className="text-sm text-gray-500">What is 2 + 2?</p>
              </div>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded">Answer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

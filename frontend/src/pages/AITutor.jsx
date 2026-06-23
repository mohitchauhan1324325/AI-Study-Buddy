import React from 'react'

export default function AITutor() {
  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">AI Tutor</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Ask the AI for explanations, examples, or step-by-step help.</p>

        <div className="mt-6">
          <textarea className="w-full rounded-md border p-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100" rows="6" placeholder="Ask a question or paste a problem here..."></textarea>
          <div className="mt-3 flex justify-end">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">Get Help</button>
          </div>
        </div>
      </div>
    </div>
  )
}

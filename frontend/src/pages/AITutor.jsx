import { useState } from "react";
import { askAI } from "../api/ai";

export default function AITutor() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await askAI(message);
      setReply(res.reply);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex justify-center items-center px-4 py-10">

      <div className="w-full max-w-4xl bg-[#1E293B] rounded-2xl shadow-2xl border border-slate-700 p-8">

        <h1 className="text-4xl font-bold text-center mb-2">
          🤖 AI Japanese Tutor
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Ask anything about JLPT, Kanji, Grammar, Vocabulary or Reading.
        </p>

        <textarea
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Example: Explain the difference between は and が..."
          className="w-full rounded-xl bg-[#0F172A] border border-slate-700 p-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button
          onClick={send}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold text-lg disabled:opacity-50"
        >
          {loading ? "🤖 Thinking..." : "Ask AI"}
        </button>

        {reply && (
          <div className="mt-8 bg-[#0F172A] border border-slate-700 rounded-xl p-6">

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-xl">
                🤖
              </div>

              <div>
                <h2 className="font-bold text-lg">
                  AI Tutor
                </h2>

                <p className="text-sm text-slate-400">
                  JLPT Assistant
                </p>
              </div>
            </div>

            <div className="text-slate-200 leading-8 whitespace-pre-wrap">
              {reply}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
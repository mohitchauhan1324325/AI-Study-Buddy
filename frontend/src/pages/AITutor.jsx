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
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        🤖 AI Japanese Tutor
      </h1>

      <textarea
        className="w-full border rounded-lg p-4"
        rows={5}
        placeholder="Ask anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={send}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {reply && (
        <div className="mt-8 bg-white shadow rounded-xl p-6">
          {reply}
        </div>
      )}
    </div>
  );
}
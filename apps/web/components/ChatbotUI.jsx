'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatbotUI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // No type annotation

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });
    
    const data = await res.json();
    setMessages([...messages, { from: "user", text: input }, { from: "bot", text: data.response }]);
    
      
  };

  return (
    <div className="p-4 border rounded-xl shadow-md space-y-4 w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-center">🧠 AlzCare AI Chatbot</h2>
      <div className="h-64 overflow-y-auto border p-2 rounded bg-gray-100 space-y-2">
      {messages.map((msg, i) => (
  <div
    key={i}
    className={`p-2 my-1 rounded-md ${
      msg.from === "user" ? "bg-blue-100 text-right" : "bg-green-100 text-left"
    }`}
  >
    {msg.text || "⚠️ Empty response"}
  </div>
))}
 
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}

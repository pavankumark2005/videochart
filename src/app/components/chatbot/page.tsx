// src/app/chatbot/page.tsx
"use client";

import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() === '') return;

    setMessages((prev) => [...prev, { sender: 'User', text: inputText }]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'AI', text: 'This is a simulated AI response.' }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">AI Chatbot</h2>
      <div className="overflow-y-auto h-60 w-full border border-gray-300 rounded mb-2 p-2">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'User' ? 'text-right' : 'text-left'}`}>
            <strong>{message.sender}: </strong>{message.text}
          </div>
        ))}
      </div>
      <div className="flex w-full">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}

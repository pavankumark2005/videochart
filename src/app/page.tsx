// src/app/page.tsx
"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div 
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('/asset/backg.jpg')" }} // Update path if necessary
    >
      <h1 className="text-3xl font-bold mb-4 text-black ">Welcome to Connect the Doctor</h1>
      <div className="flex space-x-8 mb-4">
        <Link href="/video-chat">
          <div className="flex flex-row items-center">
            <img
              src="/asset/meet.png" // Ensure the image path is correct
              alt="Meet"
              className="w-10 h-10 mb-2"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2">
              Meet the doctor
            </button>
          </div>
        </Link>
        <Link href="/chatbot">
          <div className="flex flex-row items-center">
            <img
              src="/asset/ai.png" // Ensure the image path is correct
              alt="AI"
              className="w-10 h-10 mb-2"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">
              Chat with the AI
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

// src/app/prescription/page.tsx
"use client";

export default function Prescription() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Thank you for calling!</h1>
      <p className="mb-4">Your prescription is ready.</p>
      <button
        onClick={() => {/* Logic to download prescription */}}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download Prescription
      </button>
    </div>
  );
}

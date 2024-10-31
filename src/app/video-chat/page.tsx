// src/app/video-chat/page.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';

export default function VideoChat() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerId, setRemotePeerId] = useState('');
  const [connected, setConnected] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);

  useEffect(() => {
    peerInstance.current = new Peer();

    peerInstance.current.on('open', (id: string) => {
      setPeerId(id);
      console.log(`Your peer ID is: ${id}`);
    });

    peerInstance.current.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        call.answer(stream);
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        call.on('stream', (remoteStream) => {
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
        });
      });
    });

    return () => peerInstance.current?.destroy();
  }, []);

  const startCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      const call = peerInstance.current?.call(remotePeerId, stream);

      call?.on('stream', (remoteStream) => {
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
      });

      setConnected(true);
    });
  };

  const handleEndCall = () => {
    // Redirect to prescription page
    window.location.href = '/prescription';
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Video Chat</h2>
      <div className="flex space-x-4 mb-4">
        <div>
          <video ref={localVideoRef} autoPlay muted className="w-48 h-48 bg-gray-200 rounded" />
          <p className="text-center">Your Video</p>
        </div>
        <div>
          <video ref={remoteVideoRef} autoPlay className="w-48 h-48 bg-gray-200 rounded" />
          <p className="text-center">Remote Video</p>
        </div>
      </div>

      {!connected ? (
        <>
          <input
            type="text"
            className="border p-2 rounded mb-2"
            placeholder="Enter peer ID to call"
            value={remotePeerId}
            onChange={(e) => setRemotePeerId(e.target.value)}
          />
          <button
            onClick={startCall}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start Call
          </button>
        </>
      ) : (
        <>
          <p className="text-green-600 font-bold">Connected</p>
          <button
            onClick={handleEndCall}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
          >
            End Call
          </button>
        </>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import ChatbotUI from './ChatbotUI'; // Import the ChatbotUI component

export default function ChatbotIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Chatbot Icon */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-8 right-8 p-4 bg-blue-500 text-white rounded-full shadow-lg"
      >
        🗨️
      </button>

      {/* Chatbot UI Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-8 w-96 h-80 p-4 bg-white border rounded-lg shadow-lg">
          <button
            onClick={toggleChatbot}
            className="absolute top-2 right-2 text-gray-500 text-lg"
          >
            ×
          </button>
          <ChatbotUI />
        </div>
      )}
    </div>
  );
}

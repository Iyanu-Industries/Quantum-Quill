import React, { useState, useEffect, useRef } from "react";

interface ChatbotProps {
  setIsChatbotOpen: (isOpen: boolean) => void;
}

const chatbot: React.FC<ChatbotProps> = ({ setIsChatbotOpen }) => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    [
      {
        text: "Hello! I'm your AI writing assistant. How can I help you today?",
        isUser: false,
      },
    ]
  );
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, isUser: true }]);
      setNewMessage("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "I'm analyzing your document and providing suggestions.",
            isUser: false,
          },
        ]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <div className="fixed inset-0 bg-transparent z-20 flex items-center justify-center">
      <div
        className="w-[400px] h-[500px] bg-white rounded-lg shadow-xl flex flex-col cursor-move"
        id="draggable-chatbot"
        onMouseDown={(e) => {
          if (
            e.target === e.currentTarget ||
            (e.target instanceof Element && e.target.closest(".cursor-move"))
          ) {
            const chatbot = document.getElementById("draggable-chatbot");
            if (!chatbot) return;
            const startX = e.clientX - chatbot.offsetLeft;
            const startY = e.clientY - chatbot.offsetTop;
            const handleMouseMove = (moveEvent: any) => {
              chatbot.style.left = `${moveEvent.clientX - startX}px`;
              chatbot.style.top = `${moveEvent.clientY - startY}px`;
              chatbot.style.transform = "none";
            };
            const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove);
              document.removeEventListener("mouseup", handleMouseUp);
            };
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
          }
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-800">
            <i className="fas fa-robot text-blue-500 mr-2"></i> AI Assistant
          </h3>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setIsChatbotOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center bg-gray-100 rounded-full overflow-hidden pr-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your document..."
              className="flex-1 border-none bg-transparent py-2 px-4 focus:outline-none resize-none text-sm h-10 max-h-32"
              rows={1}
            ></textarea>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                newMessage.trim()
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              <i className="fas fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default chatbot;

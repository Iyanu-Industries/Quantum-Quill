import { useState } from "react";
interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  projectTitle: string;
  projectType: string;
  projectDescription: string;
  isPlagiarismLoading?: boolean;
  citationsData: Array<{ style: string; text: string }>;
  plagiarismData: { score: number; issues: Array<{ source: string; text: string }> } | null;
  grammarData: Array<{ type: string; category: string; text: string; suggestion: string }>;
  activeView: string;
  setActiveView: (
    view: "chat" | "citations" | "plagiarism" | "grammar"
  ) => void;
}

export function ChatSidebar({
  projectTitle,
  projectType,
  projectDescription,
  isOpen,
  onToggle,
  activeView,
  setActiveView,
  citationsData,
  plagiarismData,
  grammarData,
}: ChatSidebarProps) {
  const [messages, setMessages] = useState([
    { type: "ai", content: "Hello, how can I assist you today?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { type: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    try {
      const response = await fetch("/api/routes/ai", {
        // Your API route
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectTitle,
          projectType,
          projectDescription,
          inputMessage,
        }),
      });

      const { content } = await response.json();
      setMessages((prev) => [...prev, { type: "ai", content }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { type: "ai", content: "There was an error." },
      ]);
    }
  };
  const renderCitationsView = () => (
    <div className="flex-1 overflow-y-auto p-4 z-[999]">
      <h3 className="font-bold text-white mb-4">Citations Summary</h3>
      {citationsData.length === 0 ? (
        <div className="text-gray-400 text-center py-8">
          <i className="ri-bookmark-line text-4xl mb-2"></i>
          <p>No citations found</p>
          <p className="text-sm">
            Add citations to your document to see them here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {citationsData.map((citation, index) => (
            <div key={index} className="bg-gray-700 p-3 rounded-lg">
              <p className="text-sm text-gray-300">{citation.style}</p>
              <p className="text-white">{citation.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPlagiarismView = () => (
    <div className="flex-1 overflow-y-auto p-4">
      <h3 className="font-bold text-white mb-4">Plagiarism Check</h3>
      {!plagiarismData ? (
        <div className="text-gray-400 text-center py-8">
          <i className="ri-shield-check-line text-4xl mb-2"></i>
          <p>No plagiarism checks performed</p>
          <p className="text-sm">Run a plagiarism check to see results here</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Overall Score</span>
              <span
                className={`font-bold ${
                  plagiarismData.score > 90
                    ? "text-green-400"
                    : plagiarismData.score > 70
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {plagiarismData.score}%
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  plagiarismData.score > 90
                    ? "bg-green-400"
                    : plagiarismData.score > 70
                    ? "bg-yellow-400"
                    : "bg-red-400"
                }`}
                style={{ width: `${plagiarismData.score}%` }}
              ></div>
            </div>
          </div>

          {plagiarismData.issues?.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-white font-medium">Issues Found:</h4>
              {plagiarismData.issues.map((issue: { source: string; text: string }, index: number) => (
                <div
                  key={index}
                  className="bg-red-900/30 border border-red-700 p-3 rounded-lg"
                >
                  <p className="text-red-300 text-sm">{issue.source}</p>
                  <p className="text-white text-sm">{issue.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderGrammarView = () => (
    <div className="flex-1 overflow-y-auto p-4">
      <h3 className="font-bold text-white mb-4">Grammar Check</h3>
      {grammarData.length === 0 ? (
        <div className="text-gray-400 text-center py-8">
          <i className="ri-spell-check-line text-4xl mb-2"></i>
          <p>No grammar checks performed</p>
          <p className="text-sm">Run a grammar check to see suggestions here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {grammarData.map((issue, index) => (
            <div key={index} className="bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-sm font-medium ${
                    issue.type === "error" ? "text-red-400" : "text-yellow-400"
                  }`}
                >
                  {issue.type === "error" ? "Error" : "Suggestion"}
                </span>
                <span className="text-xs text-gray-400">{issue.category}</span>
              </div>
              <p className="text-white text-sm mb-1">{issue.text}</p>
              <p className="text-gray-300 text-xs">{issue.suggestion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderChatView = () => (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.type === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-700 z-[999]">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleSendMessage}
            className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center hover:bg-purple-700 transition-colors cursor-pointer"
          >
            <i className="ri-send-plane-line text-white"></i>
          </button>
        </div>
      </div>
    </>
  );

  if (!isOpen) {
    return (
      <div className="w-12 bg-gray-800 border-l border-gray-700 flex flex-col items-center py-4 space-y-2">
        <div className="relative group">
          <button
            onClick={onToggle}
            className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors cursor-pointer"
          >
            <i className="ri-robot-line text-white"></i>
          </button>
          <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Chat
          </div>
        </div>

        <div className="relative group">
          <button
            onClick={() => {
              onToggle();
              setActiveView("citations");
            }}
            className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer"
          >
            <i className="ri-bookmark-line text-white text-sm"></i>
          </button>
          <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Citations
          </div>
        </div>

        <div className="relative group">
          <button
            onClick={() => {
              onToggle();
              setActiveView("plagiarism");
            }}
            className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer"
          >
            <i className="ri-shield-check-line text-white text-sm"></i>
          </button>
          <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Plagiarism Check
          </div>
        </div>

        <div className="relative group">
          <button
            onClick={() => {
              onToggle();
              setActiveView("grammar");
            }}
            className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer"
          >
            <i className="ri-spell-check-line text-white text-sm"></i>
          </button>
          <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Grammar Check
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative group">
            <button
              onClick={() => setActiveView("chat")}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                activeView === "chat"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <i className="ri-robot-line"></i>
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Chat
            </div>
          </div>
          <div className="relative group">
            <button
              onClick={() => setActiveView("citations")}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                activeView === "citations"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <i className="ri-bookmark-line"></i>
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Citations
            </div>
          </div>
          <div className="relative group">
            <button
              onClick={() => setActiveView("plagiarism")}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                activeView === "plagiarism"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <i className="ri-shield-check-line"></i>
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Plagiarism Check
            </div>
          </div>
          <div className="relative group">
            <button
              onClick={() => setActiveView("grammar")}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                activeView === "grammar"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <i className="ri-spell-check-line"></i>
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Grammar Check
            </div>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-gray-300"></i>
        </button>
      </div>

      {activeView === "chat" && renderChatView()}
      {activeView === "citations" && renderCitationsView()}
      {activeView === "plagiarism" && renderPlagiarismView()}
      {activeView === "grammar" && renderGrammarView()}
    </div>
  );
}

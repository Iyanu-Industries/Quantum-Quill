// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useRef, useEffect } from "react";
const App: React.FC = () => {
  const [documentTitle, setDocumentTitle] = useState("Untitled Document");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    [
      {
        text: "Hello! I'm your AI writing assistant. How can I help you today?",
        isUser: false,
      },
    ]
  );
  const [newMessage, setNewMessage] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [isJournalsModalOpen, setIsJournalsModalOpen] = useState(false);
  const [journalSearchQuery, setJournalSearchQuery] = useState("");
  const [selectedDateFilter, setSelectedDateFilter] = useState("all");
  const [selectedJournalType, setSelectedJournalType] = useState("all");
  const [isPlagiarismModalOpen, setIsPlagiarismModalOpen] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<
    {
      text: string;
      similarity: number;
      source: string;
    }[]
  >([]);
  const [scanType, setScanType] = useState<"full" | "selection">("full");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const fileDropdownRef = useRef<HTMLDivElement>(null);
  const viewDropdownRef = useRef<HTMLDivElement>(null);
  const journalArticles = [
    {
      id: 1,
      title: "Deep Learning Applications in Natural Language Processing",
      authors: "Smith, J., Johnson, M., Williams, R.",
      journal: "Journal of Artificial Intelligence Research",
      year: 2024,
      type: "research",
      abstract:
        "This paper explores recent advances in deep learning techniques applied to NLP tasks...",
      doi: "10.1234/ai.2024.001",
    },
    {
      id: 2,
      title: "Ethics of AI in Healthcare Decision Making",
      authors: "Brown, A., Davis, L.",
      journal: "AI Ethics Quarterly",
      year: 2024,
      type: "review",
      abstract:
        "A comprehensive review of ethical considerations in AI-powered healthcare systems...",
      doi: "10.1234/ai.2024.002",
    },
    {
      id: 3,
      title: "Reinforcement Learning in Autonomous Systems",
      authors: "Wilson, P., Anderson, K.",
      journal: "Robotics and AI",
      year: 2023,
      type: "research",
      abstract:
        "An analysis of advanced reinforcement learning algorithms in autonomous systems...",
      doi: "10.1234/ai.2023.003",
    },
  ];
  const filteredJournals = journalArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(journalSearchQuery.toLowerCase()) ||
      article.authors
        .toLowerCase()
        .includes(journalSearchQuery.toLowerCase()) ||
      article.journal.toLowerCase().includes(journalSearchQuery.toLowerCase());
    const matchesDate =
      selectedDateFilter === "all" ||
      article.year.toString() === selectedDateFilter;
    const matchesType =
      selectedJournalType === "all" || article.type === selectedJournalType;
    return matchesSearch && matchesDate && matchesType;
  });
  const handleCitation = (article: (typeof journalArticles)[0]) => {
    const citation = `${article.authors} (${article.year}). ${article.title}. ${article.journal}. DOI: ${article.doi}`;
    console.log("Citation added:", citation);
    setIsJournalsModalOpen(false);
  };
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (
        fileDropdownRef.current &&
        !fileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFileDropdownOpen(false);
      }
      if (
        viewDropdownRef.current &&
        !viewDropdownRef.current.contains(event.target as Node)
      ) {
        setIsViewDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, isUser: true }]);
      setNewMessage("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "I'm analyzing your document and providing suggestions based on your query.",
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="h-16 bg-white shadow-sm fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600 cursor-pointer">
            QuantumQuill
          </h1>
        </div>
        {/* Navigation */}
        <nav className="flex space-x-6">
          {/* File Dropdown */}
          <div className="relative" ref={fileDropdownRef}>
            <button
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium !rounded-button whitespace-nowrap cursor-pointer"
              onClick={() => setIsFileDropdownOpen(!isFileDropdownOpen)}
            >
              File <i className="fas fa-chevron-down ml-1 text-xs"></i>
            </button>
            {isFileDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md py-1 z-20">
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-plus mr-2"></i> New
                </button>
                <button
                  id="open-file-btn"
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer"
                  onClick={() => {
                    const input = document.getElementById("file-input");
                    if (input) (input as HTMLInputElement).click();
                  }}
                >
                  <i className="fas fa-folder-open mr-2"></i> Open
                </button>
                <input
                  type="file"
                  id="file-input"
                  className="hidden"
                  accept=".txt,.doc,.docx,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const fileDialog = document.createElement("div");
                      fileDialog.id = "file-dialog";
                      fileDialog.className =
                        "fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center";

                      const content = document.createElement("div");
                      content.className =
                        "bg-white rounded-lg shadow-xl w-[500px] p-6";

                      const size = (file.size / 1024).toFixed(2);
                      const lastModified = new Date(
                        file.lastModified
                      ).toLocaleString();

                      content.innerHTML = `
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-medium text-gray-800">File Details</h3>
          <button id="close-dialog" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="space-y-3">
          <div class="flex items-center p-3 bg-gray-50 rounded-lg">
            <i class="fas fa-file-alt text-blue-500 text-2xl mr-3"></i>
            <div class="flex-1">
              <p class="font-medium text-gray-800">${file.name}</p>
              <p class="text-sm text-gray-500">Size: ${size} KB</p>
              <p class="text-sm text-gray-500">Last modified: ${lastModified}</p>
            </div>
          </div>
          <div class="flex justify-end space-x-3 mt-4">
            <button id="cancel-btn" class="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 !rounded-button">Cancel</button>
            <button id="open-btn" class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 !rounded-button">Open File</button>
          </div>
        </div>
      `;

                      fileDialog.appendChild(content);
                      document.body.appendChild(fileDialog);

                      const closeDialog = () => {
                        document.body.removeChild(fileDialog);
                        e.target.value = "";
                      };

                      document
                        .getElementById("close-dialog")
                        ?.addEventListener("click", closeDialog);
                      document
                        .getElementById("cancel-btn")
                        ?.addEventListener("click", closeDialog);
                      document
                        .getElementById("open-btn")
                        ?.addEventListener("click", () => {
                          // Here you can add the logic to handle the file opening
                          console.log("Opening file:", file);
                          closeDialog();
                        });
                    }
                  }}
                />
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-save mr-2"></i> Save
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-file-pdf mr-2"></i> Export as PDF
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-file-word mr-2"></i> Export as DOCX
                </button>
              </div>
            )}
          </div>
          {/* View Dropdown */}
          <div className="relative" ref={viewDropdownRef}>
            <button
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium !rounded-button whitespace-nowrap cursor-pointer"
              onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
            >
              View <i className="fas fa-chevron-down ml-1 text-xs"></i>
            </button>
            {isViewDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md py-1 z-20">
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-search-plus mr-2"></i> Zoom In
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-search-minus mr-2"></i> Zoom Out
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-expand mr-2"></i> Fullscreen
                </button>
              </div>
            )}
          </div>
        </nav>
        {/* User Controls */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="border-none bg-transparent font-bold text-base focus:outline-none focus:ring-2 focus:ring-blue-200 rounded px-2 py-1 w-48 text-center"
            />
          </div>
          {/* Profile Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer hover:bg-blue-600"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <i className="fas fa-user"></i>
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white shadow-lg rounded-md py-1 z-20">
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-user-circle mr-2"></i> Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-cog mr-2"></i> Settings
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Toolbar */}
      <div className="fixed top-16 left-0 right-0 bg-white shadow-sm z-10 border-b border-gray-200">
        <div className="flex items-center px-4 py-2 space-x-1">
          {/* Text Formatting */}
          <div className="flex space-x-1 pr-4 border-r border-gray-200">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-bold"></i>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-italic"></i>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-underline"></i>
            </button>
          </div>
          {/* Layout Controls */}
          <div className="flex space-x-1 px-4 border-r border-gray-200">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-align-left"></i>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-align-center"></i>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-align-right"></i>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-list-ul"></i>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-list-ol"></i>
            </button>
          </div>
          {/* Font Controls */}
          <div className="flex items-center space-x-2 px-4 border-r border-gray-200">
            <div className="relative">
              <select className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-1 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                <option>Arial</option>
                <option>Times New Roman</option>
                <option>Calibri</option>
                <option>Georgia</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <i className="fas fa-chevron-down text-xs"></i>
              </div>
            </div>
            <div className="relative">
              <select className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-1 px-2 pr-6 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                <option>12</option>
                <option>14</option>
                <option>16</option>
                <option>18</option>
                <option>24</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                <i className="fas fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>
          {/* AI Features */}
          <div className="flex space-x-2 px-4">
            <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100 !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-spell-check mr-1"></i> Grammar
            </button>
            <button
              className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100 !rounded-button whitespace-nowrap cursor-pointer"
              onClick={() => setIsJournalsModalOpen(true)}
              id="journals-button"
            >
              <i className="fas fa-book mr-1"></i> Journals
            </button>
            <button
              id="plagiarism-button"
              className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100 !rounded-button whitespace-nowrap cursor-pointer"
              onClick={() => setIsPlagiarismModalOpen(true)}
            >
              <i className="fas fa-check-double mr-1"></i> Plagiarism
            </button>
            <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100 !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-quote-right mr-1"></i> Citation
            </button>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer"
              onClick={() => setIsChatbotOpen(!isChatbotOpen)}
            >
              <i className="fas fa-robot mr-1"></i> Chatbot
            </button>
          </div>
          {/* Undo/Redo */}
          <div className="ml-auto flex space-x-1">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-undo"></i>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-redo"></i>
            </button>
          </div>
        </div>
      </div>
      {/* Main Editor */}
      <main className="flex-1 pt-36 pb-16 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-8 min-h-[800px]">
          <div className="prose max-w-none">
            <h1>The Impact of Artificial Intelligence on Modern Society</h1>
            <p>
              Artificial intelligence (AI) has emerged as a{" "}
              <span
                className="border-b-2 border-red-300 cursor-help"
                title="Consider: 'transformative'"
              >
                revolutionary
              </span>{" "}
              technology that is reshaping various aspects of modern society.
              From healthcare to transportation, education to entertainment, AI
              applications are becoming increasingly prevalent and influential.
              This paper examines the multifaceted impact of AI on contemporary
              social structures, economic systems, and ethical frameworks.
            </p>
            <h2>Background and Historical Context</h2>
            <p>
              The concept of artificial intelligence dates back to the mid-20th
              century, when computer scientists first began exploring the
              possibility of creating machines capable of simulating human
              intelligence. The term "artificial intelligence" was coined by
              John McCarthy in 1956 at the Dartmouth Conference, which is widely
              considered the{" "}
              <span
                className="border-b-2 border-blue-300 cursor-help"
                title="Tone suggestion: Consider using more formal language"
              >
                birthplace
              </span>{" "}
              of AI as a field of study.
            </p>
            <p>
              Early AI research focused primarily on problem-solving and
              symbolic methods. However, the field has evolved significantly
              over the decades, particularly with the advent of machine learning
              and deep learning approaches that enable systems to learn from
              data rather than following explicitly programmed instructions.
            </p>
            <h2>Economic Implications</h2>
            <p>
              The integration of AI technologies into various industries has
              profound economic implications. On one hand, AI has the potential
              to significantly boost productivity and economic growth by
              automating routine tasks, optimizing processes, and enabling new
              products and services. According to a report by PwC, AI could
              contribute up to $15.7 trillion to the global economy by 2030.
            </p>
            <p>
              On the other hand, the automation capabilities of AI raise
              concerns about job displacement and labor market disruption. While
              some argue that AI will create more jobs than it eliminates by
              generating new industries and roles, others warn of potential
              widespread unemployment, particularly in sectors heavily reliant
              on routine cognitive or manual tasks.
            </p>
            <h3>References</h3>
            <div className="pl-8 text-sm space-y-2">
              <p className="text-gray-700">
                McCarthy, J., Minsky, M., Rochester, N., & Shannon, C. (1955). A
                Proposal for the Dartmouth Summer Research Project on Artificial
                Intelligence. AI Magazine, 27(4), 12-14.
              </p>
              <p className="text-gray-700">
                PwC. (2018). The macroeconomic impact of artificial
                intelligence. Retrieved from
                https://www.pwc.co.uk/economic-services/assets/macroeconomic-impact-of-ai-technical-report-feb-18.pdf
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Journals Modal */}
      {isJournalsModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-20"
            onClick={() => setIsJournalsModalOpen(false)}
          ></div>
          <div
            className="fixed z-30 w-[800px] h-[600px] bg-white rounded-lg shadow-xl flex flex-col"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-800 text-lg">
                <i className="fas fa-book text-blue-500 mr-2"></i>
                Academic Journals Database
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setIsJournalsModalOpen(false)}
                id="close-journals-modal"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Search journals, articles, or authors..."
                    value={journalSearchQuery}
                    onChange={(e) => setJournalSearchQuery(e.target.value)}
                    id="journal-search"
                  />
                </div>
                <select
                  className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={selectedDateFilter}
                  onChange={(e) => setSelectedDateFilter(e.target.value)}
                  id="date-filter"
                >
                  <option value="all">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                <select
                  className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={selectedJournalType}
                  onChange={(e) => setSelectedJournalType(e.target.value)}
                  id="type-filter"
                >
                  <option value="all">All Types</option>
                  <option value="research">Research</option>
                  <option value="review">Review</option>
                </select>
              </div>
            </div>
            {/* Journal List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {filteredJournals.map((article) => (
                  <div
                    key={article.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-lg text-gray-800">
                          {article.title}
                        </h4>
                        <p className="text-gray-600 mt-1">{article.authors}</p>
                        <p className="text-gray-500 text-sm mt-1">
                          {article.journal} • {article.year}
                        </p>
                        <p className="text-gray-700 mt-2">{article.abstract}</p>
                      </div>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 !rounded-button whitespace-nowrap"
                        onClick={() => handleCitation(article)}
                        id={`cite-button-${article.id}`}
                      >
                        <i className="fas fa-quote-right mr-2"></i>
                        Cite
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {/* Plagiarism Modal */}
      {isPlagiarismModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-20"
            onClick={() => !isScanning && setIsPlagiarismModalOpen(false)}
          ></div>
          <div
            className="fixed z-30 w-[800px] h-[600px] bg-white rounded-lg shadow-xl flex flex-col"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-800 text-lg">
                <i className="fas fa-check-double text-blue-500 mr-2"></i>
                Plagiarism Checker
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => !isScanning && setIsPlagiarismModalOpen(false)}
                id="close-plagiarism-modal"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            {/* Scan Options */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="scan-full"
                    name="scan-type"
                    checked={scanType === "full"}
                    onChange={() => setScanType("full")}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="scan-full">Scan entire document</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="scan-selection"
                    name="scan-type"
                    checked={scanType === "selection"}
                    onChange={() => setScanType("selection")}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="scan-selection">Scan selected text</label>
                </div>
                <button
                  id="start-scan-button"
                  className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed !rounded-button whitespace-nowrap"
                  onClick={() => {
                    setIsScanning(true);
                    setScanProgress(0);
                    const interval = setInterval(() => {
                      setScanProgress((prev) => {
                        if (prev >= 100) {
                          clearInterval(interval);
                          setIsScanning(false);
                          setScanResults([
                            {
                              text: "The concept of artificial intelligence dates back to the mid-20th century",
                              similarity: 85,
                              source: "https://example.com/ai-history",
                            },
                            {
                              text: "AI could contribute up to $15.7 trillion to the global economy by 2030",
                              similarity: 92,
                              source: "https://pwc.com/ai-report",
                            },
                          ]);
                          return 100;
                        }
                        return prev + 10;
                      });
                    }, 500);
                  }}
                  disabled={isScanning}
                >
                  {isScanning ? "Scanning..." : "Start Scan"}
                </button>
              </div>
            </div>
            {/* Progress Bar */}
            {isScanning && (
              <div className="p-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
                <p className="text-center mt-2 text-sm text-gray-600">
                  Scanning document... {scanProgress}%
                </p>
              </div>
            )}
            {/* Results */}
            {!isScanning && scanResults.length > 0 && (
              <div className="flex-1 overflow-y-auto p-4">
                <h4 className="font-medium text-lg mb-4">Scan Results</h4>
                <div className="space-y-4">
                  {scanResults.map((result, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          Similarity: {result.similarity}%
                        </span>
                        <a
                          href={result.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-sm"
                        >
                          View Source{" "}
                          <i className="fas fa-external-link-alt ml-1"></i>
                        </a>
                      </div>
                      <p className="text-gray-800 bg-yellow-50 p-3 rounded">
                        "{result.text}"
                      </p>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">
                          Suggestions:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          <li>Consider paraphrasing the content</li>
                          <li>Add proper citation using the citation tool</li>
                          <li>Revise the text to make it more original</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!isScanning && scanResults.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Click "Start Scan" to check for plagiarism
              </div>
            )}
          </div>
        </>
      )}
      {/* Chatbot Modal */}
      {isChatbotOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-20"
            onClick={() => setIsChatbotOpen(false)}
          ></div>
          <div
            className="fixed z-30 w-[400px] h-[500px] bg-white rounded-lg shadow-xl flex flex-col"
            style={{
              top: "50%",
              left: "75%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Chatbot Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-800">
                <i className="fas fa-robot text-blue-500 mr-2"></i>
                AI Assistant
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600 !rounded-button whitespace-nowrap cursor-pointer"
                onClick={() => setIsChatbotOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            {/* Chat Messages */}
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
            {/* Input Area */}
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
                  } !rounded-button whitespace-nowrap cursor-pointer`}
                >
                  <i className="fas fa-paper-plane text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default App;

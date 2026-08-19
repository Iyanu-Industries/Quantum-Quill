import React, { useState } from "react";

const journalArticles = [
  {
    id: 1,
    title: "Deep Learning Applications in Natural Language Processing",
    authors: "Smith, J., Johnson, M., Williams, R.",
    journal: "Journal of Artificial Intelligence Research",
    year: 2024,
    type: "research",
    abstract:
      "This paper explores recent advances in deep learning techniques...",
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
      "A comprehensive review of ethical considerations in AI-powered healthcare...",
    doi: "10.1234/ai.2024.002",
  },
  {
    id: 3,
    title: "Reinforcement Learning in Autonomous Systems",
    authors: "Wilson, P., Anderson, K.",
    journal: "Robotics and AI",
    year: 2023,
    type: "research",
    abstract: "An analysis of advanced reinforcement learning algorithms...",
    doi: "10.1234/ai.2023.003",
  },
];
interface JournalsModalProps {
  setIsJournalsModalOpen: (isOpen: boolean) => void;
  handleCitation: (article: (typeof journalArticles)[0]) => void;
}

const JournalsModal: React.FC<JournalsModalProps> = ({
  setIsJournalsModalOpen,
  handleCitation,
}) => {
  const [journalSearchQuery, setJournalSearchQuery] = useState("");
  const [selectedDateFilter, setSelectedDateFilter] = useState("all");
  const [selectedJournalType, setSelectedJournalType] = useState("all");

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
  return (
    <div className="fixed inset-0 bg-black/30 z-20 flex items-center justify-center">
      <div className="w-[800px] h-[600px] bg-white rounded-lg shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-800 text-lg">
            <i className="fas fa-book text-blue-500 mr-2"></i> Academic Journals
            Database
          </h3>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setIsJournalsModalOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
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
              />
            </div>
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
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
            >
              <option value="all">All Types</option>
              <option value="research">Research</option>
              <option value="review">Review</option>
            </select>
          </div>
        </div>
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
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => handleCitation(article)}
                  >
                    <i className="fas fa-quote-right mr-2"></i> Cite
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalsModal;

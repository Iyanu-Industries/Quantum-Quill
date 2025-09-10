interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const templates = [
    { name: "Blank Document", icon: "ri-file-text-line" },
    { name: "Research Paper", icon: "ri-file-paper-line" },
    { name: "Essay Template", icon: "ri-article-line" },
    { name: "Report Template", icon: "ri-file-chart-line" },
    { name: "Letter Template", icon: "ri-mail-line" },
  ];

  const recentDocs = [
    {
      name: "Research Paper Draft",
      date: "2 hours ago",
      icon: "ri-file-text-line",
    },
    { name: "Project Proposal", date: "1 day ago", icon: "ri-file-paper-line" },
    { name: "Meeting Notes", date: "3 days ago", icon: "ri-sticky-note-line" },
    { name: "Annual Report", date: "1 week ago", icon: "ri-file-chart-line" },
  ];

  if (!isOpen) {
    return (
      <div className="w-12 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4">
        <button
          onClick={onToggle}
          className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <i className="ri-menu-line text-gray-300"></i>
        </button>
      </div>
    );
  }

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h2 className="font-bold text-white">Documents</h2>
        <button
          onClick={onToggle}
          className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-gray-300"></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">
            Templates
          </h3>
          <div className="space-y-2">
            {templates.map((template, index) => (
              <button
                key={index}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer text-left"
              >
                <i className={`${template.icon} text-purple-400`}></i>
                <span className="text-sm text-gray-300">{template.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-800">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">
            Recent Documents
          </h3>
          <div className="space-y-2">
            {recentDocs.map((doc, index) => (
              <button
                key={index}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer text-left"
              >
                <i className={`${doc.icon} text-blue-400`}></i>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-300 truncate">
                    {doc.name}
                  </div>
                  <div className="text-xs text-gray-500">{doc.date}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

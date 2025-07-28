import React, { useEffect, useState } from "react";
import "../../../app/application/editor/styles.css";
interface ToolbarProps {
  setIsJournalsModalOpen: (isOpen: boolean) => void;
  setIsPlagiarismModalOpen: (isOpen: boolean) => void;
  setIsChatbotOpen: (isOpen: boolean) => void;
  isChatbotOpen: boolean;
  handleUndo: () => void;
  handleRedo: () => void;
  toolbarOptions: any[];
}

const Toolbar: React.FC<ToolbarProps> = ({
  setIsJournalsModalOpen,
  setIsPlagiarismModalOpen,
  setIsChatbotOpen,
  isChatbotOpen,
  handleUndo,
  handleRedo,
  toolbarOptions,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    // Initialize the toolbar with Quill options
    const toolbarContainer = document.getElementById("toolbar");
    if (toolbarContainer && toolbarOptions) {
      toolbarContainer.innerHTML = "";

      // Create toolbar groups
      toolbarOptions.forEach((group) => {
        const groupSpan = document.createElement("span");
        groupSpan.className = "ql-formats";

        group.forEach((format: any) => {
          if (typeof format === "string") {
            // Simple button (bold, italic, etc.)
            const button = document.createElement("button");
            button.className = `ql-${format}`;
            button.type = "button";
            groupSpan.appendChild(button);
          } else if (typeof format === "object") {
            // Dropdown or complex format
            const key = Object.keys(format)[0];
            const values = format[key];

            if (Array.isArray(values)) {
              const select = document.createElement("select");
              select.className = `ql-${key}`;

              values.forEach((value) => {
                const option = document.createElement("option");
                if (value !== false) {
                  option.value = value;
                  option.textContent = value.toString();
                }
                select.appendChild(option);
              });

              groupSpan.appendChild(select);
            } else {
              const button = document.createElement("button");
              button.className = `ql-${key}`;
              if (values) {
                button.value = values;
              }
              button.type = "button";
              groupSpan.appendChild(button);
            }
          }
        });

        toolbarContainer.appendChild(groupSpan);
      });
    }
  }, [toolbarOptions, isMounted]);

  return (
    <div className="fixed top-16 left-0 right-0 bg-white shadow-sm z-10 border-b border-gray-200">
      <div className="flex items-center px-4 py-2 space-x-1">
        <div className="ql-toolbar ql-snow" id="toolbar"></div>

        <div className="flex space-x-2 px-4">
          <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100 cursor-pointer">
            <i className="fas fa-spell-check mr-1"></i> Grammar
          </button>
          <button
            className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100 cursor-pointer"
            onClick={() => setIsJournalsModalOpen(true)}
          >
            <i className="fas fa-book mr-1"></i> Journals
          </button>
          <button
            className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100 cursor-pointer"
            onClick={() => setIsPlagiarismModalOpen(true)}
          >
            <i className="fas fa-check-double mr-1"></i> Plagiarism
          </button>
          <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100 cursor-pointer">
            <i className="fas fa-quote-right mr-1"></i> Citation
          </button>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 cursor-pointer"
            onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          >
            <i className="fas fa-robot mr-1"></i> Chatbot
          </button>
        </div>

        <div className="ml-auto flex space-x-1">
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
            onClick={handleUndo}
          >
            <i className="fas fa-undo"></i>
          </button>
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
            onClick={handleRedo}
          >
            <i className="fas fa-redo"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;

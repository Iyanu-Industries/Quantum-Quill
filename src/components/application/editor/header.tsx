import React, { useState, useEffect, useRef } from "react";

interface HeaderProps {
  documentTitle: string;
  setDocumentTitle: (title: string) => void;
  handleSave: () => void;
  handleExportPDF: () => void;
  handleExportDOCX: () => void;
  handleZoom: (direction: "in" | "out") => void;
}

const header: React.FC<HeaderProps> = ({
  handleSave,
  handleExportPDF,
  handleExportDOCX,
  handleZoom,
  documentTitle,
  setDocumentTitle,
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const fileDropdownRef = useRef<HTMLDivElement>(null);
  const viewDropdownRef = useRef<HTMLDivElement>(null);

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
  return (
    <header className="h-16 bg-white shadow-sm fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-blue-600 cursor-pointer">
          QuantumQuill
        </h1>
      </div>
      <nav className="flex space-x-6">
        <div className="relative" ref={fileDropdownRef}>
          <button
            className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded cursor-pointer"
            onClick={() => setIsFileDropdownOpen(!isFileDropdownOpen)}
          >
            File <i className="fas fa-chevron-down ml-1 text-xs"></i>
          </button>
          {isFileDropdownOpen && (
            <div className="absolute top-full left-0 z-50 mt-1 w-48 bg-white shadow-lg rounded-md py-1">
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                <i className="fas fa-plus mr-2"></i> New
              </button>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = ".txt,.doc,.docx,.pdf";
                  input.onchange = (event) => {
                    const file = (event.target as HTMLInputElement).files?.[0];
                    if (file) {
                      console.log("Opening file:", file.name);
                      // Add file handling logic (e.g., read file and set in Quill)
                    }
                  };
                  input.click();
                }}
              >
                <i className="fas fa-folder-open mr-2"></i> Open
              </button>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                onClick={handleSave}
              >
                <i className="fas fa-save mr-2"></i> Save
              </button>
              <div className="border-t border-gray-200 my-1"></div>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                onClick={handleExportPDF}
              >
                <i className="fas fa-file-pdf mr-2"></i> Export as PDF
              </button>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                onClick={handleExportDOCX}
              >
                <i className="fas fa-file-word mr-2"></i> Export as DOCX
              </button>
            </div>
          )}
        </div>
        <div className="relative" ref={viewDropdownRef}>
          <button
            className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded cursor-pointer"
            onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
          >
            View <i className="fas fa-chevron-down ml-1 text-xs"></i>
          </button>
          {isViewDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md py-1">
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handleZoom("in")}
              >
                <i className="fas fa-search-plus mr-2"></i> Zoom In
              </button>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handleZoom("out")}
              >
                <i className="fas fa-search-minus mr-2"></i> Zoom Out
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                <i className="fas fa-expand mr-2"></i> Fullscreen
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
          className="border-none bg-transparent font-bold text-base focus:outline-none focus:ring-2 focus:ring-blue-200 rounded px-2 py-1 w-48 text-center"
        />
        <div className="relative" ref={profileDropdownRef}>
          <button
            className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer hover:bg-blue-600"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <i className="fas fa-user"></i>
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white shadow-lg rounded-md py-1">
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                <i className="fas fa-user-circle mr-2"></i> Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                <i className="fas fa-cog mr-2"></i> Settings
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                <i className="fas fa-sign-out-alt mr-2"></i> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default header;

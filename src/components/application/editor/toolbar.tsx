import React, { useState } from "react";
import { PageSetup } from "./interfaces";
interface ToolbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onBold: () => void;
  onZoomOut: () => void;
  onCitationManager: () => void;
  onPlagiarismCheck: () => void;
  onGrammarCheck: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onAlignLeft: () => void;
  onAlignCenter: () => void;
  onBulletList: () => void;
  onNumberList: () => void;
  onAlignRight: () => void;
  pageSetup: PageSetup;
  onPageSetupChange: (
    property: keyof PageSetup,
    value: string | number
  ) => void;
  changeFontSize: (size: string) => void;
  onAlignJustify: () => void;
}

export function Toolbar({
  onBulletList,
  onNumberList,
  pageSetup,
  onPageSetupChange,
  onBold,
  onItalic,
  onUnderline,
  onAlignCenter,
  onAlignLeft,
  onAlignRight,
  activeTab,
  onTabChange,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onCitationManager,
  onPlagiarismCheck,
  onGrammarCheck,
  changeFontSize,
}: ToolbarProps) {
  const tabs = ["Format", "Insert", "Tools", "View"];
  const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  const handleTableInsert = () => {
    console.log(
      `Inserting table with ${tableRows} rows and ${tableCols} columns`
    );
    setIsTableDropdownOpen(false);
  };

  const renderTableDropdown = () => (
    <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-600 rounded shadow-lg z-10 p-4 min-w-[200px)">
      <div className="text-xs text-gray-300 mb-3">Insert Table:</div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Rows:</label>
          <input
            type="number"
            min="1"
            max="20"
            value={tableRows}
            onChange={(e) => setTableRows(parseInt(e.target.value) || 1)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Columns:</label>
          <input
            type="number"
            min="1"
            max="20"
            value={tableCols}
            onChange={(e) => setTableCols(parseInt(e.target.value) || 1)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm"
          />
        </div>

        <button
          onClick={handleTableInsert}
          className="w-full px-3 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap"
        >
          Insert Table
        </button>
      </div>
    </div>
  );

  const renderFormatTools = () => (
    <div className="flex items-center space-x-2">
      <button
        onClick={onBold}
        className="px-3 py-1 bg-purple-600 text-white rounded text-sm font-bold hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="fas fa-bold"></i>
      </button>
      <button
        onClick={onItalic}
        className="px-3 py-1 bg-gray-700 text-white rounded text-sm italic hover:bg-gray-600 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="fas fa-italic"></i>
      </button>
      <button
        onClick={onUnderline}
        className="px-3 py-1 bg-gray-700 text-white rounded text-sm underline hover:bg-gray-600 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="fas fa-underline"></i>
      </button>

      <div className="w-px h-6 bg-gray-600 mx-2"></div>

      <select
        value={pageSetup.fontFamily}
        onChange={(e) => onPageSetupChange("fontFamily", e.target.value)}
        className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm pr-8 cursor-pointer"
      >
        <option value="Arial, sans-serif">Arial</option>
        <option value="Georgia, serif">Georgia</option>
        <option value="'Times New Roman', serif">Times New Roman</option>
        <option value="Helvetica, sans-serif">Helvetica</option>
        <option value="Verdana, sans-serif">Verdana</option>
        <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
        <option value="'Courier New', monospace">Courier New</option>
        <option value="Impact, sans-serif">Impact</option>
        <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
      </select>

      <select
        value={pageSetup.fontSize}
        onChange={(e) => {
          onPageSetupChange("fontSize", e.target.value);
          changeFontSize(e.target.value);
        }}
        className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm pr-8 cursor-pointer"
      >
        <option value="8">8px</option>
        <option value="10">10px</option>
        <option value="12">12px</option>
        <option value="14">14px</option>
        <option value="16">16px</option>
        <option value="18">18px</option>
        <option value="24">24px</option>
        <option value="36">36px</option>
        <option value="48">48px</option>
      </select>

      <div className="w-px h-6 bg-gray-600 mx-2"></div>

      <button
        onClick={onAlignLeft}
        className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="fas fa-align-left"></i>
      </button>
      <button
        onClick={onAlignCenter}
        className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="fas fa-align-center"></i>
      </button>
      <button
        onClick={onAlignRight}
        className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="fas fa-align-right"></i>
      </button>

      <div className="w-px h-6 bg-gray-600 mx-2"></div>

      <button
        onClick={onBulletList}
        className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="ri-list-unordered"></i>
      </button>
      <button
        onClick={onNumberList}
        className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="ri-list-ordered"></i>
      </button>
    </div>
  );

  const renderInsertTools = () => (
    <div className="flex items-center space-x-2">
      <button className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
        <i className="ri-image-line mr-1"></i>Image
      </button>
      <div className="relative">
        <button
          onClick={() => setIsTableDropdownOpen(!isTableDropdownOpen)}
          className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-table-line mr-1"></i>Table
        </button>
        {isTableDropdownOpen && renderTableDropdown()}
      </div>
      <button className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
        <i className="ri-link mr-1"></i>Link
      </button>
      <button
        onClick={onCitationManager}
        className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="ri-bookmark-line mr-1"></i>Citation
      </button>
    </div>
  );

  const renderToolsTools = () => (
    <div className="flex items-center space-x-2">
      <button
        onClick={onGrammarCheck}
        className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="ri-spell-check-line mr-1"></i>Grammar Check
      </button>
      <button
        onClick={onPlagiarismCheck}
        className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="ri-shield-check-line mr-1"></i>Plagiarism Detector
      </button>
      <button
        onClick={onCitationManager}
        className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="ri-bookmark-line mr-1"></i>Citation Manager
      </button>
      <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap">
        <i className="ri-robot-line mr-1"></i>AI Chatbot
      </button>
    </div>
  );

  const renderViewTools = () => (
    <div className="flex items-center space-x-2">
      <button
        onClick={onZoomIn}
        className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="ri-zoom-in-line mr-1"></i>Zoom In
      </button>
      <button
        onClick={onZoomOut}
        className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap"
      >
        <i className="ri-zoom-out-line mr-1"></i>Zoom Out
      </button>
      <span className="px-3 py-1 bg-gray-800 text-white rounded text-sm">
        {zoomLevel}%
      </span>
      <button className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
        <i className="ri-fullscreen-line mr-1"></i>Full Screen
      </button>
      <button className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
        <i className="ri-layout-line mr-1"></i>Page Layout
      </button>
    </div>
  );

  const renderTools = () => {
    switch (activeTab) {
      case "Format":
        return renderFormatTools();
      case "Insert":
        return renderInsertTools();
      case "Tools":
        return renderToolsTools();
      case "View":
        return renderViewTools();
      default:
        return renderFormatTools();
    }
  };

  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="flex items-center space-x-1 px-4 py-2 border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4 py-3">{renderTools()}</div>
    </div>
  );
}

'use client';
import { useState, useEffect, useRef } from 'react';

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
onPageSetupChange: (property: keyof PageSetup, value: string | number) => void;
changeFontSize: (size: string) => void;
  onAlignJustify: () => void;
}

export function Toolbar({ onBulletList, onNumberList, pageSetup, onPageSetupChange, onBold, onItalic, onUnderline, onAlignCenter, onAlignJustify, onAlignLeft, onAlignRight,  activeTab, onTabChange, zoomLevel, onZoomIn, onZoomOut, onCitationManager, onPlagiarismCheck, onGrammarCheck, changeFontSize }: ToolbarProps) {
  const tabs = ['Format', 'Insert', 'Tools', 'View'];
  const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  const handleTableInsert = () => {
    console.log(`Inserting table with ${tableRows} rows and ${tableCols} columns`);
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
      <button onClick={onBold} className="px-3 py-1 bg-purple-600 text-white rounded text-sm font-bold hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap">
        <i className="fas fa-bold"></i>

      </button>
      <button onClick={onItalic} className="px-3 py-1 bg-gray-700 text-white rounded text-sm italic hover:bg-gray-600 transition-colors cursor-pointer whitespace-nowrap">
        <i className="fas fa-italic"></i>

      </button>
      <button onClick={onUnderline} className="px-3 py-1 bg-gray-700 text-white rounded text-sm underline hover:bg-gray-600 transition-colors cursor-pointer whitespace-nowrap">
        <i className="fas fa-underline"></i>
      </button>
      
      <div className="w-px h-6 bg-gray-600 mx-2"></div>
      
      <select
        value={pageSetup.fontFamily}
        onChange={(e) => onPageSetupChange('fontFamily', e.target.value)}
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
    onPageSetupChange('fontSize',e.target.value);
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
      
      <button onClick={onAlignLeft} className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
              <i className="fas fa-align-left"></i>
      </button>
      <button onClick={onAlignCenter} className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
              <i className="fas fa-align-center"></i>
      </button>
      <button onClick={onAlignRight} className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
              <i className="fas fa-align-right"></i>
      </button>
      
      <div className="w-px h-6 bg-gray-600 mx-2"></div>
      
      <button onClick={onBulletList} className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
        <i className="ri-list-unordered"></i>
      </button>
      <button onClick={onNumberList} className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
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
      case 'Format': return renderFormatTools();
      case 'Insert': return renderInsertTools();
      case 'Tools': return renderToolsTools();
      case 'View': return renderViewTools();
      default: return renderFormatTools();
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
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="px-4 py-3">
        {renderTools()}
      </div>
    </div>
  );
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const templates = [
    { name: 'Blank Document', icon: 'ri-file-text-line' },
    { name: 'Research Paper', icon: 'ri-file-paper-line' },
    { name: 'Essay Template', icon: 'ri-article-line' },
    { name: 'Report Template', icon: 'ri-file-chart-line' },
    { name: 'Letter Template', icon: 'ri-mail-line' },
  ];

  const recentDocs = [
    { name: 'Research Paper Draft', date: '2 hours ago', icon: 'ri-file-text-line' },
    { name: 'Project Proposal', date: '1 day ago', icon: 'ri-file-paper-line' },
    { name: 'Meeting Notes', date: '3 days ago', icon: 'ri-sticky-note-line' },
    { name: 'Annual Report', date: '1 week ago', icon: 'ri-file-chart-line' },
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
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Templates</h3>
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
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Recent Documents</h3>
          <div className="space-y-2">
            {recentDocs.map((doc, index) => (
              <button
                key={index}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer text-left"
              >
                <i className={`${doc.icon} text-blue-400`}></i>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-300 truncate">{doc.name}</div>
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

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center animate-pulse">
            <i className="ri-quill-pen-line text-white text-2xl"></i>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 animate-ping"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4 font-pacifico">Quantum Quill</h2>
        
        <div className="flex items-center justify-center space-x-1 mb-4">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        <p className="text-gray-400 text-sm">Loading your writing workspace...</p>
        
        <div className="mt-6 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
export function Header() {
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
    setIsExportDropdownOpen(false);
  };

  const handleShare = (method: string) => {
    console.log(`Sharing via ${method}`);
    setIsShareDropdownOpen(false);
  };

  const handleProfileAction = (action: string) => {
    console.log(`Profile action: ${action}`);
    setIsProfileDropdownOpen(false);
  };

  const renderExportDropdown = () => (
    <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600 rounded shadow-lg z-10 min-w-[180px]">
      <div className="py-1">
        <button
          onClick={() => handleExport('PDF')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-file-pdf-line mr-2"></i>Export as PDF
        </button>
        <button
          onClick={() => handleExport('DOCX')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-file-word-line mr-2"></i>Export as DOCX
        </button>
        <button
          onClick={() => handleExport('HTML')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-html5-line mr-2"></i>Export as HTML
        </button>
        <button
          onClick={() => handleExport('TXT')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-file-text-line mr-2"></i>Export as TXT
        </button>
        <button
          onClick={() => handleExport('RTF')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-file-line mr-2"></i>Export as RTF
        </button>
        <button
          onClick={() => handleExport('EPUB')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-book-line mr-2"></i>Export as EPUB
        </button>
      </div>
    </div>
  );

  const renderShareDropdown = () => (
    <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600 rounded shadow-lg z-10 min-w-[180px]">
      <div className="py-1">
        <button
          onClick={() => handleShare('Link')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-link mr-2"></i>Share Link
        </button>
        <button
          onClick={() => handleShare('Email')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-mail-line mr-2"></i>Share via Email
        </button>
        <button
          onClick={() => handleShare('Google Drive')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-google-line mr-2"></i>Save to Google Drive
        </button>
        <button
          onClick={() => handleShare('Collaborate')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-team-line mr-2"></i>Invite Collaborators
        </button>
        <button
          onClick={() => handleShare('QR Code')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-qr-code-line mr-2"></i>Generate QR Code
        </button>
        <div className="border-t border-gray-600 my-1"></div>
        <button
          onClick={() => handleShare('Social')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-share-line mr-2"></i>Share on Social Media
        </button>
      </div>
    </div>
  );

  const renderProfileDropdown = () => (
    <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600 rounded shadow-lg z-10 min-w-[200px]">
      <div className="px-4 py-3 border-b border-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            AB
          </div>
          <div>
            <div className="text-sm font-medium text-white">Alex Brown</div>
            <div className="text-xs text-gray-400">alex.brown@email.com</div>
          </div>
        </div>
      </div>
      
      <div className="py-1">
        <button
          onClick={() => handleProfileAction('Profile Settings')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-user-settings-line mr-2"></i>Profile Settings
        </button>
        <button
          onClick={() => handleProfileAction('Account')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-account-circle-line mr-2"></i>Account
        </button>
        <button
          onClick={() => handleProfileAction('Preferences')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-settings-3-line mr-2"></i>Preferences
        </button>
        <button
          onClick={() => handleProfileAction('Subscription')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-vip-crown-line mr-2"></i>Subscription
        </button>
        <div className="border-t border-gray-600 my-1"></div>
        <button
          onClick={() => handleProfileAction('Help & Support')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-question-line mr-2"></i>Help & Support
        </button>
        <button
          onClick={() => handleProfileAction('Keyboard Shortcuts')}
          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
        >
          <i className="ri-keyboard-line mr-2"></i>Keyboard Shortcuts
        </button>
        <div className="border-t border-gray-600 my-1"></div>
        <button
          onClick={() => handleProfileAction('Sign Out')}
          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors cursor-pointer"
        >
          <i className="ri-logout-box-line mr-2"></i>Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <header className="bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <i className="ri-quill-pen-line text-white text-lg"></i>
          </div>
          <span className="text-xl font-bold text-white font-pacifico">Quantum Quill</span>
        </div>
        
        <nav className="flex items-center space-x-4 text-gray-300">
          <button className="hover:text-white transition-colors whitespace-nowrap cursor-pointer">Home</button>
          <button className="hover:text-white transition-colors whitespace-nowrap cursor-pointer">Features</button>
          <button className="hover:text-white transition-colors whitespace-nowrap cursor-pointer">Pricing</button>
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <button className="hover:text-white transition-colors whitespace-nowrap cursor-pointer">
            <i className="ri-save-line mr-1"></i>Save
          </button>
          
          <div className="relative">
            <button 
              onClick={() => {
                setIsExportDropdownOpen(!isExportDropdownOpen);
                setIsShareDropdownOpen(false);
                setIsProfileDropdownOpen(false);
              }}
              className="hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-download-line mr-1"></i>Export
            </button>
            {isExportDropdownOpen && renderExportDropdown()}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => {
                setIsShareDropdownOpen(!isShareDropdownOpen);
                setIsExportDropdownOpen(false);
                setIsProfileDropdownOpen(false);
              }}
              className="hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-share-line mr-1"></i>Share
            </button>
            {isShareDropdownOpen && renderShareDropdown()}
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileDropdownOpen(!isProfileDropdownOpen);
              setIsExportDropdownOpen(false);
              setIsShareDropdownOpen(false);
            }}
            className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-purple-700 transition-colors"
          >
            AB
          </button>
          {isProfileDropdownOpen && renderProfileDropdown()}
        </div>
      </div>
    </header>
  );
}


interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  citationsData: any[];
  plagiarismData: any;
  grammarData: any[];
}

export function ChatSidebar({ isOpen, onToggle, citationsData, plagiarismData, grammarData }: ChatSidebarProps) {
  const [messages, setMessages] = useState([
    { type: 'ai', content: 'Hello, how can I assist you today?' },
    { type: 'user', content: 'I need help with formatting.' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeView, setActiveView] = useState<'chat' | 'citations' | 'plagiarism' | 'grammar'>('chat');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { type: 'user', content: inputMessage }]);
      setInputMessage('');
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: 'I can help you with document formatting, grammar checks, citations, and more. What specific assistance do you need?' 
        }]);
      }, 1000);
    }
  };

  const renderCitationsView = () => (
    <div className="flex-1 overflow-y-auto p-4">
      <h3 className="font-bold text-white mb-4">Citations Summary</h3>
      {citationsData.length === 0 ? (
        <div className="text-gray-400 text-center py-8">
          <i className="ri-bookmark-line text-4xl mb-2"></i>
          <p>No citations found</p>
          <p className="text-sm">Add citations to your document to see them here</p>
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
              <span className={`font-bold ${plagiarismData.score > 90 ? 'text-green-400' : plagiarismData.score > 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                {plagiarismData.score}%
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${plagiarismData.score > 90 ? 'bg-green-400' : plagiarismData.score > 70 ? 'bg-yellow-400' : 'bg-red-400'}`}
                style={{ width: `${plagiarismData.score}%` }}
              ></div>
            </div>
          </div>
          
          {plagiarismData.issues?.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-white font-medium">Issues Found:</h4>
              {plagiarismData.issues.map((issue: any, index: number) => (
                <div key={index} className="bg-red-900/30 border border-red-700 p-3 rounded-lg">
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
                <span className={`text-sm font-medium ${issue.type === 'error' ? 'text-red-400' : 'text-yellow-400'}`}>
                  {issue.type === 'error' ? 'Error' : 'Suggestion'}
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
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-200'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
              setActiveView('citations');
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
              setActiveView('plagiarism');
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
              setActiveView('grammar');
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
              onClick={() => setActiveView('chat')}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                activeView === 'chat' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
              onClick={() => setActiveView('citations')}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                activeView === 'citations' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
              onClick={() => setActiveView('plagiarism')}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                activeView === 'plagiarism' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
              onClick={() => setActiveView('grammar')}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                activeView === 'grammar' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
      
      {activeView === 'chat' && renderChatView()}
      {activeView === 'citations' && renderCitationsView()}
      {activeView === 'plagiarism' && renderPlagiarismView()}
      {activeView === 'grammar' && renderGrammarView()}
    </div>
  );
}
interface DocumentStats {
  words: number;
  characters: number;
  pages: number;
  charsNoSpaces: number;
  charsWithSpaces: number;
  paragraphs: number;
  lines: number;
}
interface EditorProps {
  zoomLevel: number;
  isSidebarOpen: boolean;
    pageSetup: PageSetup;
cleanupMarkers: ()=> void;
  isChatOpen: boolean;
  stats: DocumentStats;
  onStatsUpdate: (stats: DocumentStats) => void;
}

const Editor: React.FC<EditorProps> = ({ cleanupMarkers, zoomLevel, isSidebarOpen, isChatOpen, pageSetup, stats, onStatsUpdate }) => {
  // Fix: Type the ref as HTMLDivElement
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorWidth, setEditorWidth] = useState('max-w-4xl');

  useEffect(() => {
    if (isSidebarOpen && isChatOpen) {
      setEditorWidth('max-w-2xl');
    } else if (isSidebarOpen || isChatOpen) {
      setEditorWidth('max-w-3xl');
    } else {
      setEditorWidth('max-w-4xl');
    }
  }, [isSidebarOpen, isChatOpen]);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML.trim()) {
      editorRef.current.innerHTML = '<p>Start typing your document here...</p>';
    }
  }, []);

  const handleEditorInput = () => {
  cleanupMarkers();

    if (!editorRef.current) return;
    
    const text = editorRef.current.innerText || '';
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const charsWithSpaces = text.length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
    const lines = text.split(/\n/).length;

    const newStats = {
      words: words.length,
      characters: charsWithSpaces,
      pages: Math.ceil(lines / 25),
      charsNoSpaces,
      charsWithSpaces,
      paragraphs,
      lines,
    };

    onStatsUpdate(newStats);
  };

  const fontSize = Math.round(16 * (zoomLevel / 100));

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      <div className="flex-1 p-8 overflow-y-scroll">
        <div 
          className={`${editorWidth} mx-auto bg-white rounded-lg shadow-lg min-h-[800px] p-8 transition-all duration-300`}
          style={{ 
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center'
          }}
        >
          <div
  ref={editorRef}
  contentEditable="true"
  onInput={handleEditorInput}
  className="w-full h-full min-h-[700px] border-none outline-none resize-none text-gray-800 leading-relaxed font-normal"
  style={{
    lineHeight: 1.6,
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap'
  }}
  suppressContentEditableWarning={true}
/>
        </div>
      </div>
      
      <div className="bg-gray-900 border-t border-gray-800 px-8 py-2 flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-6">
          <span>Word Count: {stats.words}</span>
          <span>Character Count: {stats.characters}</span>
          <span>Zoom: {zoomLevel}%</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Page Size: {pageSetup.pageSize.toUpperCase()}</span>
          <button className="hover:text-white transition-colors">
            ⚙️
          </button>
        </div>
      </div>
    </div>
  );
};

interface Citation {
  style: 'APA' | 'MLA' | 'Chicago' | 'Harvard';
  text: string;
}

// Types for plagiarism check results
interface PlagiarismIssue {
  source: string;
  text: string;
}

interface PlagiarismData {
  score: number;
  issues: PlagiarismIssue[];
}
interface GrammarCheckResult {
  type: 'error' | 'warning' | 'suggestion';
  category: 'Grammar' | 'Spelling' | 'Style' | 'Punctuation';
  text: string;
  suggestion: string;
}
interface PageSetup {
  pageSize: string;
  marginSize: number;
  fontSize: string;
  fontFamily: string;
}
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Format');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [citationsData, setCitationsData] = useState<Citation[]>([]);
  const [plagiarismData, setPlagiarismData] = useState<PlagiarismData | null>(null);
  const [grammarData, setGrammarData] = useState<GrammarCheckResult[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
const [pageSetup, setPageSetup] = useState<PageSetup>({
    pageSize: 'a4',
    marginSize: 1,
    fontSize: '12',
    fontFamily: "'Times New Roman', serif",
  });
// Update your changeFontSize function
// Fixed changeFontSize
const changeFontSize = (size: string) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  
  const range = selection.getRangeAt(0);
  const span = document.createElement('span');
  span.style.fontSize = `${size}px`;

  if (range.collapsed) {
    // Create marker for cursor position
    const marker = document.createElement('span');
    marker.className = 'font-size-marker';
    marker.dataset.fontSize = size;
    marker.innerHTML = '&#8203;'; // Zero-width space
    range.insertNode(marker);
    
    // Move cursor inside marker
    const newRange = document.createRange();
    newRange.setStart(marker, 0);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  } else {
    // Remove existing font size spans in selection
    const existingSpans = range.cloneContents().querySelectorAll('span[style*="font-size"]');
    existingSpans.forEach(existingSpan => {
      const parent = existingSpan.parentNode;
      while (existingSpan.firstChild) {
        parent?.insertBefore(existingSpan.firstChild, existingSpan);
      }
      parent?.removeChild(existingSpan);
    });

    // Apply new size
    const fragment = range.extractContents();
    span.appendChild(fragment);
    range.insertNode(span);
  }
};

// Fixed changeFontFamily
const changeFontFamily = (fontFamily: string) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  
  if (range.collapsed) {
    // Create marker for cursor
    const marker = document.createElement('span');
    marker.className = 'font-family-marker';
    marker.dataset.fontFamily = fontFamily;
    marker.innerHTML = '&#8203;'; // Zero-width space
    range.insertNode(marker);
    
    // Move cursor
    const newRange = document.createRange();
    newRange.setStart(marker, 0);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  } else {
    // Remove existing font family spans
    const existingSpans = range.cloneContents().querySelectorAll('span[style*="font-family"]');
    existingSpans.forEach(existingSpan => {
      const parent = existingSpan.parentNode;
      while (existingSpan.firstChild) {
        parent?.insertBefore(existingSpan.firstChild, existingSpan);
      }
      parent?.removeChild(existingSpan);
    });

    // Apply new font family
    const span = document.createElement('span');
    span.style.fontFamily = fontFamily;
    const fragment = range.extractContents();
    span.appendChild(fragment);
    range.insertNode(span);
  }
};

// Add this cleanup function to handle markers
const cleanupMarkers = () => {
  const editor = editorRef.current;
  if (!editor) return;

  // Remove font size markers after typing starts
  const fontSizeMarkers = editor.querySelectorAll('.font-size-marker');
  fontSizeMarkers.forEach(marker => {
    const parent = marker.parentNode;
    while (marker.firstChild) {
      parent?.insertBefore(marker.firstChild, marker);
    }
    parent?.removeChild(marker);
  });

  // Remove font family markers
  const fontFamilyMarkers = editor.querySelectorAll('.font-family-marker');
  fontFamilyMarkers.forEach(marker => {
    const parent = marker.parentNode;
    while (marker.firstChild) {
      parent?.insertBefore(marker.firstChild, marker);
    }
    parent?.removeChild(marker);
  });
};

// Call cleanupMarkers in handleEditorInput

const handlePageSetupChange = (property: keyof PageSetup, value: string | number) => {
  setPageSetup(prev => ({...prev, [property]: value}));
  
  if (property === 'fontFamily') {
    changeFontFamily(value as string);
  } else if (property === 'fontSize') {
    changeFontSize(value as string);
  }
};

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };




const [stats, setStats] = useState<DocumentStats>({
    words: 0,
    characters: 0,
    pages: 1,
    charsNoSpaces: 0,
    charsWithSpaces: 0,
    paragraphs: 0,
    lines: 0,
  });
   const handleBold = (): void => {
    document.execCommand('bold', false);
  };

  const handleItalic = (): void => {
    document.execCommand('italic', false);
  };

  const handleUnderline = (): void => {
    document.execCommand('underline', false);
  };

  const handleStrikethrough = (): void => {
    document.execCommand('strikethrough', false);
  };

  const handleAlignLeft = (): void => {
    document.execCommand('justifyLeft', false);
  };

  const handleAlignCenter = (): void => {
    document.execCommand('justifyCenter', false);
  };

  const handleAlignRight = (): void => {
    document.execCommand('justifyRight', false);
  };

  const handleAlignJustify = (): void => {
    document.execCommand('justifyFull', false);
  };

  const handleBulletList = (): void => {
    document.execCommand('insertUnorderedList', false);
  };

  const handleNumberList = (): void => {
    document.execCommand('insertOrderedList', false);
  };
  const handleCitationManager = () => {
    // Simulate citation check
    const mockCitations:Citation[] = [
      { style: 'APA', text: 'Smith, J. (2023). Research Methods in Computer Science. Academic Press.' },
      { style: 'MLA', text: 'Johnson, Mary. "Modern Writing Techniques." Journal of Writing, vol. 45, 2023, pp. 123-145.' },
      { style: 'Chicago', text: 'Brown, David. The Art of Documentation. New York: Publishing House, 2023.' }
    ];
    setCitationsData(mockCitations);
    setIsChatOpen(true);
  };

  const handlePlagiarismCheck = () => {
    // Simulate plagiarism check
    const mockPlagiarismData = {
      score: 85,
      issues: [
        { source: 'Wikipedia.org', text: 'This text appears to match content from an online source.' },
        { source: 'Academic Journal', text: 'Similar phrasing found in published research.' }
      ]
    };
    setPlagiarismData(mockPlagiarismData);
    setIsChatOpen(true);
  };

  const handleGrammarCheck = () => {
    // Simulate grammar check
    const mockGrammarData:GrammarCheckResult[] = [
      { type: 'error', category: 'Grammar', text: 'Subject-verb disagreement', suggestion: 'Change "are" to "is"' },
      { type: 'suggestion', category: 'Style', text: 'Consider using active voice', suggestion: 'Replace passive construction with active voice' },
      { type: 'error', category: 'Spelling', text: 'Misspelled word: "recieve"', suggestion: 'Change to "receive"' }
    ];
    setGrammarData(mockGrammarData);
    setIsChatOpen(true);
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 flex flex-col">
          <Toolbar 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onCitationManager={handleCitationManager}
            onPlagiarismCheck={handlePlagiarismCheck}
            onGrammarCheck={handleGrammarCheck}
            onAlignCenter={handleAlignCenter}
            onAlignJustify={handleAlignJustify}
            onAlignLeft={handleAlignLeft}
            onAlignRight={handleAlignRight}
            onBold={handleBold}
            onBulletList={handleBulletList}
            onItalic={handleItalic}
            onNumberList={handleNumberList}
            onPageSetupChange={handlePageSetupChange}
            onUnderline={handleUnderline}
            pageSetup={pageSetup}
            changeFontSize={changeFontSize}
          />
          <Editor 
            zoomLevel={zoomLevel} 
            isSidebarOpen={isSidebarOpen}
            isChatOpen={isChatOpen}
            cleanupMarkers={cleanupMarkerscleanupMarkers}
            pageSetup={pageSetup}
            stats={stats}
            onStatsUpdate={setStats}
          />
        </div>

        <ChatSidebar 
          isOpen={isChatOpen} 
          onToggle={() => setIsChatOpen(!isChatOpen)}
          citationsData={citationsData}
          plagiarismData={plagiarismData}
          grammarData={grammarData}
        />
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Save, Upload, Printer, Search, FileText, Settings, Eye, EyeOff, Menu, X, MessageSquare, Copy, Check, Shield, BookOpen, Zap } from 'lucide-react';


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
// Header Component
const Header = () => (
  <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-white">Document Editor</h1>
        <span className="text-sm text-gray-400">Full-featured word processor</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white transition-colors">
          <Settings size={20} />
        </button>
      </div>
    </div>
  </div>
);

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

interface PageSetup {
  pageSize: string;
  marginSize: number;
  fontSize: string;
  fontFamily: string;
}
interface ToolbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onCitationManager: () => void;
  onPlagiarismCheck: () => void;
  onGrammarCheck: () => void;
  onNewDocument: () => void;
  onOpenDocument: () => void;
  onSaveDocument: () => void;
  onPrintDocument: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onStrikethrough: () => void;
  onAlignLeft: () => void;
  onAlignCenter: () => void;
  onAlignRight: () => void;
  onAlignJustify: () => void;
  onInsertLink: () => void;
  onInsertImage: () => void;
  onInsertTable: (rows: number, cols: number) => void;
  onBulletList: () => void;
  onNumberList: () => void;
  onIndent: () => void;
  onOutdent: () => void;
  onFindReplace: () => void;
  onWordCount: () => void;
  pageSetup: PageSetup;
  onPageSetupChange: (property: keyof PageSetup, value: string | number) => void;
}

// Enhanced Toolbar Component
const Toolbar: React.FC<ToolbarProps> = ({ 
  activeTab, 
  onTabChange, 
  zoomLevel, 
  onZoomIn, 
  onZoomOut, 
  onCitationManager, 
  onPlagiarismCheck, 
  onGrammarCheck,
  onNewDocument,
  onOpenDocument,
  onSaveDocument,
  onPrintDocument,
  onUndo,
  onRedo,
  onBold,
  onItalic,
  onUnderline,
  onStrikethrough,
  onAlignLeft,
  onAlignCenter,
  onAlignRight,
  onAlignJustify,
  onInsertLink,
  onInsertImage,
  onInsertTable,
  onBulletList,
  onNumberList,
  onIndent,
  onOutdent,
  onFindReplace,
  onWordCount,
  pageSetup,
  onPageSetupChange
}) => {
  const tabs = ['Format', 'Insert', 'Tools', 'View'];
  const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  const handleTableInsert = () => {
    onInsertTable(tableRows, tableCols);
    setIsTableDropdownOpen(false);
  };

  const renderTableDropdown = () => (
    <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-600 rounded shadow-lg z-10 p-4 min-w-[200px]">
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
          className="w-full px-3 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors"
        >
          Insert Table
        </button>
      </div>
    </div>
  );

  const renderFormatTools = () => (
    <div className="flex items-center space-x-2">
      <button onClick={onNewDocument} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors" title="New">
        📄
      </button>
      <button onClick={onOpenDocument} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors" title="Open">
        📂
      </button>
      <button onClick={onSaveDocument} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors" title="Save">
        💾
      </button>
      <button onClick={onPrintDocument} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors" title="Print">
        🖨️
      </button>
      
      <div className="w-px h-6 bg-gray-600 mx-2"></div>
      
      <button onClick={onUndo} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors" title="Undo">
        ↶
      </button>
      <button onClick={onRedo} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors" title="Redo">
        ↷
      </button>
      
      <div className="w-px h-6 bg-gray-600 mx-2"></div>
      
      <button onClick={onBold} className="px-3 py-1 bg-purple-600 text-white rounded text-sm font-bold hover:bg-purple-700 transition-colors" title="Bold">
        Bold
      </button>
      <button onClick={onItalic} className="px-3 py-1 bg-gray-700 text-white rounded text-sm italic hover:bg-gray-600 transition-colors" title="Italic">
        Italic
      </button>
      <button onClick={onUnderline} className="px-3 py-1 bg-gray-700 text-white rounded text-sm underline hover:bg-gray-600 transition-colors" title="Underline">
        Underline
      </button>
      <button onClick={onStrikethrough} className="px-3 py-1 bg-gray-700 text-white rounded text-sm line-through hover:bg-gray-600 transition-colors" title="Strikethrough">
        Strike
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
        onChange={(e) => onPageSetupChange('fontSize', e.target.value)}
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
      
      <button onClick={onAlignLeft} className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors" title="Align Left">
        ⬅
      </button>
      <button onClick={onAlignCenter} className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors" title="Center">
        ↔
      </button>
      <button onClick={onAlignRight} className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors" title="Align Right">
        ➡
      </button>
      <button onClick={onAlignJustify} className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors" title="Justify">
        ⬌
      </button>
      
      <div className="w-px h-6 bg-gray-600 mx-2"></div>
      
      <button onClick={onBulletList} className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors" title="Bullet List">
        •
      </button>
      <button onClick={onNumberList} className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-purple-600 transition-colors" title="Number List">
        1.
      </button>
    </div>
  );

  const renderInsertTools = () => (
    <div className="flex items-center space-x-2">
      <button onClick={onInsertImage} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors">
        🖼️ Image
      </button>
      <div className="relative">
        <button 
          onClick={() => setIsTableDropdownOpen(!isTableDropdownOpen)}
          className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors"
        >
          📊 Table
        </button>
        {isTableDropdownOpen && renderTableDropdown()}
      </div>
      <button onClick={onInsertLink} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors">
        🔗 Link
      </button>
      <button onClick={onCitationManager} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors">
        📖 Citation
      </button>
    </div>
  );

  const renderToolsTools = () => (
    <div className="flex items-center space-x-2">
      <button onClick={onGrammarCheck} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors">
        ✓ Grammar Check
      </button>
      <button onClick={onPlagiarismCheck} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors">
        🛡️ Plagiarism Detector
      </button>
      <button onClick={onCitationManager} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors">
        📚 Citation Manager
      </button>
      <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors">
        🤖 AI Chatbot
      </button>
    </div>
  );

  const renderViewTools = () => (
    <div className="flex items-center space-x-2">
      <button onClick={onZoomIn} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors">
        🔍+ Zoom In
      </button>
      <button onClick={onZoomOut} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors">
        🔍- Zoom Out
      </button>
      <span className="px-3 py-1 bg-gray-800 text-white rounded text-sm">
        {zoomLevel}%
      </span>
      <button className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors">
        📺 Full Screen
      </button>
      <button onClick={onWordCount} className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-purple-600 transition-colors">
        📊 Word Count
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
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
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
};
interface DocumentStats {
  words: number;
  characters: number;
  pages: number;
  charsNoSpaces: number;
  charsWithSpaces: number;
  paragraphs: number;
  lines: number;
}
// Enhanced Editor Component
interface EditorProps {
  zoomLevel: number;
  isSidebarOpen: boolean;
  isChatOpen: boolean;
  pageSetup: PageSetup;
  stats: DocumentStats;
  onStatsUpdate: (stats: DocumentStats) => void;
}
const Editor: React.FC<EditorProps> = ({ zoomLevel, isSidebarOpen, isChatOpen, pageSetup, stats, onStatsUpdate }) => {
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
      <div className="flex-1 p-8 overflow-y-auto">
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
            onKeyUp={handleEditorInput}
            onMouseUp={handleEditorInput}
            className="w-full h-full min-h-[700px] border-none outline-none resize-none text-gray-800 leading-relaxed font-normal transition-all duration-200"
            style={{ 
              fontFamily: pageSetup.fontFamily,
              fontSize: `${fontSize}px`,
              lineHeight: 1.6
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
  style: string;
  text: string;
}interface PlagiarismData {
  score: number;
  issues: Array<{
    source: string;
    text: string;
  }>;
}

interface GrammarData {
  type: 'error' | 'suggestion';
  category: string;
  text: string;
  suggestion: string;
}
interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  citationsData: Citation[];
  plagiarismData: PlagiarismData | null;
  grammarData: GrammarData[];
}

// Chat Sidebar Component
const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onToggle, citationsData, plagiarismData, grammarData }) => (
  <div className={`${isOpen ? 'w-80' : 'w-0'} bg-gray-900 border-l border-gray-800 transition-all duration-300 overflow-hidden`}>
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Analysis</h2>
        <button onClick={onToggle} className="text-gray-400 hover:text-white">
          <X size={18} />
        </button>
      </div>
      
      {citationsData.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Citations</h3>
          <div className="space-y-2">
            {citationsData.map((citation, idx) => (
              <div key={idx} className="p-3 bg-gray-800 rounded text-sm">
                <div className="text-purple-400 font-medium">{citation.style}</div>
                <div className="text-gray-300 mt-1">{citation.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {plagiarismData && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Plagiarism Check</h3>
          <div className="p-3 bg-gray-800 rounded">
            <div className="text-lg font-bold text-green-400">{plagiarismData.score}% Original</div>
            <div className="space-y-2 mt-2">
              {plagiarismData.issues.map((issue, idx) => (
                <div key={idx} className="text-sm">
                  <div className="text-red-400">{issue.source}</div>
                  <div className="text-gray-300">{issue.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {grammarData.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Grammar Check</h3>
          <div className="space-y-2">
            {grammarData.map((item, idx) => (
              <div key={idx} className="p-3 bg-gray-800 rounded text-sm">
                <div className={`font-medium ${item.type === 'error' ? 'text-red-400' : 'text-yellow-400'}`}>
                  {item.category}
                </div>
                <div className="text-gray-300 mt-1">{item.text}</div>
                <div className="text-green-400 mt-1 text-xs">{item.suggestion}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// Modal Components
interface WordCountModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: DocumentStats;
}

interface FindReplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  findText: string;
  replaceText: string;
  onFindChange: (text: string) => void;
  onReplaceChange: (text: string) => void;
  onFindNext: () => void;
  onReplaceAll: () => void;
}

interface InsertLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  linkText: string;
  linkUrl: string;
  onLinkTextChange: (text: string) => void;
  onLinkUrlChange: (url: string) => void;
  onInsert: () => void;
}

const WordCountModal: React.FC<WordCountModalProps> = ({ isOpen, onClose, stats }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Document Statistics</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-3 text-gray-300">
          <div className="flex justify-between">
            <span>Pages:</span>
            <span className="text-white">{stats.pages}</span>
          </div>
          <div className="flex justify-between">
            <span>Words:</span>
            <span className="text-white">{stats.words}</span>
          </div>
          <div className="flex justify-between">
            <span>Characters (no spaces):</span>
            <span className="text-white">{stats.charsNoSpaces}</span>
          </div>
          <div className="flex justify-between">
            <span>Characters (with spaces):</span>
            <span className="text-white">{stats.charsWithSpaces}</span>
          </div>
          <div className="flex justify-between">
            <span>Paragraphs:</span>
            <span className="text-white">{stats.paragraphs}</span>
          </div>
          <div className="flex justify-between">
            <span>Lines:</span>
            <span className="text-white">{stats.lines}</span>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


const FindReplaceModal: React.FC<FindReplaceModalProps> = ({ isOpen, onClose, findText, replaceText, onFindChange, onReplaceChange, onFindNext, onReplaceAll }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Find & Replace</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            value={findText}
            onChange={(e) => onFindChange(e.target.value)}
            placeholder="Find"
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded"
          />
          <input
            type="text"
            value={replaceText}
            onChange={(e) => onReplaceChange(e.target.value)}
            placeholder="Replace with"
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded"
          />
          <div className="flex space-x-2">
            <button
              onClick={onFindNext}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
            >
              Find Next
            </button>
            <button
              onClick={onReplaceAll}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Replace All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsertLinkModal: React.FC<InsertLinkModalProps> = ({ isOpen, onClose, linkText, linkUrl, onLinkTextChange, onLinkUrlChange, onInsert }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Insert Link</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Text to display</label>
            <input
              type="text"
              value={linkText}
              onChange={(e) => onLinkTextChange(e.target.value)}
              placeholder="Link text"
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">URL</label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => onLinkUrlChange(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onInsert}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Insert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function DocumentEditor() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('Format');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // File handling
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentDoc, setCurrentDoc] = useState<File | null>(null);

  // Modal states
  const [showWordCount, setShowWordCount] = useState<boolean>(false);
  const [showFindReplace, setShowFindReplace] = useState<boolean>(false);
  const [showInsertLink, setShowInsertLink] = useState<boolean>(false);

  // Find & Replace states
  const [findText, setFindText] = useState<string>('');
  const [replaceText, setReplaceText] = useState<string>('');

  // Link insertion states
  const [linkText, setLinkText] = useState<string>('');
  const [linkUrl, setLinkUrl] = useState<string>('');

  // Data states for summaries
  const [citationsData, setCitationsData] = useState<Citation[]>([]);
  const [plagiarismData, setPlagiarismData] = useState<PlagiarismData | null>(null);
  const [grammarData, setGrammarData] = useState<GrammarData[]>([]);

  // Document stats
  const [stats, setStats] = useState<DocumentStats>({
    words: 0,
    characters: 0,
    pages: 1,
    charsNoSpaces: 0,
    charsWithSpaces: 0,
    paragraphs: 0,
    lines: 0,
  });

    const [pageSetup, setPageSetup] = useState<PageSetup>({
    pageSize: 'a4',
    marginSize: 1,
    fontSize: '12',
    fontFamily: "'Times New Roman', serif",
  });

  // Refs for editor functionality
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Document operations
  const handleNewDocument = (): void => {
    if (window.confirm('Are you sure you want to start a new document? Unsaved changes will be lost.')) {
      if (editorRef.current) {
        editorRef.current.innerHTML = '<p>Start typing your document here...</p>';
      }
      updateWordCount();
    }
  };

  const handleOpenDocument = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    setCurrentDoc(file);
    const reader = new FileReader();
    reader.onload = function (e) {
      const result = e.target?.result;
      if (result instanceof ArrayBuffer) {
        loadDocument(result);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const loadDocument = async (data: ArrayBuffer): Promise<void> => {
    try {
      // Basic text loading - in production, you'd use mammoth.js for DOCX files
      const text = new TextDecoder().decode(data);
      if (editorRef.current) {
        editorRef.current.innerHTML = `<p>${text}</p>`;
      }
      updateWordCount();
    } catch (error) {
      console.error('Error loading document:', error);
      alert('Error loading document: ' + (error as Error).message);
    }
  };

  const handleSaveDocument = (): void => {
    try {
      const content = editorRef.current?.innerHTML || '';
      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.html';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Error saving document: ' + (error as Error).message);
    }
  };

  const handlePrintDocument = (): void => {
    window.print();
  };

  // Formatting operations
  const handleUndo = (): void => {
    document.execCommand('undo', false);
  };

  const handleRedo = (): void => {
    document.execCommand('redo', false);
  };

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

  const handleIndent = (): void => {
    document.execCommand('indent', false);
  };

  const handleOutdent = (): void => {
    document.execCommand('outdent', false);
  };

  // Insert operations
  const handleInsertImage = (): void => {
    const url = prompt('Enter image URL:');
    if (url) {
      document.execCommand('insertImage', false, url);
    }
  };

  const handleInsertTable = (rows: number, cols: number): void => {
    let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%;">';
    for (let i = 0; i < rows; i++) {
      tableHTML += '<tr>';
      for (let j = 0; j < cols; j++) {
        tableHTML += '<td style="border: 1px solid #000; padding: 8px;">&nbsp;</td>';
      }
      tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    document.execCommand('insertHTML', false, tableHTML);
  };

  const handleInsertLink = (): void => {
    const selection = window.getSelection();
    const selectedText = selection?.toString() || '';
    setLinkText(selectedText);
    setShowInsertLink(true);
  };

  const insertLink = (): void => {
    if (!linkUrl) {
      alert('Please enter a URL');
      return;
    }
    
    if (linkText) {
      const linkHTML = `<a href="${linkUrl}" target="_blank">${linkText}</a>`;
      document.execCommand('insertHTML', false, linkHTML);
    } else {
      document.execCommand('createLink', false, linkUrl);
    }
    
    setShowInsertLink(false);
    setLinkText('');
    setLinkUrl('');
  };

  // Zoom operations
  const handleZoomIn = (): void => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = (): void => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  // Analysis operations
  const handleCitationManager = (): void => {
    const mockCitations: Citation[] = [
      { style: 'APA', text: 'Smith, J. (2023). Research Methods in Computer Science. Academic Press.' },
      { style: 'MLA', text: 'Johnson, Mary. "Modern Writing Techniques." Journal of Writing, vol. 45, 2023, pp. 123-145.' },
      { style: 'Chicago', text: 'Brown, David. The Art of Documentation. New York: Publishing House, 2023.' }
    ];
    setCitationsData(mockCitations);
    setIsChatOpen(true);
  };

  const handlePlagiarismCheck = (): void => {
    const mockPlagiarismData: PlagiarismData = {
      score: 85,
      issues: [
        { source: 'Wikipedia.org', text: 'This text appears to match content from an online source.' },
        { source: 'Academic Journal', text: 'Similar phrasing found in published research.' }
      ]
    };
    setPlagiarismData(mockPlagiarismData);
    setIsChatOpen(true);
  };

  const handleGrammarCheck = (): void => {
    const mockGrammarData: GrammarData[] = [
      { type: 'error', category: 'Grammar', text: 'Subject-verb disagreement', suggestion: 'Change "are" to "is"' },
      { type: 'suggestion', category: 'Style', text: 'Consider using active voice', suggestion: 'Replace passive construction with active voice' },
      { type: 'error', category: 'Spelling', text: 'Misspelled word: "recieve"', suggestion: 'Change to "receive"' }
    ];
    setGrammarData(mockGrammarData);
    setIsChatOpen(true);
  };
 const handleFindReplace = (): void => {
    setShowFindReplace(true);
  };
  const handleFindNext = (): void => {
  if (!findText) return;
  
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
  }
  
  // Use type assertion to tell TypeScript that 'find' exists
  (window as any).find(findText);
};

  const handleReplaceAll = (): void => {
    if (!findText || !replaceText || !editorRef.current) return;
    
    const content = editorRef.current.innerHTML;
    const newContent = content.replace(new RegExp(findText, 'g'), replaceText);
    editorRef.current.innerHTML = newContent;
    updateWordCount();
  };

  // Word count and stats
  const handleWordCount = (): void => {
    setShowWordCount(true);
  };

  const updateWordCount = (): void => {
    if (!editorRef.current) return;
    
    const text = editorRef.current.innerText || '';
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const charsWithSpaces = text.length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
    const lines = text.split(/\n/).length;

    const newStats: DocumentStats = {
      words: words.length,
      characters: charsWithSpaces,
      pages: Math.ceil(lines / 25),
      charsNoSpaces,
      charsWithSpaces,
      paragraphs,
      lines,
    };

    setStats(newStats);
  };

  // Page setup operations
  const handlePageSetupChange = (property: keyof PageSetup, value: string | number): void => {
    setPageSetup(prev => ({
      ...prev,
      [property]: value
    }));

    if (property === 'fontFamily' || property === 'fontSize') {
      // Apply font changes to editor
      if (editorRef.current) {
        if (property === 'fontFamily') {
          editorRef.current.style.fontFamily = value as string;
        } else if (property === 'fontSize') {
          editorRef.current.style.fontSize = value + 'px';
        }
      }
    }
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
            onNewDocument={handleNewDocument}
            onOpenDocument={handleOpenDocument}
            onSaveDocument={handleSaveDocument}
            onPrintDocument={handlePrintDocument}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onBold={handleBold}
            onItalic={handleItalic}
            onUnderline={handleUnderline}
            onStrikethrough={handleStrikethrough}
            onAlignLeft={handleAlignLeft}
            onAlignCenter={handleAlignCenter}
            onAlignRight={handleAlignRight}
            onAlignJustify={handleAlignJustify}
            onInsertLink={handleInsertLink}
            onInsertImage={handleInsertImage}
            onInsertTable={handleInsertTable}
            onBulletList={handleBulletList}
            onNumberList={handleNumberList}
            onIndent={handleIndent}
            onOutdent={handleOutdent}
            onFindReplace={handleFindReplace}
            onWordCount={handleWordCount}
            pageSetup={pageSetup}
            onPageSetupChange={handlePageSetupChange}
          />
          <Editor 
            zoomLevel={zoomLevel} 
            isSidebarOpen={isSidebarOpen}
            isChatOpen={isChatOpen}
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

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".docx,.doc,.txt"
        style={{ display: 'none' }}
      />

      {/* Modals */}
      <WordCountModal
        isOpen={showWordCount}
        onClose={() => setShowWordCount(false)}
        stats={stats}
      />

      <FindReplaceModal
        isOpen={showFindReplace}
        onClose={() => setShowFindReplace(false)}
        findText={findText}
        replaceText={replaceText}
        onFindChange={setFindText}
        onReplaceChange={setReplaceText}
        onFindNext={handleFindNext}
        onReplaceAll={handleReplaceAll}
      />

      <InsertLinkModal
        isOpen={showInsertLink}
        onClose={() => setShowInsertLink(false)}
        linkText={linkText}
        linkUrl={linkUrl}
        onLinkTextChange={setLinkText}
        onLinkUrlChange={setLinkUrl}
        onInsert={insertLink}
      />
    </div>
  );
}
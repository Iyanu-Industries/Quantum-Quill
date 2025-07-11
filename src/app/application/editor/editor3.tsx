"use client";
import React, { useState, useRef, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  ChevronDown,
  Undo,
  Redo,
  User,
  FileText,
  Eye,
} from "lucide-react";

interface DocumentState {
  title: string;
  content: string;
}

const QuantumQuillEditor: React.FC = () => {
  const [docState, setDocState] = useState<DocumentState>({
    title: "Untitled Document",
    content: `<h1>The Impact of Artificial Intelligence on Modern Society</h1>

<p>Artificial intelligence (AI) has emerged as a revolutionary technology that is reshaping various aspects of modern society. From healthcare to transportation, education to entertainment, AI applications are becoming increasingly prevalent and influential. This paper examines the multifaceted impact of AI on contemporary social structures, economic systems, and ethical frameworks.</p>

<h2>Background and Historical Context</h2>

<p>The concept of artificial intelligence dates back to the mid-20th century, when computer scientists first began exploring the possibility of creating machines capable of simulating human intelligence. The term "artificial intelligence" was coined by John McCarthy in 1956 at the Dartmouth Conference, which is widely considered the birthplace of AI as a field of study.</p>

<p>Early AI research focused primarily on problem-solving and symbolic methods. However, the field has evolved significantly over the decades, particularly with the advent of machine learning and deep learning approaches that enable systems to learn from data rather than following explicitly programmed instructions.</p>

<h2>Economic Implications</h2>

<p>The integration of AI technologies into various industries has profound economic implications. On one hand, AI has the potential to significantly boost productivity and economic growth by automating routine tasks, optimizing processes, and enabling new products and services. According to a report by PwC, AI could contribute up to $15.7 trillion to the global economy by 2030.</p>

<p>On the other hand, the automation capabilities of AI raise concerns about job displacement and labor market disruption. While some argue that AI will create more jobs than it eliminates by generating new industries and roles, others warn of potential widespread unemployment, particularly in sectors heavily reliant on routine cognitive or</p>`,
  });

  const [fontSize, setFontSize] = useState("12");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [zoom, setZoom] = useState(100);
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = useCallback((command: string, value?: string) => {
    window.document.execCommand(command, false, value);
    if (editorRef.current) {
      setDocState((prev) => ({
        ...prev,
        content: editorRef.current!.innerHTML,
      }));
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocState((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      setDocState((prev) => ({
        ...prev,
        content: editorRef.current!.innerHTML,
      }));
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = e.target.value;
    setFontSize(newSize);
    execCommand("fontSize", "3");
    // Apply custom font size
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (!range.collapsed) {
          const span = document.createElement("span");
          span.style.fontSize = newSize + "px";
          try {
            range.surroundContents(span);
          } catch (e) {
            span.appendChild(range.extractContents());
            range.insertNode(span);
          }
        }
      }
    }
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFont = e.target.value;
    setFontFamily(newFont);
    execCommand("fontName", newFont);
  };

  const insertHeading = (level: number) => {
    execCommand("formatBlock", `h${level}`);
  };

  const ToolbarButton: React.FC<{
    onClick: () => void;
    icon: React.ReactNode;
    title: string;
    active?: boolean;
  }> = ({ onClick, icon, title, active }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        active ? "bg-blue-100 text-blue-600" : "text-gray-600"
      }`}
    >
      {icon}
    </button>
  );

  const Dropdown: React.FC<{
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    className?: string;
  }> = ({ value, onChange, options, className = "" }) => (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={onChange}
        className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-blue-600">
              QuantumQuill
            </h1>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                <FileText className="w-4 h-4" />
                <span>File</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                <Eye className="w-4 h-4" />
                <span>View</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={docState.title}
              onChange={handleTitleChange}
              className="px-3 py-1 text-sm border-none bg-transparent text-gray-700 focus:outline-none focus:bg-white focus:border focus:border-blue-500 rounded"
            />
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            {/* Text Formatting */}
            <div className="flex items-center space-x-1">
              <ToolbarButton
                onClick={() => execCommand("bold")}
                icon={<Bold className="w-4 h-4" />}
                title="Bold"
              />
              <ToolbarButton
                onClick={() => execCommand("italic")}
                icon={<Italic className="w-4 h-4" />}
                title="Italic"
              />
              <ToolbarButton
                onClick={() => execCommand("underline")}
                icon={<Underline className="w-4 h-4" />}
                title="Underline"
              />
            </div>

            <div className="w-px h-6 bg-gray-300"></div>

            {/* Alignment */}
            <div className="flex items-center space-x-1">
              <ToolbarButton
                onClick={() => execCommand("justifyLeft")}
                icon={<AlignLeft className="w-4 h-4" />}
                title="Align Left"
              />
              <ToolbarButton
                onClick={() => execCommand("justifyCenter")}
                icon={<AlignCenter className="w-4 h-4" />}
                title="Align Center"
              />
              <ToolbarButton
                onClick={() => execCommand("justifyRight")}
                icon={<AlignRight className="w-4 h-4" />}
                title="Align Right"
              />
            </div>

            <div className="w-px h-6 bg-gray-300"></div>

            {/* Lists */}
            <div className="flex items-center space-x-1">
              <ToolbarButton
                onClick={() => execCommand("insertUnorderedList")}
                icon={<List className="w-4 h-4" />}
                title="Bullet List"
              />
              <ToolbarButton
                onClick={() => execCommand("insertOrderedList")}
                icon={<ListOrdered className="w-4 h-4" />}
                title="Numbered List"
              />
            </div>

            <div className="w-px h-6 bg-gray-300"></div>

            {/* Font Controls */}
            <Dropdown
              value={fontFamily}
              onChange={handleFontFamilyChange}
              options={[
                { value: "Arial", label: "Arial" },
                { value: "Times New Roman", label: "Times New Roman" },
                { value: "Helvetica", label: "Helvetica" },
                { value: "Georgia", label: "Georgia" },
                { value: "Verdana", label: "Verdana" },
              ]}
            />

            <Dropdown
              value={fontSize}
              onChange={handleFontSizeChange}
              options={[
                { value: "8", label: "8" },
                { value: "9", label: "9" },
                { value: "10", label: "10" },
                { value: "11", label: "11" },
                { value: "12", label: "12" },
                { value: "14", label: "14" },
                { value: "16", label: "16" },
                { value: "18", label: "18" },
                { value: "24", label: "24" },
                { value: "36", label: "36" },
              ]}
            />

            <div className="w-px h-6 bg-gray-300"></div>

            {/* Feature Buttons (Disabled for now) */}
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded border border-blue-200 cursor-not-allowed opacity-50">
                Grammar
              </button>
              <button className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded border border-purple-200 cursor-not-allowed opacity-50">
                Journals
              </button>
              <button className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded border border-green-200 cursor-not-allowed opacity-50">
                Plagiarism
              </button>
              <button className="px-3 py-1 text-sm bg-orange-100 text-orange-600 rounded border border-orange-200 cursor-not-allowed opacity-50">
                Citation
              </button>
              <button className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded border border-red-200 cursor-not-allowed opacity-50">
                Chatbot
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300"></div>

            {/* Undo/Redo */}
            <div className="flex items-center space-x-1">
              <ToolbarButton
                onClick={() => execCommand("undo")}
                icon={<Undo className="w-4 h-4" />}
                title="Undo"
              />
              <ToolbarButton
                onClick={() => execCommand("redo")}
                icon={<Redo className="w-4 h-4" />}
                title="Redo"
              />
            </div>
          </div>

          <div className="text-sm text-gray-600">{zoom}%</div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="max-w-4xl mx-auto bg-white my-8 shadow-lg">
        <div className="p-8">
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleContentChange}
            dangerouslySetInnerHTML={{ __html: docState.content }}
            className="min-h-[800px] outline-none prose prose-lg max-w-none"
            style={{
              fontFamily: fontFamily,
              fontSize: `${fontSize}px`,
              lineHeight: "1.6",
            }}
          />
        </div>
      </div>

      {/* Keyboard Shortcuts Panel */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-xs">
        <h4 className="font-semibold text-sm mb-2">Keyboard Shortcuts</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <div>
            <kbd className="bg-gray-100 px-1 rounded">Ctrl+B</kbd> Bold
          </div>
          <div>
            <kbd className="bg-gray-100 px-1 rounded">Ctrl+I</kbd> Italic
          </div>
          <div>
            <kbd className="bg-gray-100 px-1 rounded">Ctrl+U</kbd> Underline
          </div>
          <div>
            <kbd className="bg-gray-100 px-1 rounded">Ctrl+Z</kbd> Undo
          </div>
          <div>
            <kbd className="bg-gray-100 px-1 rounded">Ctrl+Y</kbd> Redo
          </div>
          <div>
            <kbd className="bg-gray-100 px-1 rounded">Ctrl+1</kbd> Heading 1
          </div>
          <div>
            <kbd className="bg-gray-100 px-1 rounded">Ctrl+2</kbd> Heading 2
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumQuillEditor;

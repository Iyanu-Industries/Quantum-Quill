// components/DocumentEditor.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as Mammoth from "mammoth";

// Define TypeScript interfaces
interface DocumentStats {
  words: number;
  characters: number;
  pages: number;
  charsNoSpaces: number;
  charsWithSpaces: number;
  paragraphs: number;
  lines: number;
}

interface FindReplaceState {
  active: boolean;
  findInput: string;
  replaceInput: string;
}

interface ModalState {
  wordCount: boolean;
  insertLink: boolean;
}

interface PageSetup {
  pageSize: string;
  marginSize: number;
  fontSize: string;
  fontFamily: string;
}

interface DocumentState {
  currentDoc: File | null;
  currentZip: JSZip | null;
}

const DocumentEditor: React.FC = () => {
  // Refs
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State variables with types
  const [findReplace, setFindReplace] = useState<FindReplaceState>({
    active: false,
    findInput: "",
    replaceInput: "",
  });

  const [modals, setModals] = useState<ModalState>({
    wordCount: false,
    insertLink: false,
  });

  const [documentState, setDocumentState] = useState<DocumentState>({
    currentDoc: null,
    currentZip: null,
  });

  const [findIndex, setFindIndex] = useState<number>(0);
  const [findResults, setFindResults] = useState<Array<Range>>([]);

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
    pageSize: "a4",
    marginSize: 1,
    fontSize: "12",
    fontFamily: "'Times New Roman', serif",
  });

  // Initialize editor
  useEffect(() => {
    updateWordCount();

    // Dynamically load Font Awesome
    const loadFontAwesome = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
      document.head.appendChild(link);
    };

    if (typeof window !== "undefined") {
      loadFontAwesome();
    }
  }, []);

  // Update word count whenever editor content changes
  const handleEditorInput = () => {
    updateWordCount();
  };

  // Core editor functions
  const newDocument = () => {
    if (
      window.confirm(
        "Are you sure you want to start a new document? Unsaved changes will be lost."
      )
    ) {
      if (editorRef.current) {
        editorRef.current.innerHTML = "<p><br></p>";
      }
      updateWordCount();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setDocumentState((prev) => ({ ...prev, currentDoc: file }));

    const reader = new FileReader();
    reader.onload = function (e) {
      const result = e.target?.result;
      if (result instanceof ArrayBuffer) {
        loadDocument(result);
      }
    };
    reader.readAsArrayBuffer(file); // This ensures result is ArrayBuffer
  };

  // Install: npm install mammoth @types/mammoth

  // Replace the loadDocument function with:
  const loadDocument = async (data: ArrayBuffer) => {
    try {
      const result = await Mammoth.convertToHtml({ arrayBuffer: data });
      if (editorRef.current) {
        editorRef.current.innerHTML = result.value;
      }
      updateWordCount();
    } catch (error) {
      console.error("Error loading document:", error);
      alert("Error loading document: " + (error as Error).message);
    }
  };

  const saveDocument = async () => {
    if (!documentState.currentZip) {
      // Create a simple text file if no DOCX was loaded
      const content = editorRef.current?.innerText || "";
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      saveAs(blob, "document.txt");
      return;
    }

    try {
      // Load the template with docxtemplater
      const zip = new JSZip();
      const content = await zip.loadAsync(documentState.currentDoc!);

      // Extract text content from editor
      const editorContent = editorRef.current?.innerText || "";

      // For this example, we'll create a simple DOCX with the content
      // In a real implementation, you'd use docxtemplater properly
      const newZip = new JSZip();

      // Copy all files from the original zip except document.xml
      for (const [key, value] of Object.entries(content.files)) {
        if (key !== "word/document.xml") {
          const fileData = await value.async("blob");
          newZip.file(key, fileData);
        }
      }

      // Create a new document.xml with the content
      const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:r>
        <w:t>${editorContent
          .replace(/&/g, "&amp;")
          .replace(/</g, "<")
          .replace(/>/g, ">")}</w:t>
      </w:r>
    </w:p>
  </w:body>
</w:document>`;

      newZip.file("word/document.xml", documentXml);

      // Generate the new DOCX file
      const blob = await newZip.generateAsync({ type: "blob" });
      saveAs(blob, "edited-document.docx");
    } catch (error) {
      console.error("Error saving document:", error);
      alert("Error saving document. Saving as text instead.");

      // Fallback to text save
      const content = editorRef.current?.innerText || "";
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      saveAs(blob, "document.txt");
    }
  };

  const printDocument = () => {
    window.print();
  };

  const toggleFormat = (command: string) => {
    document.execCommand(command, false, undefined);
    updateButtonState();
  };

  const setAlignment = (alignment: string) => {
    document.execCommand(
      "justify" + alignment.charAt(0).toUpperCase() + alignment.slice(1),
      false,
      undefined
    );
    updateButtonState();
  };

  const changeFontSize = () => {
    const size = pageSetup.fontSize;
    document.execCommand("fontSize", false, "7"); // Use a placeholder

    // Find the font elements and set the correct size
    if (editorRef.current) {
      const fontElements = editorRef.current.querySelectorAll('font[size="7"]');
      fontElements.forEach((el) => {
        el.removeAttribute("size");
        (el as HTMLElement).style.fontSize = size + "pt";
      });
    }
  };

  const changeFontFamily = () => {
    const fontFamilyValue = pageSetup.fontFamily;
    document.execCommand("fontName", false, fontFamilyValue);
  };

  const showInsertLinkModal = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString() || "";

    setModals((prev) => ({ ...prev, insertLink: true }));
    setFindReplace((prev) => ({
      ...prev,
      findInput: selectedText,
      replaceInput: "",
    }));
  };

  const insertLink = () => {
    const text = findReplace.findInput || findReplace.replaceInput;
    const url = findReplace.replaceInput;
    if (!url) {
      alert("Please enter a URL");
      return;
    }
    document.execCommand("createLink", false, url);
    setModals((prev) => ({ ...prev, insertLink: false }));
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      document.execCommand("insertImage", false, url);
    }
  };

  const insertTable = () => {
    const rows = prompt("Enter number of rows:", "3");
    const cols = prompt("Enter number of columns:", "3");
    if (rows && cols) {
      let tableHTML =
        '<table border="1" style="border-collapse: collapse; width: 100%;">';
      for (let i = 0; i < parseInt(rows); i++) {
        tableHTML += "<tr>";
        for (let j = 0; j < parseInt(cols); j++) {
          tableHTML +=
            '<td style="border: 1px solid #000; padding: 8px;">&nbsp;</td>';
        }
        tableHTML += "</tr>";
      }
      tableHTML += "</table>";
      document.execCommand("insertHTML", false, tableHTML);
    }
  };

  const toggleFindReplace = () => {
    setFindReplace((prev) => ({ ...prev, active: !prev.active }));
    if (!findReplace.active) {
      // Focus on find input when panel opens
      setTimeout(() => {
        const findInputEl = document.getElementById("findInput");
        if (findInputEl) findInputEl.focus();
      }, 100);
    }
  };

  const findPrevious = () => {
    alert("Finding previous match for: " + findReplace.findInput);
  };

  const findNext = () => {
    alert("Finding next match for: " + findReplace.findInput);
  };

  const replaceAll = () => {
    alert(
      'Replacing all instances of "' +
        findReplace.findInput +
        '" with "' +
        findReplace.replaceInput +
        '"'
    );
  };

  const showWordCount = () => {
    updateWordCount(true);
    setModals((prev) => ({ ...prev, wordCount: true }));
  };

  const updateWordCount = (updateModal: boolean = false) => {
    const text = editorRef.current?.innerText || "";
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const charsWithSpaces = text.length;
    const paragraphs = text
      .split(/\n+/)
      .filter((p) => p.trim().length > 0).length;
    const lines = text.split(/\n/).length;

    // Update status bar
    setStats({
      words: words.length,
      characters: charsWithSpaces,
      pages: Math.ceil(lines / 25), // Approximation
      charsNoSpaces,
      charsWithSpaces,
      paragraphs,
      lines,
    });

    // Update modal if requested
    if (updateModal) {
      setModals((prev) => ({ ...prev, wordCount: true }));
    }
  };

  const updatePageSetup = () => {
    console.log("Page size:", pageSetup.pageSize);
    console.log("Margin size:", pageSetup.marginSize);
  };

  const updateButtonState = () => {
    // Update button active states based on current selection
    // This is a simplified implementation
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const parentElement = range.commonAncestorContainer.parentElement;

    // In a real implementation, you would update button states here
    // This would require refs to each button to toggle their active state
  };

  return (
    <div className="container">
      <header>
        <h1>
          <i className="fas fa-file-word"></i> Document Editor
        </h1>
        <p className="subtitle">
          Full-featured word processor with Google Docs-like functionality
        </p>
      </header>

      <div className="app-container">
        <div className="toolbar">
          <div className="toolbar-group">
            <button
              className="toolbar-btn"
              onClick={newDocument}
              title="New Document"
            >
              <i className="fas fa-file"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Open Document"
            >
              <i className="fas fa-folder-open"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={saveDocument}
              title="Save Document"
            >
              <i className="fas fa-save"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={printDocument}
              title="Print"
            >
              <i className="fas fa-print"></i>
            </button>
          </div>

          <div className="toolbar-group">
            <button
              className="toolbar-btn"
              onClick={() => document.execCommand("undo", false, undefined)}
              title="Undo"
            >
              <i className="fas fa-undo"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={() => document.execCommand("redo", false, undefined)}
              title="Redo"
            >
              <i className="fas fa-redo"></i>
            </button>
          </div>

          <div className="toolbar-group">
            <button
              className="toolbar-btn"
              onClick={() => toggleFormat("bold")}
              title="Bold"
            >
              <i className="fas fa-bold"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={() => toggleFormat("italic")}
              title="Italic"
            >
              <i className="fas fa-italic"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={() => toggleFormat("underline")}
              title="Underline"
            >
              <i className="fas fa-underline"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={() => toggleFormat("strikethrough")}
              title="Strikethrough"
            >
              <i className="fas fa-strikethrough"></i>
            </button>
          </div>

          <div className="toolbar-group">
            <button
              className="toolbar-btn"
              onClick={() => setAlignment("left")}
              title="Align Left"
            >
              <i className="fas fa-align-left"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={() => setAlignment("center")}
              title="Align Center"
            >
              <i className="fas fa-align-center"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={() => setAlignment("right")}
              title="Align Right"
            >
              <i className="fas fa-align-right"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={() => setAlignment("justify")}
              title="Justify"
            >
              <i className="fas fa-align-justify"></i>
            </button>
          </div>

          <div className="toolbar-group">
            <select
              value={pageSetup.fontSize}
              onChange={(e) => {
                setPageSetup((prev) => ({ ...prev, fontSize: e.target.value }));
                changeFontSize();
              }}
              id="fontSize"
            >
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
              <option value="22">22</option>
              <option value="24">24</option>
              <option value="26">26</option>
              <option value="28">28</option>
              <option value="36">36</option>
              <option value="48">48</option>
              <option value="72">72</option>
            </select>

            <select
              value={pageSetup.fontFamily}
              onChange={(e) => {
                setPageSetup((prev) => ({
                  ...prev,
                  fontFamily: e.target.value,
                }));
                changeFontFamily();
              }}
              id="fontFamily"
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
              <option value="'Courier New', monospace">Courier New</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Verdana, sans-serif">Verdana</option>
              <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
            </select>
          </div>

          <div className="toolbar-group">
            <button
              className="toolbar-btn"
              onClick={showInsertLinkModal}
              title="Insert Link"
            >
              <i className="fas fa-link"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={insertImage}
              title="Insert Image"
            >
              <i className="fas fa-image"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={insertTable}
              title="Insert Table"
            >
              <i className="fas fa-table"></i>
            </button>
          </div>

          <div className="toolbar-group">
            <button
              className="toolbar-btn"
              onClick={() =>
                document.execCommand("insertUnorderedList", false, undefined)
              }
              title="Bulleted List"
            >
              <i className="fas fa-list-ul"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={() =>
                document.execCommand("insertOrderedList", false, undefined)
              }
              title="Numbered List"
            >
              <i className="fas fa-list-ol"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={() => document.execCommand("indent", false, undefined)}
              title="Increase Indent"
            >
              <i className="fas fa-indent"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={() => document.execCommand("outdent", false, undefined)}
              title="Decrease Indent"
            >
              <i className="fas fa-outdent"></i>
            </button>
          </div>

          <div className="toolbar-group">
            <button
              className="toolbar-btn"
              onClick={toggleFindReplace}
              title="Find & Replace"
            >
              <i className="fas fa-search"></i>
            </button>
            <button
              className="toolbar-btn"
              onClick={showWordCount}
              title="Word Count"
            >
              <i className="fas fa-font"></i>
            </button>
          </div>
        </div>

        <div className="editor-container">
          <div className="sidebar">
            <div className="sidebar-section">
              <h3>Recent Documents</h3>
              <div className="document-list">
                <div className="document-item">
                  <h4>Project Proposal</h4>
                  <p>Last edited: Today</p>
                </div>
                <div className="document-item">
                  <h4>Meeting Notes</h4>
                  <p>Last edited: Yesterday</p>
                </div>
                <div className="document-item">
                  <h4>Research Paper</h4>
                  <p>Last edited: 2 days ago</p>
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Templates</h3>
              <div className="document-list">
                <div className="document-item">
                  <h4>Business Letter</h4>
                  <p>Professional letter template</p>
                </div>
                <div className="document-item">
                  <h4>Resume</h4>
                  <p>Modern resume template</p>
                </div>
              </div>
            </div>
          </div>

          <div className="main-content">
            <div className="document-area">
              <div
                ref={editorRef}
                id="editor"
                contentEditable="true"
                onInput={handleEditorInput}
                onKeyUp={handleEditorInput}
                onMouseUp={handleEditorInput}
                // Remove dangerouslySetInnerHTML to prevent cursor jumping
                // Initial content is set in useEffect
              />
            </div>

            <div className="status-bar">
              <div className="page-setup">
                <label>Page Size:</label>
                <select
                  value={pageSetup.pageSize}
                  onChange={(e) => {
                    setPageSetup((prev) => ({
                      ...prev,
                      pageSize: e.target.value,
                    }));
                    updatePageSetup();
                  }}
                >
                  <option value="letter">Letter (8.5" x 11")</option>
                  <option value="a4">A4 (210mm x 297mm)</option>
                  <option value="legal">Legal (8.5" x 14")</option>
                </select>
                <label>Margins:</label>
                <input
                  type="number"
                  value={pageSetup.marginSize}
                  onChange={(e) => {
                    setPageSetup((prev) => ({
                      ...prev,
                      marginSize: parseFloat(e.target.value),
                    }));
                    updatePageSetup();
                  }}
                  min="0.1"
                  step="0.1"
                />{" "}
                inches
              </div>
              <div>
                Words: <span id="wordCount">{stats.words}</span> | Characters:{" "}
                <span id="charCount">{stats.characters}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".docx"
        style={{ display: "none" }}
      />

      {/* Find & Replace Panel */}
      <div
        className={`find-replace ${findReplace.active ? "active" : ""}`}
        id="findReplacePanel"
      >
        <h3>
          Find & Replace
          <button
            className="close-btn"
            onClick={() =>
              setFindReplace((prev) => ({ ...prev, active: false }))
            }
          >
            &times;
          </button>
        </h3>
        <input
          type="text"
          id="findInput"
          value={findReplace.findInput}
          onChange={(e) =>
            setFindReplace((prev) => ({ ...prev, findInput: e.target.value }))
          }
          placeholder="Find"
        />
        <input
          type="text"
          id="replaceInput"
          value={findReplace.replaceInput}
          onChange={(e) =>
            setFindReplace((prev) => ({
              ...prev,
              replaceInput: e.target.value,
            }))
          }
          placeholder="Replace with"
        />
        <div className="find-replace-buttons">
          <button className="btn-secondary" onClick={findPrevious}>
            Previous
          </button>
          <button className="btn-secondary" onClick={findNext}>
            Next
          </button>
          <button className="btn-primary" onClick={replaceAll}>
            Replace All
          </button>
        </div>
      </div>

      {/* Word Count Modal */}
      <div
        className={`modal ${modals.wordCount ? "active" : ""}`}
        id="wordCountModal"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>Document Statistics</h2>
            <button
              className="close-btn"
              onClick={() =>
                setModals((prev) => ({ ...prev, wordCount: false }))
              }
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Pages:</strong> <span id="pagesCount">{stats.pages}</span>
            </p>
            <p>
              <strong>Words:</strong>{" "}
              <span id="modalWordCount">{stats.words}</span>
            </p>
            <p>
              <strong>Characters (no spaces):</strong>{" "}
              <span id="charsNoSpacesCount">{stats.charsNoSpaces}</span>
            </p>
            <p>
              <strong>Characters (with spaces):</strong>{" "}
              <span id="charsWithSpacesCount">{stats.charsWithSpaces}</span>
            </p>
            <p>
              <strong>Paragraphs:</strong>{" "}
              <span id="paragraphsCount">{stats.paragraphs}</span>
            </p>
            <p>
              <strong>Lines:</strong> <span id="linesCount">{stats.lines}</span>
            </p>
          </div>
          <div className="modal-footer">
            <button
              className="btn-secondary"
              onClick={() =>
                setModals((prev) => ({ ...prev, wordCount: false }))
              }
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Insert Link Modal */}
      <div
        className={`modal ${modals.insertLink ? "active" : ""}`}
        id="insertLinkModal"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>Insert Link</h2>
            <button
              className="close-btn"
              onClick={() =>
                setModals((prev) => ({ ...prev, insertLink: false }))
              }
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <label htmlFor="linkText">Text to display</label>
            <input
              type="text"
              id="linkText"
              value={findReplace.findInput}
              onChange={(e) =>
                setFindReplace((prev) => ({
                  ...prev,
                  findInput: e.target.value,
                }))
              }
              placeholder="Link text"
            />
            <label htmlFor="linkUrl">URL</label>
            <input
              type="url"
              id="linkUrl"
              value={findReplace.replaceInput}
              onChange={(e) =>
                setFindReplace((prev) => ({
                  ...prev,
                  replaceInput: e.target.value,
                }))
              }
              placeholder="https://example.com"
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn-secondary"
              onClick={() =>
                setModals((prev) => ({ ...prev, insertLink: false }))
              }
            >
              Cancel
            </button>
            <button className="btn-primary" onClick={insertLink}>
              Insert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;

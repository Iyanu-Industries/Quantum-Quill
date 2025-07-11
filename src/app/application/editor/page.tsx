// src/app/application/editor/page.tsx
"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "quill/dist/quill.snow.css";
import {
  Chatbot,
  Header,
  JournalsModal,
  PlagiarismModal,
  Toolbar,
} from "@/components/application/editor";
import Quill from "quill";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const EditorPage: React.FC = () => {
  const [documentTitle, setDocumentTitle] = useState("Untitled Document");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isJournalsModalOpen, setIsJournalsModalOpen] = useState(false);
  const [isPlagiarismModalOpen, setIsPlagiarismModalOpen] = useState(false);
  const [quill, setQuill] = useState<any>(null);

  const wrapperRef = useCallback((wrapper: HTMLDivElement | null) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: {
          container: "#toolbar",
        },
      },
    });

    // Enable the editor and clear the loading text
    q.enable();
    q.setText("");
    setQuill(q);
  }, []);

  // Handle zoom
  const handleZoom = (direction: "in" | "out") => {
    setZoomLevel((prev) => {
      const newZoom = direction === "in" ? prev + 10 : prev - 10;
      return Math.max(50, Math.min(200, newZoom));
    });
  };

  // Handle save
  const handleSave = async () => {
    if (quill) {
      const content = quill.root.innerHTML;
      try {
        const response = await fetch("/api/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content,
            title: documentTitle,
            userId: "user123",
          }),
        });
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error("Save failed:", error);
      }
    }
  };

  // Handle export as PDF
  const handleExportPDF = async () => {
    if (quill && typeof window !== "undefined") {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      doc.text(quill.getText(), 10, 10);
      doc.save(`${documentTitle}.pdf`);
    }
  };

  // Handle export as DOCX
  const handleExportDOCX = async () => {
    if (quill && typeof window !== "undefined") {
      const { Document, Packer, Paragraph } = await import("docx");
      const { saveAs } = await import("file-saver");
      const doc = new Document({
        sections: [{ children: [new Paragraph({ text: quill.getText() })] }],
      });
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${documentTitle}.docx`);
    }
  };

  // Handle undo/redo
  const handleUndo = () => {
    if (quill) {
      quill.history.undo();
    }
  };

  const handleRedo = () => {
    if (quill) {
      quill.history.redo();
    }
  };

  // Handle citation
  const handleCitation = (article: {
    id: number;
    title: string;
    authors: string;
    journal: string;
    year: number;
    type: string;
    abstract: string;
    doi: string;
  }) => {
    const citation = `${article.authors} (${article.year}). ${article.title}. ${article.journal}. DOI: ${article.doi}`;
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(
        quill.getLength(),
        `<p>${citation}</p>`
      );
    }
    setIsJournalsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header
        documentTitle={documentTitle}
        setDocumentTitle={setDocumentTitle}
        handleSave={handleSave}
        handleExportPDF={handleExportPDF}
        handleExportDOCX={handleExportDOCX}
        handleZoom={handleZoom}
      />
      {/* Toolbar */}
      <Toolbar
        setIsJournalsModalOpen={setIsJournalsModalOpen}
        setIsPlagiarismModalOpen={setIsPlagiarismModalOpen}
        setIsChatbotOpen={setIsChatbotOpen}
        isChatbotOpen={isChatbotOpen}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        toolbarOptions={TOOLBAR_OPTIONS}
      />
      {/* Main Editor */}
      <main className="flex-1 pt-36 pb-16 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-8 min-h-[800px] relative">
          <div className="absolute top-2 right-2 text-sm text-gray-500">
            {zoomLevel}%
          </div>
          <div className="container" ref={wrapperRef}></div>
        </div>
      </main>
      {/* Journals Modal */}
      {isJournalsModalOpen && (
        <JournalsModal
          setIsJournalsModalOpen={setIsJournalsModalOpen}
          handleCitation={handleCitation}
        />
      )}
      {/* Plagiarism Modal */}
      {isPlagiarismModalOpen && (
        <PlagiarismModal setIsPlagiarismModalOpen={setIsPlagiarismModalOpen} />
      )}
      {/* Chatbot Modal */}
      {isChatbotOpen && <Chatbot setIsChatbotOpen={setIsChatbotOpen} />}
    </div>
  );
};

export default EditorPage;

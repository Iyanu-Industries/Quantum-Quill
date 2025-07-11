"use client";
import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const WordProcessor: React.FC = () => {
  const quillRef = useRef<HTMLDivElement>(null);
  const [quill, setQuill] = useState<Quill | null>(null);
  const [fileName, setFileName] = useState<string>("document.docx");

  // Initialize Quill editor
  useEffect(() => {
    if (quillRef.current && !quill) {
      const editor = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
      });
      setQuill(editor);
    }
  }, [quill]);

  // Handle file upload and send to server for conversion
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith(".docx")) {
      setFileName(file.name);
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/convert-docx", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (quill && result.html) {
        quill.root.innerHTML = result.html;
      }
    } else {
      alert("Please upload a valid .docx file");
    }
  };

  // Send HTML to server to save as .docx
  const saveDocument = async () => {
    if (quill) {
      const html = quill.root.innerHTML;
      const response = await fetch("/api/save-docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html, fileName }),
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}
      >
        Word Processor
      </h2>
      <div style={{ marginBottom: "16px", display: "flex", gap: "16px" }}>
        <input
          type="file"
          accept=".docx"
          onChange={handleFileChange}
          style={{ padding: "8px" }}
        />
        <button
          onClick={saveDocument}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Save as DOCX
        </button>
      </div>
      <div
        ref={quillRef}
        style={{
          backgroundColor: "white",
          border: "1px solid #d1d5db",
          minHeight: "400px",
        }}
      />
    </div>
  );
};

export default WordProcessor;

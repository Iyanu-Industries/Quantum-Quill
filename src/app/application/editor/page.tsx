"use client";
import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import axios from "axios";
import { Toolbar } from "@/components/application/editor/toolbar";
import { Sidebar } from "@/components/application/editor/sidebar";
import { LoadingAnimation } from "@/components/application/editor/loading";
import { Header } from "@/components/application/editor/header";
import { ChatSidebar } from "@/components/application/editor/chatSidebar";
import { EditorHandle, Editor } from "@/components/application/editor/editor";
import {
  DocumentStats,
  PageSetup,
  Citation,
  PlagiarismData,
  GrammarCheckResult,
} from "@/components/application/editor/interfaces";

export default function Home() {
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const projectTitle = searchParams?.get("title") || "";
  const projectType = searchParams?.get("type") || "";
  const projectDescription = searchParams?.get("description") || "";
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Format");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [citationsData, setCitationsData] = useState<Citation[]>([]);
  const [plagiarismData, setPlagiarismData] = useState<PlagiarismData | null>(
    null
  );
  const [isPlagiarismCheckLoading, setIsPlagiarismCheckLoading] =
    useState(false);
  const [grammarData, setGrammarData] = useState<GrammarCheckResult[]>([]);
  const editorRef = useRef<EditorHandle>(null);
  const [activeView, setActiveView] = useState<
    "chat" | "citations" | "plagiarism" | "grammar"
  >("chat");

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  const [pageSetup, setPageSetup] = useState<PageSetup>({
    pageSize: "a4",
    marginSize: 1,
    fontSize: "12",
    fontFamily: "'Times New Roman', serif",
  });
  // Update your changeFontSize function
  // Fixed changeFontSize

  const checkGrammar = async (text: string): Promise<GrammarCheckResult[]> => {
    try {
      // Using the public API (has rate limits)
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `text=${encodeURIComponent(text)}&language=en-US`,
      });

      const data = await response.json();

      // Convert to your GrammarCheckResult format
      const results = data.matches.map((match: any) => ({
        type: match.rule.issueType === "grammar" ? "error" : "suggestion",
        category: match.rule.category.name,
        text: match.context.text.substring(
          match.context.offset,
          match.context.offset + match.context.length
        ),
        suggestion: match.replacements[0]?.value || "No suggestion available",
      }));

      return results;
    } catch (error) {
      console.error("Grammar check failed:", error);
      return []; // Return empty array on error
    }
  };

  // Usage in your handleGrammarCheck function
  const handleGrammarCheck = async () => {
    const text = editorRef.current?.getEditorText() || "";
    const grammarResults = await checkGrammar(text);
    setGrammarData(grammarResults);
    setIsChatOpen(true);
    setActiveView("grammar");
  };
  const changeFontSize = (size: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.fontSize = `${size}px`;

    if (range.collapsed) {
      // Create marker for cursor position
      const marker = document.createElement("span");
      marker.className = "font-size-marker";
      marker.dataset.fontSize = size;
      marker.innerHTML = "&#8203;"; // Zero-width space
      range.insertNode(marker);

      // Move cursor inside marker
      const newRange = document.createRange();
      newRange.setStart(marker, 0);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // Remove existing font size spans in selection
      const existingSpans = range
        .cloneContents()
        .querySelectorAll('span[style*="font-size"]');
      existingSpans.forEach((existingSpan) => {
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
      const marker = document.createElement("span");
      marker.className = "font-family-marker";
      marker.dataset.fontFamily = fontFamily;
      marker.innerHTML = "&#8203;"; // Zero-width space
      range.insertNode(marker);

      // Move cursor
      const newRange = document.createRange();
      newRange.setStart(marker, 0);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // Remove existing font family spans
      const existingSpans = range
        .cloneContents()
        .querySelectorAll('span[style*="font-family"]');
      existingSpans.forEach((existingSpan) => {
        const parent = existingSpan.parentNode;
        while (existingSpan.firstChild) {
          parent?.insertBefore(existingSpan.firstChild, existingSpan);
        }
        parent?.removeChild(existingSpan);
      });

      // Apply new font family
      const span = document.createElement("span");
      span.style.fontFamily = fontFamily;
      const fragment = range.extractContents();
      span.appendChild(fragment);
      range.insertNode(span);
    }
  };

  // Add this cleanup function to handle markers
  const cleanupMarkers = () => {
    // Get the actual DOM element from the editor handle
    const editorElement = editorRef.current?.getEditorElement();
    if (!editorElement) return;

    // Helper function to safely cleanup a marker
    const cleanupMarker = (marker: Element) => {
      const parent = marker.parentNode;
      if (!parent) return;

      const fragment = document.createDocumentFragment();

      // Move all children to the fragment
      while (marker.firstChild) {
        fragment.appendChild(marker.firstChild);
      }

      // Insert the fragment before the marker
      parent.insertBefore(fragment, marker);

      // Remove the marker
      parent.removeChild(marker);
    };

    // Process markers safely
    const markerClasses = ["font-size-marker", "font-family-marker"];

    markerClasses.forEach((markerClass) => {
      // Convert NodeList to array using the actual DOM element
      const markers = Array.from(
        editorElement.querySelectorAll(`.${markerClass}`)
      );

      markers.forEach((marker) => {
        if (marker.isConnected) {
          cleanupMarker(marker);
        }
      });
    });
  };

  const handlePageSetupChange = (
    property: keyof PageSetup,
    value: string | number
  ) => {
    setPageSetup((prev) => ({ ...prev, [property]: value }));

    if (property === "fontFamily") {
      changeFontFamily(value as string);
    } else if (property === "fontSize") {
      changeFontSize(value as string);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
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
    document.execCommand("bold", false);
  };

  const handleItalic = (): void => {
    document.execCommand("italic", false);
  };

  const handleUnderline = (): void => {
    document.execCommand("underline", false);
  };

  const handleStrikethrough = (): void => {
    document.execCommand("strikethrough", false);
  };

  const handleAlignLeft = (): void => {
    document.execCommand("justifyLeft", false);
  };

  const handleAlignCenter = (): void => {
    document.execCommand("justifyCenter", false);
  };

  const handleAlignRight = (): void => {
    document.execCommand("justifyRight", false);
  };

  const handleAlignJustify = (): void => {
    document.execCommand("justifyFull", false);
  };

  const handleBulletList = (): void => {
    document.execCommand("insertUnorderedList", false);
  };

  const handleNumberList = (): void => {
    document.execCommand("insertOrderedList", false);
  };
  const handleCitationManager = () => {
    const text = editorRef.current?.getEditorText() || "";

    if (!text.trim()) {
      setCitationsData([]);
      setIsChatOpen(true);
      setActiveView("citations");
      return;
    }

    // Simple regex patterns for APA and IEEE citations
    const apaRegex =
      /\b([A-Z][a-z]+),\s([A-Z]\.)\s\((\d{4})\)\.\s(.+?)\.\s(.+?)\./g;
    const ieeeRegex =
      /\[\d+\]\s([A-Z]\.\s)?([A-Z][a-z]+),\s"(.+?)",\s(.+?),\svol\.\s\d+,\sno\.\s\d+,\spp\.\s\d+-\d+,\s\d{4}\./g;

    const citations: Citation[] = [];

    let match;
    while ((match = apaRegex.exec(text))) {
      citations.push({
        style: "APA",
        text: match[0],
      });
    }
    while ((match = ieeeRegex.exec(text))) {
      citations.push({
        style: "IEEE",
        text: match[0],
      });
    }

    setCitationsData(citations);
    console.log("Citations found:", citations);
    setIsChatOpen(true);
    setActiveView("citations");
  };

  const checkPlagiarism = async (text: string): Promise<PlagiarismData> => {
    try {
      // Call the correct API endpoint with proper URL
      const response = await axios.post(
        "http://localhost:5000/api/check-plagiarism",
        {
          text: text,
        }
      );

      // Transform the API response to match our PlagiarismData structure
      return {
        score: response.data.similarityScore,
        issues: response.data.detailedMatches.map((match: any) => ({
          source: match.title,
          text: `Found ${match.maxSimilarity}% similarity in this paper`,
          similarity: match.maxSimilarity,
        })),
      };
    } catch (error) {
      console.error("Plagiarism check failed:", error);
      // Return error state
      return {
        score: 0,
        issues: [
          {
            source: "API Error",
            text: "Failed to connect to plagiarism checker. Make sure your server is running on http://localhost:5000",
          },
        ],
      };
    }
  };

  /**
   * Handles the plagiarism check button click
   */
  const handlePlagiarismCheck = async () => {
    const text = editorRef.current?.getEditorText() || "";

    if (!text.trim()) {
      setPlagiarismData({
        score: 0,
        issues: [
          {
            source: "Input Error",
            text: "Please enter text to check for plagiarism",
          },
        ],
      });
      setIsChatOpen(true);
      setActiveView("plagiarism");
      return;
    }

    try {
      // Show loading state if you have one
      setIsPlagiarismCheckLoading(true);

      // Call the API and wait for results
      const plagiarismResult = await checkPlagiarism(text);

      // Update state with results
      setPlagiarismData(plagiarismResult);
      setIsChatOpen(true);
      setActiveView("plagiarism");
    } catch (error) {
      console.error("Error checking plagiarism:", error);
      setPlagiarismData({
        score: 0,
        issues: [
          {
            source: "System Error",
            text: "An unexpected error occurred while checking for plagiarism",
          },
        ],
      });
      setIsChatOpen(true);
      setActiveView("plagiarism");
    } finally {
      setIsPlagiarismCheckLoading(false);
    }
  };
  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        /> */}

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
            ref={editorRef}
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
            isSidebarOpen={isSidebarOpen}
            isChatOpen={isChatOpen}
            cleanupMarkers={cleanupMarkers}
            pageSetup={pageSetup}
            stats={stats}
            onStatsUpdate={setStats}
          />
        </div>

        <ChatSidebar
          projectTitle={projectTitle}
          projectType={projectType}
          projectDescription={projectDescription}
          isOpen={isChatOpen}
          isPlagiarismLoading={isPlagiarismCheckLoading}
          onToggle={() => setIsChatOpen(!isChatOpen)}
          citationsData={citationsData}
          plagiarismData={plagiarismData}
          activeView={activeView}
          setActiveView={setActiveView}
          grammarData={grammarData}
        />
      </div>
    </div>
  );
}

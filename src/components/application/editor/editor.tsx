import {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import { PageSetup, DocumentStats } from "./interfaces";

interface EditorProps {
  zoomLevel: number;
  isSidebarOpen: boolean;
  pageSetup: PageSetup;
  cleanupMarkers: () => void;
  isChatOpen: boolean;
  stats: DocumentStats;
  setZoomLevel?: (level: number) => void;
  onStatsUpdate: (stats: DocumentStats) => void;
}
export interface EditorHandle {
  getEditorContent: () => string;
  getEditorText: () => string;
  getEditorElement: () => HTMLElement | null;
}

export const Editor = forwardRef<EditorHandle, EditorProps>(
  (
    {
      cleanupMarkers,
      zoomLevel,
      setZoomLevel,
      isSidebarOpen,
      isChatOpen,
      pageSetup,
      stats,
      onStatsUpdate,
    },
    ref
  ) => {
    // Fix: Type the ref as HTMLDivElement
    const editorRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      let sidebars = 0;
      if (isSidebarOpen) sidebars += 1;
      if (isChatOpen) sidebars += 1;

      const baseZoom = 100;
      const zoomReductionPerSidebar = 6;
      const newZoom = baseZoom - sidebars * zoomReductionPerSidebar;

      if (setZoomLevel) {
        setZoomLevel(newZoom);
      }
    }, [isSidebarOpen, isChatOpen, setZoomLevel]);

    useEffect(() => {
      if (editorRef.current && !editorRef.current.innerHTML.trim()) {
        editorRef.current.innerHTML =
          "<p>Start typing your document here...</p>";
      }
    }, []);

    useImperativeHandle(ref, () => ({
      getEditorContent: () => editorRef.current?.innerHTML || "",
      getEditorText: () => editorRef.current?.innerText || "",
      getEditorElement: () => editorRef.current,
    }));
    const handleEditorInput = () => {
      cleanupMarkers();

      if (!editorRef.current) return;

      const text = editorRef.current.innerText || "";
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

    return (
      <div
        style={{ scrollbarWidth: "thin" }}
        className="flex-1  flex flex-col bg-gray-100 overflow-y-scroll pb-8"
      >
        <div className="flex-1 p-8 ">
          <div
            className={`mx-auto bg-white rounded-lg shadow-lg min-h-[800px] p-8 transition-all duration-300`}
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top center",
            }}
          >
            <div
              ref={editorRef}
              contentEditable="true"
              onInput={handleEditorInput}
              className="w-full h-full min-h-[700px] border-none outline-none resize-none text-gray-800 leading-relaxed font-normal"
              style={{
                lineHeight: 1.6,
                overflowWrap: "break-word",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
              suppressContentEditableWarning={true}
            />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-8 py-2 flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-6">
            <span>Word Count: {stats.words}</span>
            <span>Character Count: {stats.characters}</span>
            <span>Zoom: {zoomLevel}%</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Page Size: {pageSetup.pageSize.toUpperCase()}</span>
            <button className="hover:text-white transition-colors">⚙️</button>
          </div>
        </div>
      </div>
    );
  }
);
Editor.displayName = "Editor";

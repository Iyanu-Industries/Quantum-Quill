import { useState } from "react";
import React from "react";

interface PlagiarismModalProps {
  setIsPlagiarismModalOpen: (isOpen: boolean) => void;
}
const PlagiarismModal: React.FC<PlagiarismModalProps> = ({
  setIsPlagiarismModalOpen,
}) => {
  const [scanType, setScanType] = useState<"full" | "selection">("full");
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<
    { text: string; similarity: number; source: string }[]
  >([]);
  return (
    <div className="fixed inset-0 bg-black/30 z-20 flex items-center justify-center">
      <div className="w-[800px] h-[600px] bg-white rounded-lg shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-800 text-lg">
            <i className="fas fa-check-double text-blue-500 mr-2"></i>{" "}
            Plagiarism Checker
          </h3>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => !isScanning && setIsPlagiarismModalOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="scan-full"
                name="scan-type"
                checked={scanType === "full"}
                onChange={() => setScanType("full")}
                className="text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="scan-full">Scan entire document</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="scan-selection"
                name="scan-type"
                checked={scanType === "selection"}
                onChange={() => setScanType("selection")}
                className="text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="scan-selection">Scan selected text</label>
            </div>
            <button
              className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={() => {
                setIsScanning(true);
                setScanProgress(0);
                let progress = 0;
                const interval = setInterval(() => {
                  progress += 10;
                  setScanProgress(progress);
                  if (progress >= 100) {
                    clearInterval(interval);
                    setIsScanning(false);
                    setScanResults([
                      {
                        text: "The concept of artificial intelligence dates back to the mid-20th century",
                        similarity: 85,
                        source: "https://example.com/ai-history",
                      },
                    ]);
                  }
                }, 500);
              }}
              disabled={isScanning}
            >
              {isScanning ? "Scanning..." : "Start Scan"}
            </button>
          </div>
        </div>
        {isScanning && (
          <div className="p-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
            <p className="text-center mt-2 text-sm text-gray-600">
              Scanning document... {scanProgress}%
            </p>
          </div>
        )}
        {!isScanning && scanResults.length > 0 && (
          <div className="flex-1 overflow-y-auto p-4">
            <h4 className="font-medium text-lg mb-4">Scan Results</h4>
            <div className="space-y-4">
              {scanResults.map((result, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Similarity: {result.similarity}%
                    </span>
                    <a
                      href={result.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      View Source{" "}
                      <i className="fas fa-external-link-alt ml-1"></i>
                    </a>
                  </div>
                  <p className="text-gray-800 bg-yellow-50 p-3 rounded">
                    &quot;{result.text}&quot;
                  </p>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Suggestions:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      <li>Consider paraphrasing the content</li>
                      <li>Add proper citation using the citation tool</li>
                      <li>Revise the text to make it more original</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {!isScanning && scanResults.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Click &quot;Start Scan&quot; to check for plagiarism
          </div>
        )}
      </div>
    </div>
  );
};

export default PlagiarismModal;

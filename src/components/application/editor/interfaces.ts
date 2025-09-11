export interface PageSetup {
  pageSize: string;
  marginSize: number;
  fontSize: string;
  fontFamily: string;
}

export interface DocumentStats {
  words: number;
  characters: number;
  pages: number;
  charsNoSpaces: number;
  charsWithSpaces: number;
  paragraphs: number;
  lines: number;
}

export interface Citation {
  style: "APA" | "MLA" | "Chicago" | "Harvard" | "IEEE";
  text: string;
}

// Types for plagiarism check results
export interface PlagiarismIssue {
  source: string;
  text: string;
}

export interface PlagiarismData {
  score: number;
  issues: PlagiarismIssue[];
}

export interface GrammarCheckResult {
  type: "error" | "warning" | "suggestion";
  category: "Grammar" | "Spelling" | "Style" | "Punctuation";
  text: string;
  suggestion: string;
}

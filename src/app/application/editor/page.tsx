// components/DocumentEditor.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as Mammoth from "mammoth";
import Docxtemplater from "docxtemplater";
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
  // In your DocumentEditor component, update the loadDocument function:

  interface LoadDocumentOptions {
    styleMap?: string[];
    includeDefaultStyleMap?: boolean;
  }

  interface MammothResult {
    value: string;
    messages: Array<{ type: string; message: string }>;
  }

  const loadDocument = async (
    data: ArrayBuffer,
    options?: LoadDocumentOptions
  ): Promise<void> => {
    try {
      // Enhanced Mammoth configuration for comprehensive style preservation
      const result: MammothResult = await Mammoth.convertToHtml(
        { arrayBuffer: data },
        {
          styleMap: [
            // Preserve paragraph styles with formatting
            "p => p:fresh",
            "p[style-name='Heading 1'] => h1:fresh",
            "p[style-name='Heading 2'] => h2:fresh",
            "p[style-name='Heading 3'] => h3:fresh",
            "p[style-name='Heading 4'] => h4:fresh",
            "p[style-name='Heading 5'] => h5:fresh",
            "p[style-name='Heading 6'] => h6:fresh",
            "p[style-name='Title'] => h1.title:fresh",
            "p[style-name='Subtitle'] => h2.subtitle:fresh",

            // Table preservation with full styling
            "table => table:fresh",
            "tr => tr:fresh",
            "td => td:fresh",
            "th => th:fresh",
            "thead => thead:fresh",
            "tbody => tbody:fresh",
            "tfoot => tfoot:fresh",

            // List styles with Roman numerals and symbols
            "ul => ul:fresh",
            "ol => ol:fresh",
            "li => li:fresh",

            // Text formatting
            "r[style-name='Strong'] => strong:fresh",
            "r[style-name='Emphasis'] => em:fresh",
            "r[style-name='Underline'] => u:fresh",

            // Additional formatting elements
            "div => div:fresh",
            "span => span:fresh",
            "blockquote => blockquote:fresh",
            "pre => pre:fresh",
            "code => code:fresh",

            // Image and media preservation
            "img => img:fresh",
            "figure => figure:fresh",
            "figcaption => figcaption:fresh",

            // Custom styles - preserve all Word styles
            ...(options?.styleMap || []),
          ],
          includeDefaultStyleMap: options?.includeDefaultStyleMap ?? true,

          // Enhanced options for better preservation
          convertImage: Mammoth.images.imgElement((image) => {
            return image.read("base64").then((imageBuffer) => {
              return {
                src: `data:${image.contentType};base64,${imageBuffer}`,
                style: "max-width: 100%; height: auto;",
              };
            });
          }),

          // Preserve more document structure
          ignoreEmptyParagraphs: false,

          // Transform functions for better style preservation
          transformDocument: (document) => {
            // Additional document-level transformations if needed
            return document;
          },
        }
      );

      if (editorRef.current) {
        editorRef.current.innerHTML = result.value;

        // Enhanced style preservation post-processing
        const elements: NodeListOf<HTMLElement> =
          editorRef.current.querySelectorAll("*");

        elements.forEach((element: HTMLElement) => {
          // Preserve line height from original document
          if (
            !element.style.lineHeight &&
            element.getAttribute("data-line-height")
          ) {
            element.style.lineHeight =
              element.getAttribute("data-line-height") || "1.6";
          } else if (!element.style.lineHeight) {
            // Set contextual line heights based on element type
            switch (element.tagName.toLowerCase()) {
              case "h1":
              case "h2":
              case "h3":
              case "h4":
              case "h5":
              case "h6":
                element.style.lineHeight = "1.2";
                break;
              case "p":
                element.style.lineHeight = "1.6";
                break;
              case "li":
                element.style.lineHeight = "1.5";
                break;
              default:
                element.style.lineHeight = "1.4";
            }
          }

          // Preserve table styles
          if (element.tagName.toLowerCase() === "table") {
            element.style.borderCollapse =
              element.style.borderCollapse || "collapse";
            element.style.width = element.style.width || "auto";
            element.style.margin = element.style.margin || "1em 0";
          }

          if (["td", "th"].includes(element.tagName.toLowerCase())) {
            element.style.padding = element.style.padding || "8px 12px";
            element.style.border = element.style.border || "1px solid #ddd";
            element.style.verticalAlign = element.style.verticalAlign || "top";
          }

          // Enhanced list style preservation
          if (element.tagName.toLowerCase() === "ol") {
            // Detect and preserve Roman numeral lists
            const listStyleType =
              element.style.listStyleType ||
              element.getAttribute("data-list-style") ||
              "decimal";

            // Map common Word list styles
            const wordListStyles = {
              "upper-roman": "upper-roman",
              "lower-roman": "lower-roman",
              "upper-alpha": "upper-alpha",
              "lower-alpha": "lower-alpha",
              decimal: "decimal",
            };

            element.style.listStyleType =
              wordListStyles[listStyleType as keyof typeof wordListStyles] ||
              listStyleType;
            element.style.paddingLeft = element.style.paddingLeft || "2em";
          }

          if (element.tagName.toLowerCase() === "ul") {
            // Preserve bullet styles (disc, circle, square, etc.)
            const listStyleType =
              element.style.listStyleType ||
              element.getAttribute("data-list-style") ||
              "disc";

            const bulletStyles = {
              disc: "disc",
              circle: "circle",
              square: "square",
              none: "none",
            };

            element.style.listStyleType =
              bulletStyles[listStyleType as keyof typeof bulletStyles] ||
              listStyleType;
            element.style.paddingLeft = element.style.paddingLeft || "2em";
          }

          // Preserve text alignment
          if (element.getAttribute("data-text-align")) {
            element.style.textAlign =
              element.getAttribute("data-text-align") || "left";
          }

          // Preserve margins and spacing
          if (element.getAttribute("data-margin-top")) {
            element.style.marginTop =
              element.getAttribute("data-margin-top") || "0";
          }
          if (element.getAttribute("data-margin-bottom")) {
            element.style.marginBottom =
              element.getAttribute("data-margin-bottom") || "0";
          }

          // Preserve font styles
          if (element.getAttribute("data-font-family")) {
            element.style.fontFamily =
              element.getAttribute("data-font-family") || "inherit";
          }
          if (element.getAttribute("data-font-size")) {
            element.style.fontSize =
              element.getAttribute("data-font-size") || "inherit";
          }
          if (element.getAttribute("data-font-weight")) {
            element.style.fontWeight =
              element.getAttribute("data-font-weight") || "normal";
          }

          // Preserve colors
          if (element.getAttribute("data-color")) {
            element.style.color =
              element.getAttribute("data-color") || "inherit";
          }
          if (element.getAttribute("data-background-color")) {
            element.style.backgroundColor =
              element.getAttribute("data-background-color") || "transparent";
          }

          // Preserve indentation
          if (element.getAttribute("data-indent")) {
            element.style.marginLeft =
              element.getAttribute("data-indent") || "0";
          }
        });

        // Enhanced CSS rules for better Word document compatibility
        const style = document.createElement("style");
        style.textContent = `
        /* PRESERVE Word document table styles - minimal override */
        #editor table {
          border-collapse: collapse !important;
          margin: 1em 0;
          font-family: inherit;
        }
        
        /* Only add borders if Word document doesn't have them */
        #editor table:not([style*="border"]) {
          border: 1px solid #000;
        }
        
        #editor th:not([style*="border"]), 
        #editor td:not([style*="border"]) {
          border: 1px solid #000;
        }
        
        /* Preserve Word document cell styling */
        #editor th, #editor td {
          text-align: left;
          vertical-align: top;
          padding: 4px 8px;
        }
        
        /* Enhanced list styles that don't override Word formatting */
        #editor ol[data-list-style="upper-roman"] {
          list-style-type: upper-roman;
        }
        
        #editor ol[data-list-style="lower-roman"] {
          list-style-type: lower-roman;
        }
        
        #editor ol[data-list-style="upper-alpha"] {
          list-style-type: upper-alpha;
        }
        
        #editor ol[data-list-style="lower-alpha"] {
          list-style-type: lower-alpha;
        }
        
        #editor ul[data-list-style="disc"] {
          list-style-type: disc;
        }
        
        #editor ul[data-list-style="circle"] {
          list-style-type: circle;
        }
        
        #editor ul[data-list-style="square"] {
          list-style-type: square;
        }
        
        /* Preserve Word spacing and formatting */
        #editor p {
          margin: 0 0 1em 0;
        }
        
        /* Heading styles similar to Word */
        #editor h1, #editor h2, #editor h3, #editor h4, #editor h5, #editor h6 {
          margin: 1.2em 0 0.6em 0;
          line-height: 1.2;
        }
        
        /* List spacing that doesn't interfere with Word styles */
        #editor ul, #editor ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        
        #editor li {
          margin: 0.5em 0;
        }
        
        /* Preserve image styling from Word */
        #editor img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1em 0;
        }
        
        /* Preserve bold text formatting */
        #editor strong, #editor b {
          font-weight: bold;
        }
        
        /* Preserve italic text formatting */
        #editor em, #editor i {
          font-style: italic;
        }
        
        /* Preserve underline formatting */
        #editor u {
          text-decoration: underline;
        }
      `;

        document.head.appendChild(style);
      }

      updateWordCount();

      // Log conversion messages for debugging
      if (result.messages && result.messages.length > 0) {
        console.log("Document conversion messages:", result.messages);
      }
    } catch (error) {
      console.error("Error loading document:", error);
      alert("Error loading document: " + (error as Error).message);
    }
  };
  // const loadDocument = async (data: ArrayBuffer) => {
  //   try {
  //     // Configure Mammoth to preserve more styling
  //     const result = await Mammoth.convertToHtml(
  //       { arrayBuffer: data },
  //       {
  //         styleMap: [
  //           "p[style-name='Heading 1'] => h1:fresh",
  //           "p[style-name='Heading 2'] => h2:fresh",
  //           "p[style-name='Heading 3'] => h3:fresh",
  //           "r[style-name='Strong'] => strong",
  //           "r[style-name='Emphasis'] => em",
  //           "p[style-name='ListParagraph'] => li",
  //           "p[style-name='ListNumber'] => li",
  //           // Add more style mappings as needed
  //         ],
  //       }
  //     );

  //     if (editorRef.current) {
  //       editorRef.current.innerHTML = result.value;

  //       // Apply additional styling to preserve list and table appearance
  //       const lists = editorRef.current.querySelectorAll("ul, ol");
  //       lists.forEach((list) => {
  //         (list as HTMLElement).style.paddingLeft = "40px";
  //         (list as HTMLElement).style.margin = "10px 0";
  //       });

  //       const listItems = editorRef.current.querySelectorAll("li");
  //       listItems.forEach((item) => {
  //         (item as HTMLElement).style.margin = "5px 0";
  //       });

  //       const tables = editorRef.current.querySelectorAll("table");
  //       tables.forEach((table) => {
  //         (table as HTMLElement).style.borderCollapse = "collapse";
  //         (table as HTMLElement).style.width = "100%";
  //         (table as HTMLElement).style.margin = "10px 0";
  //       });

  //       const tableCells = editorRef.current.querySelectorAll("td, th");
  //       tableCells.forEach((cell) => {
  //         (cell as HTMLElement).style.border = "1px solid #000";
  //         (cell as HTMLElement).style.padding = "8px";
  //         (cell as HTMLElement).style.textAlign = "left";
  //       });
  //     }
  //     updateWordCount();
  //   } catch (error) {
  //     console.error("Error loading document:", error);
  //     alert("Error loading document: " + (error as Error).message);
  //   }
  // };

  const saveDocument = async () => {
    try {
      // Get content from editor
      const editorHtmlContent = editorRef.current?.innerHTML || "";
      const editorTextContent = editorRef.current?.innerText || "";

      // Create a new DOCX document from scratch using docxtemplater
      // We'll create a minimal valid DOCX structure

      // Create document.xml content
      const convertHtmlToWordML = (html: string) => {
        // This is a simplified conversion - in a real implementation,
        // you would want a more robust HTML to WordML converter
        let wordML = html;

        // Basic conversions for common elements
        wordML = wordML.replace(
          /<p[^>]*>/g,
          '</w:t></w:r></w:p><w:p><w:r><w:t xml:space="preserve">'
        );
        wordML = wordML.replace(/<\/p>/g, "</w:t></w:r></w:p>");

        // Handle line breaks
        wordML = wordML.replace(
          /<br\s*\/?>/g,
          '</w:t></w:r></w:p><w:p><w:r><w:t xml:space="preserve">'
        );

        // Handle bold
        wordML = wordML.replace(
          /<(strong|b)[^>]*>(.*?)<\/(strong|b)>/g,
          '</w:t></w:r></w:p><w:p><w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">$2</w:t></w:r></w:p><w:p><w:r><w:t xml:space="preserve">'
        );

        // Handle italics
        wordML = wordML.replace(
          /<(em|i)[^>]*>(.*?)<\/(em|i)>/g,
          '</w:t></w:r></w:p><w:p><w:r><w:rPr><w:i/></w:rPr><w:t xml:space="preserve">$2</w:t></w:r></w:p><w:p><w:r><w:t xml:space="preserve">'
        );

        // Remove remaining HTML tags
        wordML = wordML.replace(/<[^>]*>/g, "");

        // Escape XML characters
        wordML = wordML
          .replace(/&/g, "&amp;")
          .replace(/</g, "<")
          .replace(/>/g, ">")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&apos;");

        // Wrap in paragraph tags
        return `<w:p><w:r><w:t xml:space="preserve">${wordML}</w:t></w:r></w:p>`;
      };

      // Create a basic DOCX structure
      const createBasicDocx = async () => {
        // Create a new JSZip instance
        const zip = new JSZip();

        // Add required DOCX files
        // [Content_Types].xml
        zip.file(
          "[Content_Types].xml",
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
  <Override PartName="/word/webSettings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml"/>
  <Override PartName="/word/fontTable.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"/>
  <Override PartName="/word/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`
        );

        // _rels/.rels
        zip.folder("_rels")?.file(
          ".rels",
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`
        );

        // docProps/app.xml
        zip.folder("docProps")?.file(
          "app.xml",
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">
  <Application>Document Editor</Application>
</Properties>`
        );

        // docProps/core.xml
        zip.folder("docProps")?.file(
          "core.xml",
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties">
  <dc:title>Document</dc:title>
  <dc:creator>Document Editor</dc:creator>
  <cp:lastModifiedBy>Document Editor</cp:lastModifiedBy>
  <cp:revision>1</cp:revision>
</cp:coreProperties>`
        );

        // word folder
        const wordFolder = zip.folder("word");

        // word/_rels/document.xml.rels
        wordFolder?.folder("_rels")?.file(
          "document.xml.rels",
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`
        );

        // word/document.xml
        const wordMLContent = convertHtmlToWordML(editorHtmlContent);
        wordFolder?.file(
          "document.xml",
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${wordMLContent}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`
        );

        // word/styles.xml
        wordFolder?.file(
          "styles.xml",
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri" w:cs="Times New Roman"/>
      </w:rPr>
    </w:rPrDefault>
    <w:pPrDefault/>
  </w:docDefaults>
  <w:style w:type="paragraph" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
    <w:pPr>
      <w:spacing w:after="120" w:line="240" w:lineRule="auto"/>
    </w:pPr>
    <w:rPr>
      <w:sz w:val="20"/>
      <w:szCs w:val="20"/>
    </w:rPr>
  </w:style>
</w:styles>`
        );

        // word/settings.xml
        wordFolder?.file(
          "settings.xml",
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:defaultTabStop w:val="720"/>
  <w:characterSpacingControl w:val="doNotCompress"/>
</w:settings>`
        );

        // word/webSettings.xml
        wordFolder?.file(
          "webSettings.xml",
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:webSettings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
</w:webSettings>`
        );

        // word/fontTable.xml
        wordFolder?.file(
          "fontTable.xml",
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:fonts xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:font w:name="Calibri">
    <w:panose1 w:val="020F0502020204030204"/>
  </w:font>
  <w:font w:name="Times New Roman">
    <w:panose1 w:val="02020603050405020304"/>
  </w:font>
</w:fonts>`
        );

        // word/theme/theme1.xml
        wordFolder?.file(
          "theme/theme1.xml",
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">
  <a:themeElements>
    <a:clrScheme name="Office">
      <a:dk1><a:srgbClr val="000000"/></a:dk1>
      <a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>
      <a:dk2><a:srgbClr val="1F497D"/></a:dk2>
      <a:lt2><a:srgbClr val="EEECE1"/></a:lt2>
      <a:accent1><a:srgbClr val="4F81BD"/></a:accent1>
      <a:accent2><a:srgbClr val="C0504D"/></a:accent2>
      <a:accent3><a:srgbClr val="9BBB59"/></a:accent3>
      <a:accent4><a:srgbClr val="8064A2"/></a:accent4>
      <a:accent5><a:srgbClr val="4BACC6"/></a:accent5>
      <a:accent6><a:srgbClr val="F79646"/></a:accent6>
      <a:hlink><a:srgbClr val="0000FF"/></a:hlink>
      <a:folHlink><a:srgbClr val="800080"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="Office">
      <a:majorFont>
        <a:latin typeface="Calibri"/>
        <a:ea typeface=""/>
        <a:cs typeface=""/>
      </a:majorFont>
      <a:minorFont>
        <a:latin typeface="Calibri"/>
        <a:ea typeface=""/>
        <a:cs typeface=""/>
      </a:minorFont>
    </a:fontScheme>
    <a:fmtScheme name="Office">
      <a:fillStyleLst>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
      </a:fillStyleLst>
      <a:lnStyleLst>
        <a:ln w="9525" cap="flat" cmpd="sng" algn="ctr">
          <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
          <a:prstDash val="solid"/>
        </a:ln>
      </a:lnStyleLst>
      <a:effectStyleLst>
        <a:effectStyle/>
      </a:effectStyleLst>
      <a:bgFillStyleLst>
        <a:solidFill><a:schemeClr val="phClr"/></a:solidFill>
      </a:bgFillStyleLst>
    </a:fmtScheme>
  </a:themeElements>
</a:theme>`
        );

        // Generate the DOCX file
        const blob = await zip.generateAsync({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        return blob;
      };

      // Create and save the DOCX file
      const blob = await createBasicDocx();
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      saveAs(blob, `document-${timestamp}.docx`);

      console.log("Document saved successfully as DOCX!");
    } catch (error) {
      console.error("Error saving document:", error);
      alert(`Error saving document: ${(error as Error).message}`);
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

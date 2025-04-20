import { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "./prism-theme.css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-less";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-git";
import "./markdown-styles.css";

// Add proper type definition for the window object with Prism
declare global {
  interface Window {
    Prism: typeof Prism;
  }
}

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [renderedContent, setRenderedContent] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Prism.js when component mounts
  useEffect(() => {
    // Force Prism to be available globally
    if (typeof window !== "undefined") {
      window.Prism = Prism;
    }
  }, []);

  // Handle copy functionality for code blocks
  useEffect(() => {
    if (!containerRef.current) return;

    const copyButtons =
      containerRef.current.querySelectorAll(".copy-code-button");

    // Create a function to handle copy
    const handleCopy = (event) => {
      const button = event.currentTarget;
      const codeBlock = button.closest(".code-block-wrapper");
      const codeElement = codeBlock?.querySelector("code");

      if (codeElement) {
        // Get the text content and decode HTML entities
        const textToCopy = codeElement.textContent || "";

        // Use the clipboard API to copy the text
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            // Show success state
            const originalText = button.textContent;
            button.textContent = "Copied!";
            button.classList.add("copied");

            // Reset after delay
            setTimeout(() => {
              button.textContent = originalText;
              button.classList.remove("copied");
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy code: ", err);
            button.textContent = "Failed!";
            setTimeout(() => {
              button.textContent = "Copy";
            }, 2000);
          });
      }
    };

    // Add event listeners
    copyButtons.forEach((button) => {
      button.addEventListener("click", handleCopy);
    });

    // Clean up event listeners
    return () => {
      copyButtons.forEach((button) => {
        button.removeEventListener("click", handleCopy);
      });
    };
  }, [renderedContent]);

  useEffect(() => {
    // Initialize rendered content
    let rendered = content;

    // Code blocks with syntax highlighting and copy button
    rendered = rendered.replace(
      /```([a-z]*)\n([\s\S]*?)```/g,
      (_, lang, code) => {
        // Normalize line breaks and trim extra whitespace
        const normalizedCode = code.replace(/\n\s*\n/g, "\n").trim();
        
        // Escape HTML to prevent rendering
        const escapedCode = normalizedCode
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");

        // Map some common language aliases to their Prism equivalents
        const languageMap = {
          js: "javascript",
          ts: "typescript",
          jsx: "jsx",
          tsx: "tsx",
          html: "markup",
          xml: "markup",
          py: "python",
          rb: "ruby",
          rs: "rust",
          sh: "bash",
          bash: "bash",
          shell: "bash",
          cs: "csharp",
          go: "go",
          yml: "yaml",
          "": "text", // Empty string for unspecified language
        };

        // Get the correct language identifier or default to plain text
        let language = languageMap[lang] || lang || "text";

        // Safe languages that have been confirmed to work
        const safeLanguages = [
          "javascript",
          "typescript",
          "jsx",
          "tsx",
          "css",
          "scss",
          "markup",
          "json",
          "yaml",
          "python",
          "csharp",
          "java",
          "bash",
          "go",
          "rust",
          "sql",
          "c",
          "cpp",
          "markdown",
        ];

        // If the language isn't in our safe list, default to text
        if (!safeLanguages.includes(language)) {
          language = "text";
        }

        return `
          <div class="code-block-wrapper relative group" data-language="${language}">
            <button class="copy-code-button absolute top-2 right-2 bg-muted/80 hover:bg-muted text-foreground p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1 z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              Copy
            </button>
            <pre class="language-${language} text-wrap"><code class="language-${language} wrap">${escapedCode}</code></pre>
          </div>
        `;
      }
    );

    // Inline code
    rendered = rendered.replace(
      /`([^`]+)`/g,
      '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
    );

    // Headings
    rendered = rendered.replace(
      /^# (.*$)/gm,
      '<h1 class="text-3xl font-bold my-4 text-foreground dark:text-foreground">$1</h1>'
    );
    rendered = rendered.replace(
      /^## (.*$)/gm,
      '<h2 class="text-2xl font-bold my-3 text-foreground dark:text-foreground">$1</h2>'
    );
    rendered = rendered.replace(
      /^### (.*$)/gm,
      '<h3 class="text-xl font-bold my-2 text-foreground dark:text-foreground">$1</h3>'
    );
    rendered = rendered.replace(
      /^#### (.*$)/gm,
      '<h4 class="text-lg font-bold my-2 text-foreground dark:text-foreground">$1</h4>'
    );
    rendered = rendered.replace(
      /^##### (.*$)/gm,
      '<h5 class="text-base font-bold my-2 text-foreground dark:text-foreground">$1</h5>'
    );
    rendered = rendered.replace(
      /^###### (.*$)/gm,
      '<h6 class="text-sm font-bold my-2 text-foreground dark:text-foreground">$1</h6>'
    );

    // Bold text
    rendered = rendered.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Italic text
    rendered = rendered.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Links
    rendered = rendered.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-[var(--accent-color)] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Images
    rendered = rendered.replace(
      /!\[(.*?)\]\((.*?)\)/g,
      '<img src="$2" alt="$1" class="rounded-md max-w-full my-4" />'
    );

    // Blockquotes
    rendered = rendered.replace(
      /^> (.*$)/gm,
      '<blockquote class="border-l-4 border-[var(--accent-color)]/40 pl-4 py-1 my-4 text-muted-foreground italic">$1</blockquote>'
    );

    // Horizontal rule
    rendered = rendered.replace(
      /^---$/gm,
      '<hr class="my-6 border-t border-border" />'
    );

    // Unordered lists
    // Convert list items first
    rendered = rendered.replace(
      /^\* (.*)$/gm,
      '<li class="ml-6 list-disc">$1</li>'
    );
    // Then wrap adjacent list items in <ul> tags
    rendered = rendered.replace(
      /(<li[^>]*>.*<\/li>)(\n<li[^>]*>.*<\/li>)+/g,
      '<ul class="my-4 space-y-1">$&</ul>'
    );

    // Ordered lists
    // Convert list items first
    rendered = rendered.replace(
      /^\d+\. (.*)$/gm,
      '<li class="ml-6 list-decimal">$1</li>'
    );
    // Then wrap adjacent list items in <ol> tags
    rendered = rendered.replace(
      /(<li[^>]*>.*<\/li>)(\n<li[^>]*>.*<\/li>)+/g,
      '<ol class="my-4 space-y-1">$&</ol>'
    );

    // Paragraphs (must be done last to avoid interfering with other elements)
    rendered = rendered.replace(
      /^([^<].*)\n$/gm,
      '<p class="my-4 text-foreground dark:text-foreground">$1</p>'
    );

    // Fix any doubled wrapping
    rendered = rendered.replace(
      /<ul class="my-4 space-y-1">(<ul class="my-4 space-y-1">.*<\/ul>)<\/ul>/g,
      "$1"
    );
    rendered = rendered.replace(
      /<ol class="my-4 space-y-1">(<ol class="my-4 space-y-1">.*<\/ol>)<\/ol>/g,
      "$1"
    );

    // Set the rendered content
    setRenderedContent(rendered);
  }, [content]);

  // Apply Prism highlighting after content is rendered
  useEffect(() => {
    if (renderedContent && containerRef.current) {
      try {
        // Apply syntax highlighting
        setTimeout(() => {
          Prism.highlightAllUnder(containerRef.current);

          // Handle long code blocks
          const codeBlocks = containerRef.current.querySelectorAll(
            ".code-block-wrapper"
          );
          codeBlocks.forEach((block) => {
            const pre = block.querySelector("pre");
            if (pre && pre.clientHeight > 400) {
              block.classList.add("has-long-content");
            }
          });

          // Ensure color syntax is applied by adding another class
          const codeElements = containerRef.current.querySelectorAll(
            'code[class*="language-"]'
          );
          codeElements.forEach((element) => {
            element.classList.add("prism-highlighted");
          });
        }, 10);
      } catch (error) {
        console.error("Error applying syntax highlighting:", error);
      }
    }
  }, [renderedContent]);

  return (
    <div
      ref={containerRef}
      className="max-w-none text-foreground dark:text-foreground markdown-content"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}

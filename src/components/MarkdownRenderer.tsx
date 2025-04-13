import { useState, useEffect } from "react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [renderedContent, setRenderedContent] = useState("");

  useEffect(() => {
    // Simple markdown renderer
    // In a real application, you'd use a proper markdown library
    let rendered = content;
    
    // Code blocks - make background visible in both light and dark mode
    rendered = rendered.replace(/```([a-z]*)\n([\s\S]*?)```/g, '<pre class="bg-secondary/50 dark:bg-secondary/30 p-4 rounded-md overflow-x-auto my-4 font-mono text-sm text-foreground"><code class="language-$1">$2</code></pre>');
    
    // Headings - explicit text colors to ensure visibility
    rendered = rendered.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-4 text-foreground dark:text-foreground">$1</h1>');
    rendered = rendered.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold my-3 text-foreground dark:text-foreground">$1</h2>');
    rendered = rendered.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold my-2 text-foreground dark:text-foreground">$1</h3>');
    
    // Bold
    rendered = rendered.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground dark:text-foreground">$1</strong>');
    
    // Italic
    rendered = rendered.replace(/\*(.*?)\*/g, '<em class="italic text-foreground dark:text-foreground">$1</em>');
    
    // Links - use consistent explicit color instead of CSS variables
    rendered = rendered.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline transition-colors">$1</a>');
    
    // Paragraphs - explicit text color
    rendered = rendered.replace(/^(?!<[h|p|u|o]|$)(.*$)/gm, '<p class="my-2 text-foreground dark:text-foreground">$1</p>');
    
    setRenderedContent(rendered);
  }, [content]);

  return (
    <div 
      className="max-w-none text-foreground dark:text-foreground"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}

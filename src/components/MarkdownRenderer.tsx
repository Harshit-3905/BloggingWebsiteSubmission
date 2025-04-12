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
    
    // Code blocks
    rendered = rendered.replace(/```([a-z]*)\n([\s\S]*?)```/g, '<pre class="bg-secondary/50 p-4 rounded-md overflow-x-auto my-4 font-code text-sm text-foreground"><code class="language-$1">$2</code></pre>');
    
    // Headings
    rendered = rendered.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-4 text-foreground">$1</h1>');
    rendered = rendered.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold my-3 text-foreground">$1</h2>');
    rendered = rendered.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold my-2 text-foreground">$1</h3>');
    
    // Bold
    rendered = rendered.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    rendered = rendered.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Links
    rendered = rendered.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
    
    // Paragraphs
    rendered = rendered.replace(/^(?!<[h|p|u|o]|$)(.*$)/gm, '<p class="my-2 text-foreground">$1</p>');
    
    setRenderedContent(rendered);
  }, [content]);

  return (
    <div 
      className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-code:font-code prose-a:text-[var(--accent-color)] hover:prose-a:underline"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}

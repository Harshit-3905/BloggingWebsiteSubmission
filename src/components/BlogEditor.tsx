import React, { useState, useRef, useEffect } from "react";
import { 
  Bold, 
  Italic, 
  Link, 
  List, 
  ListOrdered, 
  Image as ImageIcon, 
  Code,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Table
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useBlogStore } from "@/store/useBlogStore";
import { nanoid } from "nanoid";
import { useToast } from "@/hooks/use-toast";

interface BlogEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialCoverImage?: string;
  initialTags?: string[];
  initialExcerpt?: string;
  onSave?: (data: { title: string; content: string; coverImage: string; tags: string[]; excerpt: string }) => void;
  isSubmitting?: boolean;
}

export default function BlogEditor({
  initialTitle = "",
  initialContent = "",
  initialCoverImage = "/images/placeholder.jpg",
  initialTags = [],
  initialExcerpt = "",
  onSave,
  isSubmitting = false
}: BlogEditorProps) {
  const navigate = useNavigate();
  const { addBlog } = useBlogStore();
  
  // Basic blog state
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [currentTag, setCurrentTag] = useState("");
  const [coverImage, setCoverImage] = useState(initialCoverImage);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [isLivePreview, setIsLivePreview] = useState(true);
  const { toast } = useToast();
  
  // Ref for the editor
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Handle basic editor commands
  const execCommand = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };
  
  // Editor action helpers
  const handleBold = () => execCommand("bold");
  const handleItalic = () => execCommand("italic");
  const handleLink = () => {
    const url = prompt("Enter URL:");
    if (url) execCommand("createLink", url);
  };
  const handleUnorderedList = () => execCommand("insertUnorderedList");
  const handleOrderedList = () => execCommand("insertOrderedList");
  const handleImage = () => {
    const url = prompt("Enter image URL:");
    if (url) execCommand("insertImage", url);
  };
  const handleCode = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      const code = `<pre><code>${selection.toString()}</code></pre>`;
      document.execCommand("insertHTML", false, code);
    } else {
      const code = `<pre><code>Your code here</code></pre>`;
      document.execCommand("insertHTML", false, code);
    }
  };
  const handleH1 = () => execCommand("formatBlock", "<h1>");
  const handleH2 = () => execCommand("formatBlock", "<h2>");
  const handleH3 = () => execCommand("formatBlock", "<h3>");
  const handleQuote = () => execCommand("formatBlock", "<blockquote>");
  const handleAlignLeft = () => execCommand("justifyLeft");
  const handleAlignCenter = () => execCommand("justifyCenter");
  const handleAlignRight = () => execCommand("justifyRight");
  const handleUndo = () => execCommand("undo");
  const handleRedo = () => execCommand("redo");
  const handleTable = () => {
    const rows = prompt("Enter number of rows:", "3");
    const cols = prompt("Enter number of columns:", "3");
    
    if (rows && cols) {
      let table = "<table border='1' style='border-collapse: collapse; width: 100%;'>";
      
      // Header row
      table += "<tr>";
      for (let j = 0; j < parseInt(cols); j++) {
        table += "<th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>Header " + (j+1) + "</th>";
      }
      table += "</tr>";
      
      // Data rows
      for (let i = 0; i < parseInt(rows) - 1; i++) {
        table += "<tr>";
        for (let j = 0; j < parseInt(cols); j++) {
          table += "<td style='border: 1px solid #ddd; padding: 8px;'>Cell " + (i+1) + "-" + (j+1) + "</td>";
        }
        table += "</tr>";
      }
      
      table += "</table><p></p>";
      document.execCommand("insertHTML", false, table);
    }
  };

  // Track editor content changes
  const handleEditorChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };
  
  // Handle tags
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
      title: "Title Required",
      description: "Please enter a title for your blog post.",
      variant: "destructive"
      });
      return;
    }
    
    if (!content.trim() || content === "<p><br></p>") {
      toast({
      title: "Content Required",
      description: "Please add some content to your blog post.",
      variant: "destructive"
      });
      return;
    }
    
    if (tags.length === 0) {
      toast({
      title: "Tags Required",
      description: "Please add at least one tag to categorize your blog post.",
      variant: "destructive"
      });
      return;
    }
    
    // Use onSave prop if provided
    if (onSave) {
    onSave({
        title,
        content,
        coverImage,
        tags: tags,
        excerpt: excerpt || content.replace(/<[^>]*>/g, '').slice(0, 150) + "..."
      });
      return;
    }
    
    // Otherwise, create new blog post
    const newBlog = {
      id: nanoid(),
      title,
      content,
      excerpt: excerpt || content.replace(/<[^>]*>/g, '').slice(0, 150) + "...",
      coverImage: coverImage,
      author: {
        id: "current-user", // Replace with actual user ID if available
        name: "Current User",
        avatar: "/images/avatar.jpg",
        bio: "Bio placeholder" // Add appropriate bio if available
      },
      tags: tags,
      date: new Date().toISOString(),
      readTime: Math.ceil(content.split(" ").length / 200),
      slug: title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
      views: 0,
      likes: 0,
      bookmarked: false
    };
    
    // Add to store
    addBlog(newBlog);
    
    // Show success and redirect
    toast({
      title: "Blog Published",
      description: "Your blog post has been published successfully.",
      className: "border-primary"
    });
    navigate(`/blog/${newBlog.slug}`);
  };
  
  // Auto-resize excerpt textarea
  const excerptRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (excerptRef.current) {
      excerptRef.current.style.height = '0px';
      excerptRef.current.style.height = excerptRef.current.scrollHeight + 'px';
    }
  }, [excerpt]);

  return (
    <div className="editor-container p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Create New Blog Post</h1>
        <p className="text-center text-muted-foreground mb-6">
          Share your knowledge and ideas with the world
        </p>
        
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-6">
        <Input
              placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
              className="text-xl py-6 font-semibold text-center border border-[var(--accent-color)]/20 focus-visible:ring-[var(--accent-color)]"
        />
      </div>

          {/* Cover Image */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon className="h-4 w-4 text-[var(--accent-color)]" />
              <Label>Cover Image URL</Label>
            </div>
            <Input
              placeholder="Enter cover image URL"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="border border-[var(--accent-color)]/20 focus-visible:ring-[var(--accent-color)]"
            />
            {coverImage && (
              <div className="mt-2 aspect-video rounded-md overflow-hidden border border-[var(--accent-color)]/20">
                <img 
                  src={coverImage} 
                  alt="Cover Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/placeholder.jpg";
                    setCoverImage("/images/placeholder.jpg");
                  }}
                />
              </div>
            )}
      </div>

          {/* Tags */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <ListOrdered className="h-4 w-4 text-[var(--accent-color)]" />
              <Label>Tags</Label>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag (e.g., React, Tutorial)"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 border border-[var(--accent-color)]/20 focus-visible:ring-[var(--accent-color)]"
              />
              <Button 
                type="button" 
                onClick={addTag}
                className="bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
              >
                Add
              </Button>
      </div>

            {/* Tags display */}
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <div 
              key={tag}
                  className="rounded-full bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 px-3 py-1 text-sm flex items-center gap-1"
                >
                  <span className="text-[var(--accent-color-text)]">{tag}</span>
                  <button 
                    type="button" 
                    onClick={() => removeTag(tag)}
                    className="text-gray-500 hover:text-red-500 ml-1 focus:outline-none"
                  >
                    &times;
                  </button>
                </div>
          ))}
        </div>
      </div>

          {/* Excerpt */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Quote className="h-4 w-4 text-[var(--accent-color)]" />
              <Label>Excerpt (optional)</Label>
            </div>
            <textarea
              placeholder="Brief summary of your blog post (if left empty, first few lines will be used)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              ref={excerptRef}
              className="w-full min-h-[80px] px-3 py-2 rounded-md border border-[var(--accent-color)]/20 bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2 resize-none"
            />
          </div>
          
          {/* Live Preview Toggle */}
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="live-preview"
              checked={isLivePreview}
              onCheckedChange={setIsLivePreview}
              className="data-[state=checked]:bg-[var(--accent-color)]"
            />
            <Label htmlFor="live-preview">Live Preview</Label>
          </div>
          
          {/* Editor Controls */}
          <div className="bg-muted rounded-t-md p-2 flex flex-wrap gap-1 border border-[var(--accent-color)]/20 border-b-0">
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleBold}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleItalic}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleLink}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <Link className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleH1}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleH2}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleH3}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <Heading3 className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleUnorderedList}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleOrderedList}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleImage}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleCode}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <Code className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleTable}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <Table className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleQuote}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleAlignLeft}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleAlignCenter}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleAlignRight}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleUndo}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={handleRedo}
              className="h-8 px-2 hover:bg-[var(--accent-color)]/10"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Editor Area */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className={`w-full ${isLivePreview ? 'lg:w-1/2' : 'lg:w-full'}`}>
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorChange}
                className="min-h-[400px] p-4 border border-[var(--accent-color)]/20 rounded-b-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] prose prose-sm max-w-none dark:prose-invert"
              ></div>
            </div>
            
            {/* Live Preview */}
            {isLivePreview && (
              <div className="w-full lg:w-1/2">
                <div className="border border-[var(--accent-color)]/20 rounded-b-md p-4 min-h-[400px] prose prose-sm max-w-none dark:prose-invert bg-gray-50 dark:bg-gray-900/50">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              </div>
            )}
      </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <Button 
              type="submit" 
              className="bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish Blog Post"}
      </Button>
          </div>
    </form>
      </div>
    </div>
  );
}

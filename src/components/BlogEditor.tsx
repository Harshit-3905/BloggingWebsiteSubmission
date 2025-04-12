
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Check, Image as ImageIcon } from "lucide-react";
import { type BlogTag } from "@/types/blogTypes";
import { Badge } from "@/components/ui/badge";
import { DragDropImageUpload } from "@/components/DragDropImageUpload";

interface BlogEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialExcerpt?: string;
  initialCoverImage?: string;
  initialTags?: BlogTag[];
  onSave: (data: {
    title: string;
    content: string;
    excerpt: string;
    coverImage: string;
    tags: BlogTag[];
  }) => void;
  isSubmitting?: boolean;
}

const availableTags: BlogTag[] = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "CSS",
  "HTML",
  "DevOps",
  "Python",
  "Career",
];

export function BlogEditor({
  initialTitle = "",
  initialContent = "",
  initialExcerpt = "",
  initialCoverImage = "",
  initialTags = [],
  onSave,
  isSubmitting = false,
}: BlogEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [coverImage, setCoverImage] = useState(initialCoverImage);
  const [selectedTags, setSelectedTags] = useState<BlogTag[]>(initialTags);
  const [activeTab, setActiveTab] = useState<string>("write");

  const handleTagToggle = (tag: BlogTag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      content,
      excerpt,
      coverImage,
      tags: selectedTags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cover-image">Cover Image</Label>
        <DragDropImageUpload
          onImageSelected={setCoverImage}
          currentImage={coverImage}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="A short summary of your blog"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleTagToggle(tag)}
            >
              {selectedTags.includes(tag) && (
                <Check className="mr-1 h-3 w-3" />
              )}
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Tabs
          defaultValue="write"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write" className="mt-2">
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content in Markdown"
              className="min-h-[300px] font-code"
              required
            />
          </TabsContent>
          <TabsContent value="preview" className="mt-2">
            <div className="border rounded-md p-4 min-h-[300px] prose max-w-none">
              {content ? (
                <MarkdownRenderer content={content} />
              ) : (
                <p className="text-muted-foreground">
                  Your preview will appear here...
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving..." : "Save Blog"}
      </Button>
    </form>
  );
}

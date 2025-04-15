import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogEditor from "@/components/BlogEditor";
import { useBlogStore } from "@/store/useBlogStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/hooks/use-toast";

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [excerpt, setExcerpt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addBlog } = useBlogStore();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSaveBlog = (blogData: {
    title: string;
    content: string;
    coverImage: string;
    tags: string[];
    excerpt: string;
  }) => {
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Generate slug from title
      const slug = blogData.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
      
      addBlog({
        author: {
          id: user!.id,
          name: user!.name,
          avatar: user!.avatar,
          bio: user!.bio,
        },
        title: blogData.title,
        slug,
        content: blogData.content,
        excerpt: blogData.excerpt || blogData.content.substring(0, 150) + "...",
        coverImage: blogData.coverImage,
        tags: blogData.tags,
      });
      
      toast({
        title: "Blog published!",
        description: "Your blog has been successfully published.",
      });
      
      navigate(`/blog/${slug}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-custom py-8">      
      <BlogEditor 
        initialTitle={title}
        initialContent={content}
        initialCoverImage={coverImage}
        initialTags={tags}
        initialExcerpt={excerpt}
        onSave={handleSaveBlog}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

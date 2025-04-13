
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  BlogEditor  from "@/components/BlogEditor";
import { useBlogStore } from "@/store/useBlogStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/hooks/use-toast";
import { BlogTag } from "@/types/blogTypes";

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState<BlogTag[]>([]);
  const { addBlog } = useBlogStore();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !coverImage || tags.length === 0) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate slug from title
    const slug = title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    
    addBlog({
      author: {
        id: user!.id,
        name: user!.name,
        avatar: user!.avatar,
        bio: user!.bio,
      },
      title,
      slug,
      content,
      excerpt: content.substring(0, 150) + "...",
      coverImage,
      tags,
    });
    
    toast({
      title: "Blog published!",
      description: "Your blog has been successfully published.",
    });
    
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>
      
      <BlogEditor 
        initialTitle={title}
        initialContent={content}
        initialCoverImage={coverImage}
        initialTags={tags}
        onSave={({ title: newTitle, content: newContent, coverImage: newCoverImage, tags: newTags }) => {
          setTitle(newTitle);
          setContent(newContent);
          setCoverImage(newCoverImage);
          setTags(newTags);
          handleSubmit({} as React.FormEvent);
        }}
        isSubmitting={false}
      />
    </div>
  );
}

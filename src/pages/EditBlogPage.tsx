import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogEditor from "@/components/BlogEditor";
import { useBlogStore } from "@/store/useBlogStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/hooks/use-toast";

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const { blogs, updateBlog } = useBlogStore();
  const { user, isLoggedIn } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Find the blog by id
  const blog = blogs.find((b) => b.id === id);
  
  // Redirect if not logged in or blog not found
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    
    if (!blog) {
      navigate("/blogs");
      toast({
        title: "Blog not found",
        description: "The blog you're trying to edit doesn't exist.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if user is the author
    if (user?.id !== blog.author.id) {
      navigate(`/blog/${blog.slug}`);
      toast({
        title: "Unauthorized",
        description: "You don't have permission to edit this blog.",
        variant: "destructive",
      });
      return;
    }
  }, [isLoggedIn, blog, user, navigate, toast]);

  if (!blog) return null;

  const handleUpdateBlog = (blogData: {
    title: string;
    content: string;
    excerpt: string;
    coverImage: string;
    tags: string[];
  }) => {
    setIsSubmitting(true);
    
    try {
      updateBlog(blog.id, blogData);
      
      toast({
        title: "Blog updated!",
        description: "Your blog has been successfully updated.",
      });
      
      // Redirect to the updated blog page
      navigate(`/blog/${blogData.title ? blogData.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-') : blog.slug}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-custom py-8">
      <BlogEditor 
        initialTitle={blog.title}
        initialContent={blog.content}
        initialExcerpt={blog.excerpt}
        initialCoverImage={blog.coverImage}
        initialTags={blog.tags}
        onSave={handleUpdateBlog} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}

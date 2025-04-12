import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Bookmark, MessageSquare, Share2, Edit, Calendar, Eye, ArrowLeft } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { useBlogStore } from "@/store/useBlogStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blogs, toggleBookmark, likeBlog, addComment, incrementView } = useBlogStore();
  const { user, isLoggedIn } = useAuthStore();
  const { toast } = useToast();
  const [commentText, setCommentText] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Track if we have loaded the blog completely
  const [blogLoaded, setBlogLoaded] = useState(false);

  // Find the blog by slug
  const blog = blogs.find((b) => b.slug === slug);
  
  // Get related blogs (same tags)
  const relatedBlogs = blog 
    ? blogs
        .filter((b) => b.id !== blog.id && b.tags.some(tag => blog.tags.includes(tag)))
        .slice(0, 3)
    : [];

  // Safe view increment that won't cause infinite loops
  useEffect(() => {
    // Only run once when component mounts and blog is available
    if (blog && !blogLoaded) {
      // Mark as loaded first to prevent re-entry
      setBlogLoaded(true);
      
      // Use setTimeout to break the render cycle
      setTimeout(() => {
        incrementView(blog.id);
      }, 0);
    }
  }, [blog, blogLoaded]);

  useEffect(() => {
    if (!blog) return;
    
    // Track scroll progress
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog]);

  if (!blog) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog not found</h1>
        <p className="text-muted-foreground mb-6">
          The blog you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/blogs">Browse all blogs</Link>
        </Button>
      </div>
    );
  }

  const handleLike = () => {
    likeBlog(blog.id);
    toast({
      title: "Blog liked!",
      description: "Thank you for your appreciation.",
    });
  };

  const handleBookmark = () => {
    toggleBookmark(blog.id);
    toast({
      title: blog.bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: blog.bookmarked 
        ? "The blog has been removed from your bookmarks."
        : "The blog has been added to your bookmarks for later reading.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Blog link has been copied to clipboard.",
    });
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please login to comment on this blog.",
        variant: "destructive",
      });
      return;
    }
    
    if (!commentText.trim()) {
      toast({
        title: "Empty comment",
        description: "Please write something before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    addComment(blog.id, {
      userId: user!.id,
      userName: user!.name,
      userAvatar: user!.avatar,
      content: commentText,
    });
    
    setCommentText("");
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully.",
    });
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-14 left-0 right-0 z-50">
        <Progress value={scrollProgress} className="h-1 rounded-none" />
      </div>
      
      {/* Back Button */}
      <div className="container-custom py-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/blogs')}
          className="flex items-center gap-1 hover:gap-2 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to blogs</span>
        </Button>
      </div>
      
      {/* Blog Header */}
      <div className="relative">
        <div className="aspect-[3/1] relative overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        
        <div className="container-custom relative -mt-24 mb-8">
          <motion.div 
            className="bg-background border rounded-lg shadow-lg p-6 md:p-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className={blog.tags.indexOf(tag) % 2 === 0 ? "bg-primary/10 hover:bg-primary/20 text-primary" : ""}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                  <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{blog.author.name}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{blog.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleLike}
                    className="rounded-full"
                  >
                    <Heart
                      className={`h-4 w-4 ${blog.likes > 0 ? "fill-primary text-primary" : ""}`}
                    />
                    <span className="sr-only">Like</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleBookmark}
                    className="rounded-full"
                  >
                    <Bookmark
                      className={`h-4 w-4 ${blog.bookmarked ? "fill-primary text-primary" : ""}`}
                    />
                    <span className="sr-only">Bookmark</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleShare}
                    className="rounded-full"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </motion.div>
                {isLoggedIn && user?.id === blog.author.id && (
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigate(`/edit-blog/${blog.id}`)}
                      className="rounded-full"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="container-custom mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatedSection className="lg:col-span-2" delay={0.1}>
            <div className="bg-background rounded-lg border p-6 md:p-8 shadow-sm">
              <div className="prose prose-lg max-w-none">
                {blog?.content && <MarkdownRenderer content={blog.content} />}
              </div>
            </div>
            
            {/* Author Bio */}
            <div className="mt-8 bg-muted/30 border rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                  <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">About {blog.author.name}</h3>
                  <p className="text-muted-foreground">{blog.author.bio}</p>
                </div>
              </div>
            </div>
            
            {/* Comments Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5" />
                Comments ({blog.comments.length})
              </h3>
              
              <form onSubmit={handleSubmitComment} className="mb-6">
                <Textarea
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="mb-2"
                />
                <Button type="submit" disabled={!isLoggedIn}>
                  {isLoggedIn ? "Post Comment" : "Login to Comment"}
                </Button>
              </form>
              
              {blog.comments.length > 0 ? (
                <div className="space-y-4">
                  {blog.comments.map((comment, index) => (
                    <motion.div 
                      key={comment.id} 
                      className="border rounded-lg p-4 hover:border-primary/20 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={comment.userAvatar}
                            alt={comment.userName}
                          />
                          <AvatarFallback>
                            {comment.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{comment.userName}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p>{comment.content}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </AnimatedSection>
          
          {/* Sidebar */}
          <AnimatedSection direction="left" delay={0.3}>
            <div className="space-y-8">
              {/* Blog Stats */}
              <div className="bg-muted/30 border rounded-lg p-6 hover:border-primary/20 transition-colors">
                <h3 className="text-lg font-medium mb-4">Blog Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Views</span>
                    <span className="font-medium">{blog.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Likes</span>
                    <span className="font-medium">{blog.likes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Comments</span>
                    <span className="font-medium">{blog.comments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Published</span>
                    <span className="font-medium">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Related Blogs */}
              {relatedBlogs.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedBlogs.map((relatedBlog) => (
                      <BlogCard key={relatedBlog.id} blog={relatedBlog} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}

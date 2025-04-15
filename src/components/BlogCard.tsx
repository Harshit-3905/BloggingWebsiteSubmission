import { Bookmark, Heart, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogStore } from "@/store/useBlogStore";
import { type Blog } from "@/types/blogTypes";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useState, memo } from "react";

interface BlogCardProps {
  blog: Blog;
  index?: number;
}

function BlogCardComponent({ blog, index = 0 }: BlogCardProps) {
  const { toggleBookmark, likeBlog } = useBlogStore();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(blog.likes > 0);
  const [isBookmarked, setIsBookmarked] = useState(blog.bookmarked);

  // Get main category for the category badge
  const mainCategory = blog.tags[0] || "General";
  
  // Calculate read time (1 min per 200 words)
  const readTimeMinutes = Math.max(1, Math.ceil(blog.content.split(/\s+/).length / 200));
  
  // Get difficulty level based on content length
  const getDifficulty = () => {
    const contentLength = blog.content.length;
    if (contentLength > 5000) return "Advanced";
    if (contentLength > 2000) return "Medium";
    return "Easy";
  };
  
  const difficulty = getDifficulty();

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = !isBookmarked;
    setIsBookmarked(newStatus);
    toggleBookmark(blog.id);
    
    toast({
      title: newStatus ? "Added to bookmarks" : "Removed from bookmarks",
      description: newStatus 
        ? "The blog has been added to your bookmarks for later reading."
        : "The blog has been removed from your bookmarks.",
      className: "bg-card border-[var(--accent-color)] shadow-lg"
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = !isLiked;
    setIsLiked(newStatus);
    
    // Update in store
    if (newStatus) {
      likeBlog(blog.id);
    }
    
    toast({
      title: newStatus ? "Blog liked!" : "Like removed",
      description: newStatus ? "Thank you for your appreciation." : "You've removed your like from this blog.",
      className: "bg-card border-[var(--accent-color)] shadow-lg"
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1.0]
      }
    }),
    hover: {
      y: -5,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };
  
  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
  };

  // Generate tag color based on tag name
  const getTagColor = (tag: string) => {
    return "bg-[var(--accent-color)]/10 text-[var(--accent-color-text)] border-[var(--accent-color)]/20";
  };
  
  // Animated underline variants
  const underlineVariants = {
    hidden: { 
      width: "0%",
      opacity: 0
    },
    hover: { 
      width: "100%", 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut" 
      } 
    }
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className="blog-card relative overflow-hidden rounded-xl bg-white shadow-md dark:bg-card border border-[var(--accent-color)]/10 hover:border-[var(--accent-color)]/30 transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[6px] after:bg-[var(--accent-color)] after:w-full after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
    >
      <div className="relative">
        <Link to={`/blog/${blog.slug}`} className="block">
          <div className="relative aspect-video overflow-hidden">
            <motion.img
              src={blog.coverImage}
              alt={blog.title}
              className="h-full w-full object-cover"
              variants={imageVariants}
            />
            
            {/* Category Badge */}
            <div className="absolute left-3 top-3 z-10">
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700`}>
                {mainCategory}
              </span>
            </div>
            
            {/* Favorite Button */}
            <motion.div 
              className="absolute right-3 top-3 z-10"
              variants={buttonVariants}
            >
              <button
                onClick={handleLike}
                className="rounded-full bg-white p-2 shadow-md transition hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <Heart 
                  className={`h-4 w-4 ${isLiked ? "fill-red-600 text-red-600" : "text-gray-400"}`} 
                />
              </button>
            </motion.div>
            
          </div>
        </Link>
      </div>
      
      <div className="px-4 pt-4 pb-1">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {blog.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs border ${getTagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title */}
        <Link to={`/blog/${blog.slug}`}>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white hover:text-[var(--accent-color-text)] transition-colors line-clamp-1">
            {blog.title}
          </h3>
        </Link>
        
        {/* Excerpt */}
        <p className="mb-4 text-sm text-gray-600 line-clamp-2 dark:text-gray-300">
          {blog.excerpt}
        </p>
      </div>
      
      {/* Footer */}
      <div className="border-t border-[var(--accent-color)]/10 dark:border-[var(--accent-color)]/20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Reading time */}
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="mr-1 h-4 w-4" /> 
            <span>{readTimeMinutes} minutes</span>
          </div>
          
          {/* Difficulty */}
          <div className="flex items-center text-gray-500 text-sm">
            <span className="inline-block w-2 h-2 rounded-full mr-1.5 bg-[var(--accent-color)]"></span>
            <span>{difficulty}</span>
          </div>
        </div>
        
        {/* Bookmark button */}
        <motion.div variants={buttonVariants}>
          <button
            onClick={handleBookmark}
            className="text-gray-400 hover:text-[var(--accent-color-text)]"
          >
            <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-[var(--accent-color)] text-[var(--accent-color)]" : ""}`} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const BlogCard = memo(BlogCardComponent, (prevProps, nextProps) => {
  // Only re-render when the blog content changes, not when global state changes
  return prevProps.blog.id === nextProps.blog.id && 
         prevProps.blog.bookmarked === nextProps.blog.bookmarked &&
         prevProps.blog.likes === nextProps.blog.likes;
});
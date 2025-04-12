
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogStore } from "@/store/useBlogStore";
import { type Blog } from "@/types/blogTypes";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface BlogCardProps {
  blog: Blog;
  index?: number;
}

export function BlogCard({ blog, index = 0 }: BlogCardProps) {
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
      className: "bg-card border-primary shadow-lg"
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
      className: "bg-card border-primary shadow-lg"
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

  // Get color for category badge
  const getCategoryColor = (category: string) => {
    const categoryMap: Record<string, string> = {
      "React": "bg-blue-100 text-blue-800",
      "JavaScript": "bg-yellow-100 text-yellow-800",
      "TypeScript": "bg-blue-100 text-blue-800",
      "CSS": "bg-pink-100 text-pink-800",
      "HTML": "bg-orange-100 text-orange-800",
      "Python": "bg-green-100 text-green-800",
      "Design": "bg-purple-100 text-purple-800",
      "Tutorial": "bg-green-100 text-green-800",
      "Career": "bg-indigo-100 text-indigo-800",
      "Opinion": "bg-red-100 text-red-800",
      "News": "bg-cyan-100 text-cyan-800"
    };
    
    return categoryMap[category] || "bg-gray-100 text-gray-800";
  };
  
  // Generate tag color based on tag name
  const getTagColor = (tag: string) => {
    const tagMap: Record<string, string> = {
      "React": "bg-blue-50 text-blue-700 border-blue-200",
      "JavaScript": "bg-yellow-50 text-yellow-700 border-yellow-200",
      "TypeScript": "bg-blue-50 text-blue-700 border-blue-200",
      "CSS": "bg-pink-50 text-pink-700 border-pink-200",
      "HTML": "bg-orange-50 text-orange-700 border-orange-200",
      "Tutorial": "bg-green-50 text-green-700 border-green-200",
      "Guide": "bg-purple-50 text-purple-700 border-purple-200",
      "Opinion": "bg-red-50 text-red-700 border-red-200",
      "News": "bg-sky-50 text-sky-700 border-sky-200",
      "API": "bg-indigo-50 text-indigo-700 border-indigo-200",
      "Performance": "bg-amber-50 text-amber-700 border-amber-200"
    };
    
    return tagMap[tag] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className="blog-card overflow-hidden rounded-xl bg-white shadow-md dark:bg-card border border-gray-100 dark:border-gray-800"
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
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(mainCategory)}`}>
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
                  className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`} 
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
          
          <span className="inline-block rounded-full px-2.5 py-0.5 text-xs bg-gray-50 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
            Quick
          </span>
        </div>
        
        {/* Title */}
        <Link to={`/blog/${blog.slug}`}>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            {blog.title}
          </h3>
        </Link>
        
        {/* Excerpt */}
        <p className="mb-4 text-sm text-gray-600 line-clamp-2 dark:text-gray-300">
          {blog.excerpt}
        </p>
      </div>
      
      {/* Footer */}
      <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Reading time */}
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="mr-1 h-4 w-4" /> 
            <span>{readTimeMinutes} minutes</span>
          </div>
          
          {/* Difficulty */}
          <div className="flex items-center text-gray-500 text-sm">
            <span className="inline-block w-2 h-2 rounded-full mr-1.5 bg-blue-500"></span>
            <span>{difficulty}</span>
          </div>
        </div>
        
        {/* Bookmark button */}
        <motion.div variants={buttonVariants}>
          <button
            onClick={handleBookmark}
            className="text-gray-400 hover:text-primary"
          >
            <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-orange-500 text-orange-500" : ""}`} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

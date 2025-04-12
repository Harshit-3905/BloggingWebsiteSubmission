
import { useEffect, useState } from "react";
import { useBlogStore } from "@/store/useBlogStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { BlogCard } from "@/components/BlogCard";
import { Bookmark, BookmarkPlus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function BookmarksPage() {
  const { blogs, bookmarkedBlogs, toggleBookmark } = useBlogStore();
  const { isLoggedIn, user } = useAuthStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedBlogsList, setBookmarkedBlogsList] = useState(
    blogs.filter((blog) => blog.bookmarked || bookmarkedBlogs.includes(blog.id))
  );
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Add some demo bookmarks for better UX if there are none
  useEffect(() => {
    if (isLoggedIn && bookmarkedBlogs.length === 0 && blogs.length > 0) {
      // Add first two blogs as demo bookmarks
      const demoBookmarkIds = [blogs[0].id, blogs[1].id].filter(id => !bookmarkedBlogs.includes(id));
      demoBookmarkIds.forEach(id => toggleBookmark(id));
    }
  }, [isLoggedIn, blogs, bookmarkedBlogs, toggleBookmark]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Update bookmarked blogs when the store changes
  useEffect(() => {
    const filteredBlogs = blogs.filter((blog) => blog.bookmarked || bookmarkedBlogs.includes(blog.id));
    setBookmarkedBlogsList(filteredBlogs);
    
    // Extract all unique tags from bookmarked blogs
    const tags = Array.from(new Set(filteredBlogs.flatMap(blog => blog.tags)));
    setAllTags(tags);
  }, [blogs, bookmarkedBlogs]);

  // Filter bookmarked blogs based on search and tags
  const filteredBookmarks = bookmarkedBlogsList.filter(blog => {
    const matchesSearch = searchTerm === "" || 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => blog.tags.includes(tag as any));
    
    return matchesSearch && matchesTags;
  });

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="container-custom py-8 md:py-12">
      <AnimatedSection>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Bookmark className="h-6 w-6 text-primary" />
            Your Bookmarks
          </h1>
          <p className="text-muted-foreground">
            Access your saved blogs for later reading.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="md:w-auto w-full gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {allTags.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Filter by Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTagSelect(tag)}
                  className={selectedTags.includes(tag) ? "bg-primary text-white" : ""}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        )}
      </AnimatedSection>

      {filteredBookmarks.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredBookmarks.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <AnimatedSection>
          <div className="text-center py-16 bg-muted/30 rounded-lg border animate-fade-in">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BookmarkPlus className="h-12 w-12 mx-auto mb-4 text-primary/70" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">No bookmarks yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              You haven't bookmarked any blogs yet. Browse through our collection
              and save your favorites for later reading.
            </p>
            <Button
              onClick={() => navigate("/blogs")}
              className="inline-flex items-center justify-center gap-2"
            >
              <BookmarkPlus className="h-4 w-4" />
              Explore Blogs
            </Button>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}

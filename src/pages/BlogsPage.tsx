import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { BlogCard } from "@/components/BlogCard";
import { TagFilter } from "@/components/TagFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBlogStore } from "@/store/useBlogStore";
import { Search, Filter, Loader2, RefreshCw } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// Featured tags that should be prioritized (matching the ones in TagFilter)
const FEATURED_TAGS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue",
  "Next.js",
  "Node.js",
  "CSS",
  "HTML",
  "Python",
  "Frontend",
  "Backend"
];

export default function BlogsPage() {
  const { blogs, initializeStore } = useBlogStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const observerTarget = useRef(null);

  // Initialize store with additional blogs if not already done
  useEffect(() => {
    if (blogs.length <= 3) {
      initializeStore();
    }
  }, [blogs.length, initializeStore]);

  // Memoize filtered blogs to prevent unnecessary recalculations
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(term) ||
        blog.excerpt.toLowerCase().includes(term) ||
        blog.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Filter by selected tags (blog must have ALL selected tags)
    if (selectedTags.length > 0) {
      filtered = filtered.filter(blog => 
        selectedTags.every(tag => blog.tags.includes(tag))
      );
    }
    
    return filtered;
  }, [blogs, searchTerm, selectedTags]);

  // Reset visible blogs when filters change
  useEffect(() => {
    setVisibleBlogs(6);
  }, [searchTerm, selectedTags]);

  // Toggle tag selection
  const handleTagSelect = useCallback((tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedTags([]);
    setSearchTerm("");
  }, []);

  // Load more blogs with a simulated delay for UX
  const loadMoreBlogs = useCallback(() => {
    if (visibleBlogs < filteredBlogs.length && !isLoading) {
      setIsLoading(true);
      
      // Simulate network delay
      setTimeout(() => {
        setVisibleBlogs((prev) => Math.min(prev + 6, filteredBlogs.length));
        setIsLoading(false);
      }, 800);
    }
  }, [filteredBlogs.length, visibleBlogs, isLoading]);

  // Setup intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreBlogs();
        }
      },
      { threshold: 0.1 }
    );
    
    const currentObserverTarget = observerTarget.current;
    
    if (currentObserverTarget) {
      observer.observe(currentObserverTarget);
    }
    
    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget);
      }
    };
  }, [loadMoreBlogs]);

  const handleRefresh = useCallback(() => {
    initializeStore();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [initializeStore]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Memoize the visible blogs slice to prevent unnecessary re-renders
  const visibleBlogsList = useMemo(() => {
    return filteredBlogs.slice(0, visibleBlogs);
  }, [filteredBlogs, visibleBlogs]);

  return (
    <div className="container-custom py-8 md:py-12">
      <AnimatedSection>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Explore Blogs</h1>
          <p className="text-muted-foreground">
            Discover the latest articles, tutorials, and insights from our community of developers.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden gap-2">
                  <Filter className="h-4 w-4" />
                  Filter {selectedTags.length > 0 && `(${selectedTags.length})`}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Blogs</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium">Categories</h3>
                    {selectedTags.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters}
                        className="text-xs h-7 px-2"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {FEATURED_TAGS.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          FEATURED_TAGS.includes(tag) && !selectedTags.includes(tag) 
                            ? "border-[var(--accent-color)]/30 text-[var(--accent-color-text)]" 
                            : ""
                        } ${selectedTags.includes(tag) ? "border border-white/20" : "border"}`}
                        onClick={() => handleTagSelect(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleRefresh}
                disabled={isLoading}
                className="gap-2 bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </motion.div>
            
            {(selectedTags.length > 0 || searchTerm) && (
              <Button 
                variant="ghost" 
                size="default" 
                onClick={clearFilters}
                className="gap-2 bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="hidden md:block">
          <TagFilter
            tags={FEATURED_TAGS}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />
        </div>
        
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="text-sm text-muted-foreground mr-1 flex items-center">
              <Filter className="h-3.5 w-3.5 mr-1" /> Active filters:
            </div>
            {selectedTags.map(tag => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="pl-2 pr-1 py-1 flex items-center gap-1 border border-[var(--accent-color)]/20"
              >
                {tag}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 ml-1 rounded-full" 
                  onClick={() => handleTagSelect(tag)}
                >
                  ✕
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </AnimatedSection>

      {filteredBlogs.length > 0 ? (
        <>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {visibleBlogsList.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
          
          {visibleBlogs < filteredBlogs.length && (
            <div ref={observerTarget} className="h-24 flex items-center justify-center my-4">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-sm font-medium">Loading more blogs...</span>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <motion.div
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ 
                      y: [0, -8, 0],
                      opacity: [0.5, 1, 0.5]
                     }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      delay: 0
                     }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ 
                      y: [0, -8, 0],
                      opacity: [0.5, 1, 0.5]
                     }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      delay: 0.2
                     }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ 
                      y: [0, -8, 0],
                      opacity: [0.5, 1, 0.5]
                     }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      delay: 0.4
                     }}
                  />
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <AnimatedSection delay={0.3}>
          <div className="text-center py-12 border rounded-lg bg-background">
            <h3 className="text-xl font-medium mb-2">No blogs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="mt-2 bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
            >
              Clear All Filters
            </Button>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}

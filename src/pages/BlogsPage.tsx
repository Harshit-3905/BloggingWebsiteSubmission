
import { useState, useEffect, useRef, useCallback } from "react";
import { BlogCard } from "@/components/BlogCard";
import { TagFilter } from "@/components/TagFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBlogStore } from "@/store/useBlogStore";
import type { BlogTag } from "@/types/blogTypes";
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

export default function BlogsPage() {
  const { blogs, initializeStore } = useBlogStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<BlogTag[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
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

  // Extract all unique tags from blogs
  const allTags = Array.from(
    new Set(blogs.flatMap((blog) => blog.tags))
  ) as BlogTag[];

  // Handle tag filtering from URL params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tagParam = queryParams.get("tag");
    
    if (tagParam && allTags.includes(tagParam as BlogTag)) {
      setSelectedTags([tagParam as BlogTag]);
    }
  }, [location.search, allTags]);

  // Filter blogs based on search and tags
  useEffect(() => {
    let result = blogs;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term) ||
          blog.excerpt.toLowerCase().includes(term) ||
          blog.author.name.toLowerCase().includes(term) ||
          blog.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      result = result.filter((blog) =>
        selectedTags.every((tag) => blog.tags.includes(tag))
      );
    }
    
    setFilteredBlogs(result);
    setVisibleBlogs(6); // Reset visible blogs when filters change
  }, [blogs, searchTerm, selectedTags]);

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

  const handleTagSelect = (tag: BlogTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleRefresh = () => {
    initializeStore();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const staggerContainer = {
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
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filter Blogs</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <Button
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTagSelect(tag)}
                      >
                        {tag}
                      </Button>
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
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="hidden md:block">
          <TagFilter
            tags={allTags}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />
        </div>
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
              {filteredBlogs.slice(0, visibleBlogs).map((blog, index) => (
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
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}

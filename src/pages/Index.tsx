import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, Code, Terminal, GitBranch, Globe, BookOpen, Users, Database, Server, Shield, Search } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useBlogStore } from "@/store/useBlogStore";
import { BlogCard } from "@/components/BlogCard";
import { Card } from "@/components/ui/card";
import { AnimatedCodeBlock } from "@/components/AnimatedCodeBlock";
import { TechStackSection } from "@/components/home/TechStackSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TrendingTopicsSection } from "@/components/home/TrendingTopicsSection";

const Index = () => {
  const { isLoggedIn } = useAuthStore();
  const { blogs, initializeStore } = useBlogStore();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  useEffect(() => {
    // Initialize store with additional blogs if not already done
    if (blogs.length <= 3) {
      initializeStore();
    }
  }, [blogs.length, initializeStore]);

  const featuredBlogs = blogs.slice(0, 3);
  
  // Custom features with icons
  const features = [
    {
      icon: <Code className="h-6 w-6 text-white" />,
      title: "Rich Code Snippets",
      description: "Share and highlight code with syntax highlighting for over 50 languages."
    },
    {
      icon: <Terminal className="h-6 w-6 text-white" />,
      title: "Developer Focused",
      description: "Content tailored for programmers, from beginners to seasoned experts."
    },
    {
      icon: <GitBranch className="h-6 w-6 text-white" />,
      title: "Version Control Tips",
      description: "Learn advanced Git techniques and workflows to improve your productivity."
    },
    {
      icon: <Globe className="h-6 w-6 text-white" />,
      title: "Web Technologies",
      description: "Stay updated with the latest frontend and backend frameworks and libraries."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      title: "Comprehensive Guides",
      description: "In-depth tutorials that take you from concept to deployment."
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Community Driven",
      description: "Learn from experienced developers sharing real-world knowledge."
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Tailwind for light/dark mode adaptation */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center overflow-hidden
                   dark:bg-black dark:text-white light:bg-gray-50 light:text-gray-900"
        style={{ opacity, scale }}
      >
        {/* Background overlay with different styles for light/dark mode */}
        <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black/70 dark:to-black/50 
                        light:bg-gradient-to-br light:from-white/70 light:to-white/50"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/patterns/circuit-board.svg')] bg-repeat opacity-10"></div>
          
          {/* Animated orbs */}
          <motion.div 
            className="absolute h-32 w-32 rounded-full bg-[var(--accent-color)]/30 filter blur-xl"
            style={{ top: '15%', left: '10%' }}
            animate={{ 
              y: [0, 40, 0],
              x: [0, 20, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute h-40 w-40 rounded-full bg-secondary/20 filter blur-xl"
            style={{ top: '25%', right: '15%' }}
            animate={{ 
              y: [0, -50, 0],
              x: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute h-36 w-36 rounded-full bg-primary/20 filter blur-xl"
            style={{ bottom: '20%', left: '25%' }}
            animate={{ 
              y: [0, 30, 0],
              x: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 9,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Code particles with dynamic color based on theme */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute font-code text-xs dark:text-white/10 light:text-black/10"
              initial={{ 
                x: Math.random() * 100 - 50 + '%', 
                y: Math.random() * 100 + '%',
                opacity: 0 
              }}
              animate={{ 
                y: [null, '-100%'],
                opacity: [0, 0.7, 0]
              }}
              transition={{ 
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            >
              {['<>', '/>', '{}', '()', '[]', '&&', '||', '=>', '+=', '*='][i % 10]}
            </motion.div>
          ))}
        </div>
        
        <div className="container-custom relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[70vh]">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span className="px-4 py-1 dark:bg-white/10 dark:text-white/90 light:bg-black/10 light:text-black/90 
                               rounded-full text-sm font-medium backdrop-blur-sm mb-4 inline-block">
                For Developers, By Developers
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight 
                           dark:text-white light:text-gray-900">
              Where <span className="font-code bg-clip-text text-transparent bg-gradient-to-r 
                                    from-[var(--accent-color)] to-[var(--accent-color)]/80">Code</span> 
              Meets <span className="font-code bg-clip-text text-transparent bg-gradient-to-r 
                                    from-[var(--accent-color)]/80 to-[var(--accent-color)]">Community</span>
            </h1>
            <p className="text-lg md:text-xl dark:text-white/90 light:text-gray-800 leading-relaxed max-w-xl">
              A space for developers to share insights, discover solutions, and connect with a community that speaks your language.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-6">
              {!isLoggedIn ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild size="lg" 
                      className="gap-2 bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/90 
                                 font-medium min-w-[160px] text-white">
                      <Link to="/signup">
                        Get Started 
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild size="lg" variant="outline" 
                      className="gap-2 dark:text-white dark:border-white/30 
                                 light:text-gray-900 light:border-gray-900/30 
                                 dark:hover:bg-white dark:hover:text-black
                                 light:hover:bg-[var(--accent-color)] light:hover:text-white
                                 min-w-[160px]">
                      <Link to="/blogs">
                        Browse Blogs
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild size="lg" className="gap-2 bg-primary hover:bg-primary/90 font-medium min-w-[160px] text-white hover:text-white">
                      <Link to="/blogs">
                        Explore Blogs
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild size="lg" variant="outline" className="gap-2 dark:text-white dark:border-white/30 light:text-black light:border-black/30 dark:hover:bg-white/10 light:hover:bg-black/10 min-w-[160px]">
                      <Link to="/new-blog">
                        Write a Post
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Right side content */}
          <motion.div 
            className="relative hidden md:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-color)]/20 
                           to-[var(--accent-color)]/30 rounded-full filter blur-3xl opacity-30"></div>
            <div className="relative z-10">
              <AnimatedCodeBlock />
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: "loop" 
          }}
        >
          <div className="w-10 h-14 rounded-full dark:border-2 dark:border-white/30 
                         light:border-2 light:border-gray-900/30 flex justify-center items-start pt-3 
                         backdrop-blur-sm dark:bg-white/5 light:bg-black/5">
            <motion.div 
              className="w-2 h-2 rounded-full dark:bg-white light:bg-gray-900"
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop" 
              }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container-custom relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Developers Choose Binary Blogs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform is built by developers, for developers, with features designed to make learning and sharing technical knowledge seamless.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.slice(0, 4).map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Card className="h-full border-2 border-primary/10 hover:border-primary/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-background/70">
                    <div className="p-6 h-full flex flex-col relative z-10">
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div 
                          className="rounded-xl w-14 h-14 flex items-center justify-center bg-primary text-primary-foreground mb-4"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full opacity-70" />
                      <div className="absolute top-5 right-5 w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 blur-2xl" />
                    </div>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Featured Blogs Section */}
      <section className="py-24 bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Articles</h2>
                <p className="text-muted-foreground">
                  Hand-picked technical content from our community
                </p>
              </div>
              <motion.div whileHover={{ x: 5 }}>
                <Button asChild variant="ghost" className="gap-2">
                  <Link to="/blogs">
                    View All Articles
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Topics Section */}
      <TrendingTopicsSection />

      {/* New Testimonials Section with glass morphism */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary/30 filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-secondary/30 filter blur-3xl"></div>
        </div>
        <div className="container-custom relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">What Developers Say</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hear from our community members about their experience with Binary Blogs.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Binary Blogs transformed how I share my coding knowledge. The code highlighting is phenomenal!",
                author: "Sarah Chen",
                role: "Senior Frontend Developer",
                avatar: "https://i.pravatar.cc/150?img=32"
              },
              {
                quote: "The best platform I've found for technical writing. Clean interface and great developer community.",
                author: "Michael Rodriguez",
                role: "DevOps Engineer",
                avatar: "https://i.pravatar.cc/150?img=60"
              },
              {
                quote: "I love how Binary Blogs makes complex code concepts accessible through visual learning.",
                author: "Priya Sharma",
                role: "Data Scientist",
                avatar: "https://i.pravatar.cc/150?img=23"
              }
            ].map((testimonial, index) => (
              <AnimatedSection key={testimonial.author} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="glass-morphism rounded-xl overflow-hidden h-full"
                >
                  <div className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
                        </svg>
                      </div>
                      <p className="flex-grow text-lg mb-6 italic">"{testimonial.quote}"</p>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-3">
                          <img className="h-10 w-10 rounded-full" src={testimonial.avatar} alt={testimonial.author} />
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Tools Section - Updated with consistent styling */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background elements for visual appeal */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/30 filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/20 filter blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Powerful Developer Tools</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Interactive tools to enhance your coding workflow and productivity
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Code Playground",
                description: "Test and experiment with code snippets directly in your browser",
                icon: <Code className="h-6 w-6" />,
                comingSoon: false
              },
              {
                title: "AI Code Assistant",
                description: "Get intelligent code suggestions and automatic error detection",
                icon: <Database className="h-6 w-6" />,
                comingSoon: false
              },
              {
                title: "Syntax Visualizer",
                description: "Visualize code execution and data flow to better understand complex algorithms",
                icon: <Globe className="h-6 w-6" />,
                comingSoon: false
              },
              {
                title: "Performance Analyzer",
                description: "Measure and optimize your code's performance with detailed metrics",
                icon: <Server className="h-6 w-6" />,
                comingSoon: true
              },
              {
                title: "Security Scanner",
                description: "Scan your code for potential security vulnerabilities and get fix recommendations",
                icon: <Shield className="h-6 w-6" />,
                comingSoon: true
              },
              {
                title: "API Tester",
                description: "Test API endpoints and visualize responses directly in the browser",
                icon: <Search className="h-6 w-6" />,
                comingSoon: true
              }
            ].map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full border-2 border-primary/10 hover:border-primary/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-card"
                >
                  <div className="p-6 h-full flex flex-col">
                    <motion.div 
                      className="rounded-xl w-14 h-14 flex items-center justify-center bg-primary text-primary-foreground mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      {feature.title}
                      {feature.comingSoon && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Coming Soon</span>
                      )}
                    </h3>
                    <p className="text-muted-foreground flex-grow mb-4">
                      {feature.description}
                    </p>
                    <div className="mt-auto">
                      <Button variant={feature.comingSoon ? "outline" : "default"} size="sm" 
                        className={feature.comingSoon ? "border-primary/20 text-muted-foreground" : ""}>
                        {feature.comingSoon ? "Get Notified" : "Learn More"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 binary-gradient text-white">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Conversation</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              {!isLoggedIn 
                ? "Join thousands of developers who are already sharing and learning on Binary Blogs. It takes only a minute to sign up."
                : "Share your knowledge and insights with our growing community of developers. Start writing today!"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {!isLoggedIn ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild size="lg" variant="secondary" className="gap-2">
                      <Link to="/signup">
                        Join Binary Blogs
                      </Link>
                    </Button>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button asChild size="lg" variant="secondary" className="gap-2">
                    <Link to="/new-blog">
                      Write a Blog
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;

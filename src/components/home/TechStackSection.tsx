import React from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion, useAnimate } from "framer-motion";
import { Database, Globe, Server, Shield, Layers, Code, Terminal, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function TechStackSection() {
  // Enhanced stack section items with consistent styling
  const stackItems = [
    {
      icon: <Database className="h-10 w-10 text-white" />,
      title: "Databases",
      description: "Deep dive into database technologies and optimization techniques",
      gradient: "from-primary-600/90 to-primary-700/90",
      items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Firebase"]
    },
    {
      icon: <Globe className="h-10 w-10 text-white" />,
      title: "Frontend",
      description: "Explore modern frameworks and libraries for building UIs",
      gradient: "from-primary-500/90 to-primary-600/90",
      items: ["React", "Vue", "Angular", "Svelte", "Next.js"]
    },
    {
      icon: <Server className="h-10 w-10 text-white" />,
      title: "Backend",
      description: "Learn server-side development with various languages and frameworks",
      gradient: "from-primary-400/90 to-primary-500/90",
      items: ["Node.js", "Python", "Go", "Rust", "Java"]
    },
    {
      icon: <Shield className="h-10 w-10 text-white" />,
      title: "DevOps",
      description: "Master deployment, infrastructure and continuous integration workflows",
      gradient: "from-primary-500/90 to-primary-600/90",
      items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"]
    },
  ];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Modern abstract patterns in background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" 
          viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#radialGradient)" />
          
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M${20 + i * 10},${10 + i * 5} Q${50 + i * 5},${20 + i * 15} ${80 - i * 5},${30 + i * 10}`}
              stroke="var(--primary)"
              strokeWidth="0.3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1],
                opacity: [0, 0.5, 0] 
              }}
              transition={{ 
                duration: 10 + i * 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: i * 1.5
              }}
            />
          ))}
        </svg>
      </div>
      
      <div className="container-custom relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <Badge variant="outline" className="px-4 py-1.5 mb-4 text-sm font-medium rounded-full border-primary/30 text-primary">
              Tech Ecosystem
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent" 
                style={{ 
                  backgroundImage: `linear-gradient(to right, var(--accent-color), var(--accent-color)/70)` 
                }}>
              Explore Technology Stacks
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Find articles, tutorials, and discussions about your favorite technologies or discover something new.
            </p>
          </div>
        </AnimatedSection>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stackItems.map((stack, index) => (
            <motion.div
              key={stack.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10 h-full bg-card"
            >
              <div className={`p-8 bg-gradient-to-r ${stack.gradient}`}>
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 3, 0, -3, 0]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    {stack.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {stack.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {stack.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-muted-foreground mb-4 font-medium">
                  Popular {stack.title.toLowerCase()} technologies:
                </p>
                
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                    }
                  }}
                >
                  {stack.items.map((item, i) => (
                    <motion.div
                      key={item}
                      variants={itemVariants}
                      className="px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-300 flex items-center gap-1 border border-primary/10 bg-primary/5 text-primary hover:bg-primary/10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="whitespace-nowrap">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-primary/10 text-primary hover:bg-primary/5"
                >
                  Explore {stack.title} Articles
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

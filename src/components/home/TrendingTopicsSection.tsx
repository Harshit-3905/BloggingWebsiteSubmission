
import React from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Users, Code, Terminal, TrendingUp, Zap, Hash } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export function TrendingTopicsSection() {
  // Tech trends with color coding
  const trends = [
    { 
      name: "WebAssembly", 
      posts: "2,543 posts", 
      growth: "+24%",
      color: "bg-gradient-to-r from-purple-500 to-purple-700"
    },
    { 
      name: "Blockchain", 
      posts: "5,129 posts", 
      growth: "+18%",
      color: "bg-gradient-to-r from-blue-500 to-blue-700"
    },
    { 
      name: "MachineLearning", 
      posts: "8,021 posts", 
      growth: "+32%",
      color: "bg-gradient-to-r from-green-500 to-green-700"
    },
    { 
      name: "Serverless", 
      posts: "3,942 posts", 
      growth: "+15%",
      color: "bg-gradient-to-r from-amber-500 to-amber-700"
    },
    { 
      name: "MicroFrontends", 
      posts: "1,837 posts", 
      growth: "+11%",
      color: "bg-gradient-to-r from-red-500 to-red-700"
    },
  ];

  // Community features with icons and descriptions
  const communityFeatures = [
    {
      icon: <Users className="h-5 w-5" />,
      title: "Community Forum",
      description: "Ask questions and get answers from experts",
      color: "bg-indigo-100 text-indigo-900 dark:bg-indigo-900/30 dark:text-indigo-300",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Code Reviews",
      description: "Get feedback on your code from senior developers",
      color: "bg-cyan-100 text-cyan-900 dark:bg-cyan-900/30 dark:text-cyan-300",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: <Terminal className="h-5 w-5" />,
      title: "Tech Discussions",
      description: "Debate about best practices and latest technologies",
      color: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-300",
      gradient: "from-emerald-500 to-green-600"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background/80 to-muted/30">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <Badge variant="outline" className="px-4 py-1 mb-4 text-sm font-medium rounded-full border-primary text-primary">
              What's Hot
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Trending Topics</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Stay updated with what's buzzing in the developer community right now
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2 bg-card rounded-xl border shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="p-6 bg-gradient-to-r from-primary/90 to-primary/70 text-white">
              <div className="flex items-center gap-3 mb-1">
                <TrendingUp className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Hot Conversations</h2>
              </div>
              <p className="text-white/80">Topics gaining traction in our community</p>
            </div>
            
            <motion.div 
              className="p-6 divide-y divide-border"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {trends.map((trend, index) => (
                <motion.div 
                  key={trend.name}
                  className="py-4 flex items-center justify-between group cursor-pointer"
                  variants={cardVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-lg ${trend.color} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                      <Hash className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        #{trend.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{trend.posts}</span>
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-0 text-xs">
                          {trend.growth}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="ghost" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="mr-1">Follow</span>
                    <Zap className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            className="bg-card rounded-xl border shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="p-6 bg-gradient-to-r from-secondary/90 to-secondary/70 text-white">
              <h2 className="text-2xl font-bold mb-1">Join the Conversation</h2>
              <p className="text-white/80">Connect with fellow developers</p>
            </div>
            
            <div className="p-6">
              <motion.div
                className="space-y-5"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {communityFeatures.map((feature, index) => (
                  <motion.div 
                    key={feature.title}
                    className={`p-4 rounded-lg ${feature.color} flex items-start gap-4 cursor-pointer`}
                    variants={cardVariants}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white flex-shrink-0`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm opacity-80">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/90 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <Link to="/signup">
                    Join Binary Blogs
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

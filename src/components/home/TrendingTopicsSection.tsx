import React, { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users,
  Code,
  Terminal,
  TrendingUp,
  Zap,
  Hash,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { containerClass, gradientTextClass } from "@/utils/tailwindClasses";
import { useAuthStore } from "@/store/useAuthStore";

export function TrendingTopicsSection() {
  const { isLoggedIn } = useAuthStore();
  const [followedTopics, setFollowedTopics] = useState<string[]>([]);

  const toggleFollow = (topicName: string) => {
    setFollowedTopics((prev) =>
      prev.includes(topicName)
        ? prev.filter((topic) => topic !== topicName)
        : [...prev, topicName]
    );
  };

  // Tech trends with color coding
  const trends = [
    {
      name: "WebAssembly",
      posts: "2,543 posts",
      growth: "+24%",
      color:
        "bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color-bright)]",
    },
    {
      name: "Blockchain",
      posts: "5,129 posts",
      growth: "+18%",
      color:
        "bg-gradient-to-r from-[var(--accent-color-bright)] to-[var(--accent-color)]",
    },
    {
      name: "MachineLearning",
      posts: "8,021 posts",
      growth: "+32%",
      color:
        "bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color-bright)]",
    },
    {
      name: "Serverless",
      posts: "3,942 posts",
      growth: "+15%",
      color:
        "bg-gradient-to-r from-[var(--accent-color-bright)] to-[var(--accent-color)]",
    },
    {
      name: "MicroFrontends",
      posts: "1,837 posts",
      growth: "+11%",
      color:
        "bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color-bright)]",
    },
  ];

  // Community features with icons and descriptions
  const communityFeatures = [
    {
      icon: <Users className="h-5 w-5" />,
      title: "Community Forum",
      description: "Ask questions and get answers from experts",
      color:
        "bg-[var(--accent-color)]/10 text-[var(--accent-color-text)] dark:bg-[var(--accent-color)]/20 dark:text-[var(--accent-color-bright)]",
      gradient: "from-[var(--accent-color)] to-[var(--accent-color-bright)]",
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Code Reviews",
      description: "Get feedback on your code from senior developers",
      color:
        "bg-[var(--accent-color)]/10 text-[var(--accent-color-text)] dark:bg-[var(--accent-color)]/20 dark:text-[var(--accent-color-bright)]",
      gradient: "from-[var(--accent-color-bright)] to-[var(--accent-color)]",
    },
    {
      icon: <Terminal className="h-5 w-5" />,
      title: "Tech Discussions",
      description: "Debate about best practices and latest technologies",
      color:
        "bg-[var(--accent-color)]/10 text-[var(--accent-color-text)] dark:bg-[var(--accent-color)]/20 dark:text-[var(--accent-color-bright)]",
      gradient: "from-[var(--accent-color)] to-[var(--accent-color-bright)]",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background/80 to-muted/30">
      <div className={containerClass}>
        <AnimatedSection>
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="px-4 py-1 mb-4 text-sm font-medium rounded-full border-[var(--accent-color)] text-[var(--accent-color-text)]"
            >
              What's Hot
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color-bright)]">
                Trending Topics
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Stay updated with what's buzzing in the developer community right
              now
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
            <div className="p-6 bg-gradient-to-r from-[var(--accent-color)]/90 to-[var(--accent-color-bright)]/70 text-white">
              <div className="flex items-center gap-3 mb-1">
                <TrendingUp className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Hot Conversations</h2>
              </div>
              <p className="text-white/80">
                Topics gaining traction in our community
              </p>
            </div>

            <motion.div
              className="p-4 sm:p-6 divide-y divide-border"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {trends.map((trend, index) => (
                <motion.div
                  key={trend.name}
                  className="py-4 flex justify-between items-center group"
                  variants={cardVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg ${trend.color} flex items-center justify-center text-white font-bold text-lg shadow-md`}
                    >
                      <Hash className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg group-hover:text-[var(--accent-color-text)] transition-colors truncate">
                        #{trend.name}
                      </h3>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                          {trend.posts}
                        </span>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-0 text-xs"
                        >
                          {trend.growth}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="secondary"
                    className={`rounded-full transition-all duration-300 text-xs sm:text-sm ${
                      followedTopics.includes(trend.name)
                        ? "bg-[var(--accent-color)] text-white opacity-100"
                        : "hover:bg-[var(--accent-color)]"
                    }`}
                    onClick={() => toggleFollow(trend.name)}
                  >
                    {followedTopics.includes(trend.name) ? (
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="flex items-center"
                      >
                        <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                        <span>Following</span>
                      </motion.div>
                    ) : (
                      <span className="flex items-center">
                        <span className="mr-1">Follow</span>
                        <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </span>
                    )}
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
            <div className="p-6 bg-gradient-to-r from-[var(--accent-color-bright)]/90 to-[var(--accent-color)]/70 text-white">
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
                    className={`p-4 rounded-lg ${feature.color} flex items-start gap-4`}
                    variants={cardVariants}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <div
                      className={`h-10 w-10 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white flex-shrink-0`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm opacity-80">
                        {feature.description}
                      </p>
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
                <Button
                  asChild
                  className="w-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
                >
                  {isLoggedIn ? (
                    <Link to="/blogs">Explore Conversations</Link>
                  ) : (
                    <Link to="/signup">Join Binary Blogs</Link>
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Users, Lightbulb, Headphones } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      number: "10k+",
      label: "Active Developers",
      icon: <Users className="h-6 w-6" />,
      color: "from-purple-500 to-indigo-600",
    },
    {
      number: "5k+",
      label: "Technical Articles",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "50+",
      label: "Technologies Covered",
      icon: <Lightbulb className="h-6 w-6" />,
      color: "from-amber-400 to-orange-500",
    },
    {
      number: "24/7",
      label: "Developer Support",
      icon: <Headphones className="h-6 w-6" />,
      color: "from-green-400 to-emerald-600",
    },
  ];

  return (
    <section className="py-16 bg-background border-y border-muted">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Our Growing Community
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers who are already part of our thriving
              ecosystem
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Card className="border-2 border-primary/10 overflow-hidden h-full bg-gradient-to-br from-background to-background/80 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center relative">
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 mt-2`}
                      whileHover={{
                        rotate: [0, -5, 5, -5, 0],
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {stat.icon}
                    </motion.div>

                    <motion.div
                      className="text-4xl font-bold mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1 + 0.2,
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.number}
                    </motion.div>

                    <p className="text-muted-foreground font-medium">
                      {stat.label}
                    </p>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-60" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl" />
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

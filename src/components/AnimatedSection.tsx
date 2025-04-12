
import { useRef, ReactNode } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  once?: boolean;
}

export function AnimatedSection({ 
  children, 
  delay = 0.2, 
  direction = "up", 
  className = "",
  once = true
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.2 });
  
  // Define initial and animate positions based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 50 };
      case "down": return { opacity: 0, y: -50 };
      case "left": return { opacity: 0, x: 50 };
      case "right": return { opacity: 0, x: -50 };
      default: return { opacity: 0, y: 50 };
    }
  };
  
  const getAnimatePosition = () => {
    switch (direction) {
      case "up": 
      case "down": 
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      default: return { opacity: 1, y: 0 };
    }
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={getInitialPosition()}
        animate={isInView ? getAnimatePosition() : getInitialPosition()}
        transition={{ 
          duration: 0.7, 
          delay,
          ease: [0.215, 0.61, 0.355, 1.0] // Ease out cubic for smoother animation
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

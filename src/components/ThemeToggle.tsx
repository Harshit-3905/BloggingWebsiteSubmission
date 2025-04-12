
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Export these for use in other components
export const accentColorMap: Record<string, string> = {
  "#8B5CF6": "250 95% 64%", // Purple
  "#3B82F6": "217 91% 60%", // Blue
  "#10B981": "158 64% 52%", // Green
  "#F97316": "24 95% 53%",  // Orange
  "#EC4899": "330 90% 60%", // Pink
};

// Export these for use in other components
export const fontOptions = {
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  code: "'JetBrains Mono', 'Source Code Pro', monospace",
  serif: "'Georgia', 'Cambria', 'Times New Roman', Times, serif",
  mono: "'Fira Code', 'Source Code Pro', monospace"
};

export function ThemeToggle() {
  const { theme, toggleTheme, accentColor, fontFamily } = useThemeStore();
  const { toast } = useToast();

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both theme classes first
    root.classList.remove("light", "dark");
    
    // Then add the current theme
    root.classList.add(theme);

    // Apply font family if set
    if (fontFamily) {
      document.body.style.fontFamily = fontOptions[fontFamily as keyof typeof fontOptions] || fontOptions.code;
      
      // Update code blocks if code font family is changed
      if (fontFamily === 'code' || fontFamily === 'mono') {
        const style = document.createElement('style');
        style.innerHTML = `
          code, pre, .font-code {
            font-family: ${fontOptions[fontFamily as keyof typeof fontOptions]};
          }
        `;
        document.head.appendChild(style);
        
        return () => {
          document.head.removeChild(style);
        };
      }
    }

    // Apply accent color if set
    if (accentColor) {
      try {
        // Update the primary hue in the CSS variables
        if (accentColorMap[accentColor]) {
          document.documentElement.style.setProperty('--primary', accentColorMap[accentColor]);
          
          // Update other related variables
          const isDark = theme === 'dark';
          if (isDark) {
            // In dark mode, we need to adjust the foreground
            document.documentElement.style.setProperty('--primary-foreground', '0 0% 98%');
          } else {
            // In light mode
            document.documentElement.style.setProperty('--primary-foreground', '240 5.9% 10%');
          }
        }
      } catch (error) {
        console.error("Error setting accent color:", error);
      }
    }
  }, [theme, accentColor, fontFamily]);

  const handleToggleTheme = () => {
    toggleTheme();
    // We need to get the NEW theme after toggling
    const newTheme = theme === "light" ? "dark" : "light";
    toast({
      title: `Theme changed to ${newTheme}`,
      description: "Your theme preference has been saved.",
      className: "border-primary"
    });
  };

  const buttonVariants = {
    rotate: { rotate: 360 },
    initial: { rotate: 0 }
  };

  return (
    <motion.div 
      initial="initial"
      variants={buttonVariants}
      transition={{ duration: 0.5 }}
    >
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleToggleTheme} 
        className="rounded-full cursor-pointer"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5 transition-all" />
        ) : (
          <Sun className="h-5 w-5 transition-all" />
        )}
      </Button>
    </motion.div>
  );
}

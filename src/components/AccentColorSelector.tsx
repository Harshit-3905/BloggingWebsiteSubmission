import { useToast } from "@/hooks/use-toast";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function AccentColorSelector() {
  const { accentColor, setColorScheme, getColorSchemes } = useThemeStore();
  const { toast } = useToast();
  const colorSchemes = getColorSchemes();
  const [previewColors, setPreviewColors] = useState({
    accent: accentColor,
    text: 'var(--accent-color-text)',
    bg: 'var(--accent-color-bg)'
  });

  // Update preview colors when accent color changes
  useEffect(() => {
    // Force a re-render of the preview section when accent color changes
    setPreviewColors({
      accent: accentColor,
      text: getComputedStyle(document.documentElement).getPropertyValue('--accent-color-text').trim(),
      bg: getComputedStyle(document.documentElement).getPropertyValue('--accent-color-bg').trim(),
    });
  }, [accentColor]);

  const handleAccentChange = (colorName: string) => {
    setColorScheme(colorName);
    
    // Short delay to allow CSS variables to update before reading them
    setTimeout(() => {
      setPreviewColors({
        accent: accentColor,
        text: getComputedStyle(document.documentElement).getPropertyValue('--accent-color-text').trim(),
        bg: getComputedStyle(document.documentElement).getPropertyValue('--accent-color-bg').trim(),
      });
    }, 50);
    
    toast({
      title: "Accent color updated",
      description: "The application color scheme has been changed.",
      className: "border-primary"
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {colorSchemes.map((scheme) => (
          <motion.div
            key={scheme.value}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAccentChange(scheme.name)}
            className="cursor-pointer"
          >
            <div className="relative">
              <div
                className="h-20 rounded-md mb-2 border shadow-md transition-all hover:shadow-lg flex items-center justify-center"
                style={{ backgroundColor: scheme.value }}
              >
                {/* Color preview with gradient */}
                <div className="absolute inset-0 rounded-md overflow-hidden">
                  <div className="absolute inset-0" style={{ backgroundColor: scheme.value }}></div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 opacity-30"
                    style={{ 
                      background: `linear-gradient(to bottom, transparent, ${scheme.darkModeBg})`
                    }}
                  ></div>
                </div>
                
                {/* Selection indicator */}
                {accentColor === scheme.value && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-white rounded-full p-1 shadow-lg">
                      <Check className="h-5 w-5 text-black" />
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm text-center font-medium">{scheme.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}

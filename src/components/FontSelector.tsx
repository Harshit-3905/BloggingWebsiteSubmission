
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useThemeStore } from "@/store/useThemeStore";
import { fontOptions } from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function FontSelector() {
  const { fontFamily, setFontFamily } = useThemeStore();
  const { toast } = useToast();
  const [selectedFont, setSelectedFont] = useState(fontFamily);

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
    setFontFamily(font);
    toast({
      title: "Font updated",
      description: `The application font has been changed.`,
      className: "border-primary"
    });
  };

  const fonts = [
    { key: "sans", name: "Sans Serif", value: fontOptions.sans },
    { key: "serif", name: "Serif", value: fontOptions.serif },
    { key: "mono", name: "Monospace", value: fontOptions.mono },
    { key: "code", name: "Code", value: fontOptions.code },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fonts.map((font) => (
        <motion.div
          key={font.key}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleFontChange(font.key)}
          className={`cursor-pointer p-4 rounded-lg border-2 transition-all flex items-center justify-between
            ${selectedFont === font.key 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"}`}
        >
          <div>
            <p 
              className="font-medium mb-1"
              style={{ fontFamily: font.value }}
            >
              {font.name}
            </p>
            <p 
              className="text-xs text-muted-foreground"
              style={{ fontFamily: font.value }}
            >
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
          {selectedFont === font.key && (
            <Check className="h-5 w-5 text-primary" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

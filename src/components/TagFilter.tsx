import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Hash } from "lucide-react";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

// Hardcoded important tags with custom styling
const FEATURED_TAGS = [
  {
    name: "JavaScript",
    color: "#F7DF1E",
    bgClass:
      "bg-yellow-500/90 border-yellow-600 hover:bg-yellow-600 text-black",
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    bgClass: "bg-blue-500/90 border-blue-600 hover:bg-blue-600 text-white",
  },
  {
    name: "React",
    color: "#61DAFB",
    bgClass: "bg-cyan-500/90 border-cyan-600 hover:bg-cyan-600 text-black",
  },
  {
    name: "Vue",
    color: "#4FC08D",
    bgClass:
      "bg-emerald-500/90 border-emerald-600 hover:bg-emerald-600 text-white",
  },
  {
    name: "Angular",
    color: "#DD0031",
    bgClass: "bg-red-600/90 border-red-700 hover:bg-red-700 text-white",
  },
  {
    name: "Next.js",
    color: "#000000",
    bgClass: "bg-black border-gray-700 hover:bg-gray-800 text-white",
  },
  {
    name: "Node.js",
    color: "#339933",
    bgClass: "bg-green-600/90 border-green-700 hover:bg-green-700 text-white",
  },
  {
    name: "CSS",
    color: "#1572B6",
    bgClass: "bg-blue-600/90 border-blue-700 hover:bg-blue-700 text-white",
  },
  {
    name: "HTML",
    color: "#E34F26",
    bgClass:
      "bg-orange-500/90 border-orange-600 hover:bg-orange-600 text-white",
  },
  {
    name: "Python",
    color: "#3776AB",
    bgClass: "bg-blue-600/90 border-blue-700 hover:bg-blue-700 text-white",
  },
  {
    name: "Backend",
    color: "#6C3483",
    bgClass:
      "bg-purple-600/90 border-purple-700 hover:bg-purple-700 text-white",
  },
  {
    name: "Frontend",
    color: "#2ECC71",
    bgClass: "bg-green-500/90 border-green-600 hover:bg-green-600 text-white",
  },
  {
    name: "DevOps",
    color: "#E67E22",
    bgClass:
      "bg-orange-500/90 border-orange-600 hover:bg-orange-600 text-white",
  },
  {
    name: "Mobile",
    color: "#3498DB",
    bgClass: "bg-sky-500/90 border-sky-600 hover:bg-sky-600 text-white",
  },
  {
    name: "Web",
    color: "#9B59B6",
    bgClass:
      "bg-purple-500/90 border-purple-600 hover:bg-purple-600 text-white",
  },
];

export function TagFilter({ tags, selectedTags, onTagSelect }: TagFilterProps) {
  // Function to get tag styling
  const getTagStyle = (tag: string) => {
    const featuredTag = FEATURED_TAGS.find((ft) => ft.name === tag);
    return featuredTag
      ? featuredTag.bgClass
      : "bg-[var(--accent-color)]/80 border-[var(--accent-color)] hover:bg-[var(--accent-color)]/90 text-white";
  };

  const isSelected = (tag: string) => selectedTags.includes(tag);

  // Sort tags to prioritize featured tags
  const sortedTags = [...tags].sort((a, b) => {
    const aFeatured = FEATURED_TAGS.some((ft) => ft.name === a);
    const bFeatured = FEATURED_TAGS.some((ft) => ft.name === b);

    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="w-full mb-6 px-1">
      <ScrollArea className="w-full whitespace-nowrap py-2">
        <div className="flex gap-3 py-1 px-1">
          {sortedTags.map((tag) => (
            <motion.div key={tag} whileTap={{ scale: 0.95 }} layout>
              <Badge
                variant="outline"
                className={`
                  cursor-pointer text-xs py-1 px-2 transition-all duration-200
                  ${
                    isSelected(tag)
                      ? getTagStyle(tag) +
                        " shadow-md scale-110 border border-white/20"
                      : "bg-muted/50 hover:bg-muted border border-muted-foreground/20 text-foreground"
                  }
                `}
                onClick={() => onTagSelect(tag)}
              >
                <Hash
                  className={`h-3.5 w-3.5 mr-1 ${
                    isSelected(tag) ? "opacity-90" : "opacity-50"
                  }`}
                />
                {tag}
              </Badge>
            </motion.div>
          ))}
        </div>
        <ScrollBar
          orientation="horizontal"
          className="h-2 bg-muted/30 rounded-full"
        />
      </ScrollArea>
    </div>
  );
}


import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { BlogTag } from "@/types/blogTypes";
import { motion } from "framer-motion";
import { Hash } from "lucide-react";

interface TagFilterProps {
  tags: BlogTag[];
  selectedTags: BlogTag[];
  onTagSelect: (tag: BlogTag) => void;
}

export function TagFilter({ tags, selectedTags, onTagSelect }: TagFilterProps) {
  // Tag colors for visual variety
  const tagColors: Record<string, string> = {
    JavaScript: "bg-yellow-500 border-yellow-600 hover:bg-yellow-600",
    TypeScript: "bg-blue-500 border-blue-600 hover:bg-blue-600",
    React: "bg-cyan-500 border-cyan-600 hover:bg-cyan-600",
    Vue: "bg-green-500 border-green-600 hover:bg-green-600",
    Angular: "bg-red-500 border-red-600 hover:bg-red-600",
    Node: "bg-emerald-500 border-emerald-600 hover:bg-emerald-600",
    "Node.js": "bg-emerald-500 border-emerald-600 hover:bg-emerald-600",
    Express: "bg-gray-500 border-gray-600 hover:bg-gray-600",
    MongoDB: "bg-green-600 border-green-700 hover:bg-green-700",
    SQL: "bg-blue-600 border-blue-700 hover:bg-blue-700",
    "Next.js": "bg-black border-gray-700 hover:bg-gray-800 text-white",
    CSS: "bg-indigo-500 border-indigo-600 hover:bg-indigo-600",
    HTML: "bg-orange-500 border-orange-600 hover:bg-orange-600",
    Python: "bg-blue-600 border-blue-700 hover:bg-blue-700",
    Java: "bg-amber-600 border-amber-700 hover:bg-amber-700",
    "C++": "bg-blue-700 border-blue-800 hover:bg-blue-800",
    PHP: "bg-purple-600 border-purple-700 hover:bg-purple-700",
    Docker: "bg-sky-600 border-sky-700 hover:bg-sky-700",
    AWS: "bg-orange-600 border-orange-700 hover:bg-orange-700",
  };

  // Default color for tags not in the predefined list
  const getTagColor = (tag: string) => {
    return tagColors[tag] || "bg-primary border-primary/80 hover:bg-primary/90";
  };

  const isSelected = (tag: BlogTag) => selectedTags.includes(tag);

  return (
    <div className="w-full mb-6">
      <ScrollArea className="w-full whitespace-nowrap py-2 px-1">
        <div className="flex gap-3 py-1">
          {tags.map((tag) => (
            <motion.div
              key={tag}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <Badge
                variant="outline"
                className={`
                  cursor-pointer text-sm py-1.5 px-3 font-medium transition-all duration-200
                  ${isSelected(tag) 
                    ? getTagColor(tag) + ' text-white shadow-md scale-110' 
                    : 'bg-muted/50 hover:bg-muted border-transparent text-foreground'}
                `}
                onClick={() => onTagSelect(tag)}
              >
                <Hash className={`h-3.5 w-3.5 mr-1 ${isSelected(tag) ? 'opacity-80' : 'opacity-50'}`} />
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

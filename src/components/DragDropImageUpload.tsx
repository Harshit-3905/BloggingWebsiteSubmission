
import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, FileWarning } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DragDropImageUploadProps {
  onImageSelected: (imageUrl: string) => void;
  currentImage?: string;
}

export function DragDropImageUpload({ onImageSelected, currentImage }: DragDropImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(currentImage || "");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Mock file upload - in a real app, you would upload to a server or use a service like Cloudinary
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setPreviewImage(imageUrl);
      onImageSelected(imageUrl);
      
      toast({
        title: "Image selected",
        description: "Your cover image has been successfully selected.",
        className: "border-primary"
      });
    };
    reader.readAsDataURL(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const dragVariants = {
    dragging: {
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.3)",
      transition: { duration: 0.2 }
    },
    idle: {
      scale: 1,
      boxShadow: "0 0 0 0px rgba(139, 92, 246, 0)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="mt-2">
      <AnimatePresence>
        {!previewImage && (
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <motion.div
              variants={dragVariants}
              animate={isDragging ? "dragging" : "idle"}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                flex flex-col items-center justify-center p-10 
                border-2 border-dashed rounded-xl 
                transition-colors duration-300 
                ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileInput}
                className="hidden"
                accept="image/*"
              />
              
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              
              <h3 className="text-lg font-medium mb-2">
                Drag & Drop your image here
              </h3>
              
              <p className="text-muted-foreground text-sm mb-6 text-center max-w-md">
                Upload a high-quality image for your blog cover. 
                Recommended size: 1200×800px. Max size: 2MB.
              </p>
              
              <div className="flex gap-4">
                <Button 
                  onClick={handleBrowseClick}
                  variant="default"
                  className="gap-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  Browse Files
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    onImageSelected("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3882&q=80");
                    setPreviewImage("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3882&q=80");
                  }}
                >
                  Use Demo Image
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {previewImage && (
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mt-4"
          >
            <div className="relative">
              <img 
                src={previewImage}
                alt="Cover preview" 
                className="w-full h-48 object-cover rounded-xl shadow-md"
              />
              <div className="absolute top-0 right-0 p-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setPreviewImage("")}
                >
                  Change Image
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

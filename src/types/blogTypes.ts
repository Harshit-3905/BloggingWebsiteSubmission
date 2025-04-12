export type BlogTag =
  | "React"
  | "JavaScript"
  | "TypeScript"
  | "CSS"
  | "HTML"
  | "Node.js"
  | "Python"
  | "Design"
  | "Database"
  | "API"
  | "Mobile"
  | "DevOps"
  | "Security"
  | "Career"
  | "Tutorial"
  | "Guide"
  | "Opinion"
  | "News"
  | "AWS"
  | "Serverless"
  | "Accessibility"
  | "Performance"
  | "Optimization"
  | "Architecture"
  | "Microservices"
  | "Backend"
  | "AI"
  | "NLP"
  | "Programming"
  | "Web Development"
  | "Frontend"
  | "State Management"
  | "Redux"
  | "Git"
  | "Next.js";

export type Comment = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: number;
};

export type Blog = {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
  };
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: BlogTag[];
  createdAt: number;
  updatedAt: number;
  views: number;
  likes: number;
  bookmarked: boolean;
  comments: Comment[];
};

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
  tags: string[];
  createdAt: number;
  updatedAt: number;
  views: number;
  likes: number;
  bookmarked: boolean;
  comments: Comment[];
};

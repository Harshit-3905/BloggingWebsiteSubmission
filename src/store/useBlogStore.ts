import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { demoBlogs } from "@/data/demoBlogs";
import { Blog, Comment } from "@/types/blogTypes";

export type BlogStore = {
  blogs: Blog[];
  bookmarkedBlogs: string[];
  likedBlogs: string[];
  addBlog: (
    blog: Omit<
      Blog,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "likes"
      | "bookmarked"
      | "comments"
      | "views"
    >
  ) => void;
  updateBlog: (id: string, blog: Partial<Blog>) => void;
  deleteBlog: (id: string) => void;
  toggleBookmark: (id: string) => void;
  likeBlog: (id: string) => void;
  isLikedByUser: (id: string) => boolean;
  addComment: (
    blogId: string,
    comment: Omit<Comment, "id" | "createdAt">
  ) => void;
  incrementView: (id: string) => void;
  getBookmarkedBlogs: () => Blog[];
  getUserBlogs: (userId: string) => Blog[];
  getBlogBySlug: (slug: string) => Blog | undefined;
  initializeStore: () => void;
};

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      blogs: [],
      bookmarkedBlogs: [],
      likedBlogs: [],
      addBlog: (blog) => {
        const now = Date.now();
        const newBlog: Blog = {
          id: uuidv4(),
          ...blog,
          createdAt: now,
          updatedAt: now,
          views: 0,
          likes: 0,
          bookmarked: false,
          comments: [],
        };

        set((state) => ({
          blogs: [newBlog, ...state.blogs],
        }));

        return newBlog;
      },
      updateBlog: (id, updatedFields) => {
        set((state) => ({
          blogs: state.blogs.map((blog) =>
            blog.id === id
              ? { ...blog, ...updatedFields, updatedAt: Date.now() }
              : blog
          ),
        }));
      },
      deleteBlog: (id) => {
        set((state) => ({
          blogs: state.blogs.filter((blog) => blog.id !== id),
        }));
      },
      toggleBookmark: (id) => {
        set((state) => {
          const blogToToggle = state.blogs.find((blog) => blog.id === id);
          const isCurrentlyBookmarked = blogToToggle?.bookmarked || false;

          // Update the blogs array
          const updatedBlogs = state.blogs.map((blog) =>
            blog.id === id ? { ...blog, bookmarked: !blog.bookmarked } : blog
          );

          // Update the bookmarkedBlogs array
          let updatedBookmarks = [...state.bookmarkedBlogs];
          if (isCurrentlyBookmarked) {
            // Remove from bookmarks
            updatedBookmarks = updatedBookmarks.filter(
              (bookmarkId) => bookmarkId !== id
            );
          } else {
            // Add to bookmarks
            updatedBookmarks.push(id);
          }

          return {
            blogs: updatedBlogs,
            bookmarkedBlogs: updatedBookmarks,
          };
        });
      },
      likeBlog: (id) => {
        set((state) => {
          // Check if the blog is already liked by the user
          const isLiked = state.likedBlogs.includes(id);

          // Update likes count - decrease if already liked, increase if not
          const updatedBlogs = state.blogs.map((blog) => {
            if (blog.id === id) {
              return {
                ...blog,
                likes: isLiked ? blog.likes - 1 : blog.likes + 1,
              };
            }
            return blog;
          });

          // Update the likedBlogs array
          let updatedLikedBlogs = [...state.likedBlogs];
          if (isLiked) {
            // Remove from liked blogs
            updatedLikedBlogs = updatedLikedBlogs.filter(
              (blogId) => blogId !== id
            );
          } else {
            // Add to liked blogs
            updatedLikedBlogs.push(id);
          }

          return {
            blogs: updatedBlogs,
            likedBlogs: updatedLikedBlogs,
          };
        });
      },
      isLikedByUser: (id) => {
        const state = get();
        return state.likedBlogs.includes(id);
      },
      addComment: (blogId, comment) => {
        set((state) => ({
          blogs: state.blogs.map((blog) =>
            blog.id === blogId
              ? {
                  ...blog,
                  comments: [
                    ...blog.comments,
                    { ...comment, id: uuidv4(), createdAt: Date.now() },
                  ],
                }
              : blog
          ),
        }));
      },
      incrementView: (id) => {
        set((state) => ({
          blogs: state.blogs.map((blog) =>
            blog.id === id ? { ...blog, views: blog.views + 1 } : blog
          ),
        }));
      },
      getBookmarkedBlogs: () => {
        const state = get();
        return state.blogs.filter((blog) => blog.bookmarked);
      },
      getUserBlogs: (userId) => {
        const state = get();
        return state.blogs.filter((blog) => blog.author.id === userId);
      },
      getBlogBySlug: (slug) => {
        const state = get();
        return state.blogs.find((blog) => blog.slug === slug);
      },
      initializeStore: () => {
        const state = get();
        const now = Date.now();

        // Convert to proper Blog format with proper string[] type
        const transformedBlogs: Blog[] = demoBlogs.map((blog) => {
          // Convert any "author" format comments to the right format
          const comments = Array.isArray(blog.comments)
            ? blog.comments.map((comment) => {
                if (
                  "author" in comment &&
                  typeof comment.author === "object" &&
                  comment.author &&
                  "avatar" in comment.author
                ) {
                  // Fix the type assertion by using type guards
                  const author = comment.author as {
                    id?: string;
                    name?: string;
                    avatar?: string;
                  };

                  return {
                    id: comment.id,
                    userId: author.id as string,
                    userName: author.name as string,
                    userAvatar: author.avatar as string,
                    content: comment.content,
                    createdAt:
                      typeof comment.createdAt === "string"
                        ? new Date(comment.createdAt).getTime()
                        : comment.createdAt || now,
                  };
                }
                return comment;
              })
            : [];

          // Safely handle the type narrowing
          const blogItem = blog as Blog;

          return {
            ...blogItem,
            id: blogItem.id || uuidv4(),
            createdAt:
              typeof blogItem.createdAt === "string"
                ? new Date(blogItem.createdAt).getTime()
                : blogItem.createdAt ||
                  now - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
            updatedAt:
              typeof blogItem.updatedAt === "string"
                ? new Date(blogItem.updatedAt).getTime()
                : blogItem.updatedAt ||
                  now - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000,
            views: blogItem.views || Math.floor(Math.random() * 1000) + 100,
            likes: blogItem.likes || Math.floor(Math.random() * 200) + 10,
            bookmarked: blogItem.bookmarked || false,
            comments: comments,
          };
        });

        set({
          blogs: [...state.blogs, ...transformedBlogs],
        });
      },
    }),
    {
      name: "blog-store", // unique name for localStorage
    }
  )
);

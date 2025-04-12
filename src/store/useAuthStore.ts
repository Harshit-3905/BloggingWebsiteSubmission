import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  joinDate: string;
  role: "user" | "admin";
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

interface AnalyticsData {
  pageViews: {
    total: number;
    today: number;
    weekly: number;
    monthly: number;
  };
  userEngagement: {
    likes: number;
    comments: number;
    shares: number;
    averageTimeOnPage: string;
  };
  blogPerformance: Array<{
    id: string;
    title: string;
    views: number;
    engagement: number;
  }>;
  topReferrers: Array<{
    source: string;
    visits: number;
    conversionRate: number;
  }>;
  demographics: {
    age: Array<{ group: string; percentage: number }>;
    locations: Array<{ country: string; percentage: number }>;
    devices: Array<{ type: string; percentage: number }>;
  };
  growthData: {
    followers: number[];
    subscribers: number[];
    monthlyActiveUsers: number[];
  };
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  analyticsData: AnalyticsData | null;
  login: (email: string, password: string) => void;
  guestLogin: () => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setGuestAnalytics: (data: AnalyticsData) => void;
}

const defaultUser: User = {
  id: "user123",
  name: "John Doe",
  email: "john@example.com",
  avatar:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
  bio: "Full-stack developer passionate about React, TypeScript, and modern web technologies.",
  joinDate: "2023-01-15",
  role: "user",
  socialLinks: {
    twitter: "https://twitter.com/johndoe",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    website: "https://johndoe.dev",
  },
};

const guestUser: User = {
  id: "guest123",
  name: "Guest User",
  email: "guest@example.com",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
  bio: "Welcome to Binary Blogs! As a guest user, you can explore the platform and experience its features.",
  joinDate: new Date().toISOString().split("T")[0],
  role: "user",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      analyticsData: null,
      login: (email: string, password: string) => {
        // In a real app, we would verify credentials
        // For demo purposes, we're just setting a default user
        set({
          isLoggedIn: true,
          user: defaultUser,
        });
        return true;
      },
      guestLogin: () => {
        set({
          isLoggedIn: true,
          user: guestUser,
        });
      },
      logout: () => {
        set({
          isLoggedIn: false,
          user: null,
          analyticsData: null,
        });
      },
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
      setGuestAnalytics: (data) => {
        set({
          analyticsData: data,
        });
      },
    }),
    {
      name: "auth-store",
    }
  )
);

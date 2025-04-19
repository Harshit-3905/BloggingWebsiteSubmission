import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useBlogStore } from "@/store/useBlogStore";
import { useAuthStore } from "@/store/useAuthStore";
import { DashboardCharts } from "@/components/DashboardCharts";
import { BlogCard } from "@/components/BlogCard";
import {
  File,
  Eye,
  BookmarkCheck,
  Heart,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { getUserBlogs, getBookmarkedBlogs } = useBlogStore();
  const { user, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const userBlogs = getUserBlogs(user.id);
  const bookmarkedBlogs = getBookmarkedBlogs();

  // Calculate stats
  const totalBlogs = userBlogs.length;
  const totalViews = userBlogs.reduce((sum, blog) => sum + blog.views, 0);
  const totalLikes = userBlogs.reduce((sum, blog) => sum + blog.likes, 0);
  const totalBookmarks = userBlogs.reduce(
    (sum, blog) => sum + (blog.bookmarked ? 1 : 0),
    0
  );

  const stats = [
    {
      title: "Total Blogs",
      value: totalBlogs,
      icon: <File className="h-5 w-5" />,
      color: "bg-[var(--accent-color)]/10 text-[var(--accent-color)]",
    },
    {
      title: "Total Views",
      value: totalViews,
      icon: <Eye className="h-5 w-5" />,
      color:
        "bg-[var(--accent-color-bright)]/10 text-[var(--accent-color-bright)]",
    },
    {
      title: "Total Likes",
      value: totalLikes,
      icon: <Heart className="h-5 w-5" />,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Bookmarks",
      value: totalBookmarks,
      icon: <BookmarkCheck className="h-5 w-5" />,
      color: "bg-secondary/10 text-secondary",
    },
  ];

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}! Here's an overview of your blog
            performance.
          </p>
        </motion.div>
      </div>

      {/* Analytics Charts */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Blog Analytics</h2>
        </div>

        {/* Always show DashboardCharts - it now handles empty blogs with demo data */}
        <DashboardCharts blogs={userBlogs} />
      </div>

      {/* Recent Blogs */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Recent Blogs</h2>
          {userBlogs.length > 3 && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="gap-1 hover:text-[var(--accent-color)] hover:bg-[var(--accent-color)]/5"
            >
              <Link to="/profile">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        {userBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBlogs.slice(0, 3).map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                You haven't created any blogs yet.
              </p>
              <Button asChild>
                <Link
                  to="/new-blog"
                  className="gap-2 bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
                >
                  Create Your First Blog
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bookmarked Blogs */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Bookmarked Blogs</h2>
          {bookmarkedBlogs.length > 3 && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="gap-1 hover:text-[var(--accent-color)] hover:bg-[var(--accent-color)]/5"
            >
              <Link to="/bookmarks">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        {bookmarkedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedBlogs.slice(0, 3).map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                You don't have any bookmarked blogs yet.
              </p>
              <Button
                asChild
                className="gap-2 bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
              >
                <Link to="/blogs">Browse Blogs</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

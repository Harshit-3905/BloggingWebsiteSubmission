
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBlogStore } from "@/store/useBlogStore";
import { useAuthStore } from "@/store/useAuthStore";
import { DashboardCharts } from "@/components/DashboardCharts";
import { BlogCard } from "@/components/BlogCard";
import { File, Users, Eye, BookmarkCheck, Heart, PenSquare, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { blogs, getUserBlogs, getBookmarkedBlogs } = useBlogStore();
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
  const totalBookmarks = userBlogs.reduce((sum, blog) => sum + (blog.bookmarked ? 1 : 0), 0);
  
  const stats = [
    {
      title: "Total Blogs",
      value: totalBlogs,
      icon: <File className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    },
    {
      title: "Total Views",
      value: totalViews,
      icon: <Eye className="h-5 w-5" />,
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    },
    {
      title: "Total Likes",
      value: totalLikes,
      icon: <Heart className="h-5 w-5" />,
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    },
    {
      title: "Bookmarks",
      value: totalBookmarks,
      icon: <BookmarkCheck className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    }
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
            Welcome back, {user.name}! Here's an overview of your blog performance.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild>
            <Link to="/new-blog" className="flex items-center gap-2">
              <PenSquare className="h-4 w-4" />
              Create New Blog
            </Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`rounded-full p-2 ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Analytics Charts */}
      {userBlogs.length > 0 ? (
        <div className="mb-8">
          <DashboardCharts blogs={userBlogs} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-muted/40 border rounded-lg p-8 text-center mb-8"
        >
          <h3 className="text-xl font-semibold mb-2">No Blog Analytics Yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first blog to see analytics and performance metrics.
          </p>
          <Button asChild>
            <Link to="/new-blog">Create Your First Blog</Link>
          </Button>
        </motion.div>
      )}
      
      {/* Recent Blogs */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Recent Blogs</h2>
          {userBlogs.length > 3 && (
            <Button asChild variant="ghost" size="sm" className="gap-1">
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
              <p className="text-muted-foreground mb-4">You haven't created any blogs yet.</p>
              <Button asChild>
                <Link to="/new-blog">Create Your First Blog</Link>
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
            <Button asChild variant="ghost" size="sm" className="gap-1">
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
              <p className="text-muted-foreground mb-4">You don't have any bookmarked blogs yet.</p>
              <Button asChild>
                <Link to="/blogs">Browse Blogs</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

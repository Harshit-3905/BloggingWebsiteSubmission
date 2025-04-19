import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useBlogStore } from "@/store/useBlogStore";
import { useNavigate, useParams } from "react-router-dom";
import { BlogCard } from "@/components/BlogCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PenLine, User, BookOpen, Heart } from "lucide-react";

export default function ProfilePage() {
  const { id } = useParams();
  const { user, isLoggedIn } = useAuthStore();
  const { blogs } = useBlogStore();
  const navigate = useNavigate();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [profileUser, setProfileUser] = useState(user);
  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    // Check if viewing own profile or another user's
    if (!id && user) {
      setIsCurrentUser(true);
      setProfileUser(user);
    } else if (id && user && id === user.id) {
      setIsCurrentUser(true);
      setProfileUser(user);
    } else if (id) {
      // In a real app, we would fetch the user data
      // For now, just use current user as a placeholder
      setIsCurrentUser(false);
      setProfileUser(user);
    } else if (!isLoggedIn) {
      navigate("/login");
    }
  }, [id, user, isLoggedIn, navigate]);

  useEffect(() => {
    if (profileUser) {
      // Filter blogs by author
      setUserBlogs(blogs.filter((blog) => blog.author.id === profileUser.id));
    }
  }, [blogs, profileUser]);

  if (!profileUser) return null;

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="mb-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-32 w-32 border-4 border-background shadow-md">
            <AvatarImage src={profileUser.avatar} alt={profileUser.name} />
            <AvatarFallback className="text-3xl font-bold">
              {profileUser.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{profileUser.name}</h1>
            <p className="text-muted-foreground mb-4">{profileUser.email}</p>
            <p className="mb-6 max-w-md">
              {profileUser.bio || "No bio available"}
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {isCurrentUser ? (
                <>
                  <Button
                    onClick={() => navigate("/settings")}
                    variant="outline"
                    className="gap-2 hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
                  >
                    <PenLine className="h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button
                    onClick={() => navigate("/new-blog")}
                    className="gap-2 bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
                  >
                    <PenLine className="h-4 w-4" />
                    Write Blog
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="gap-2 bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
                >
                  <User className="h-4 w-4" />
                  Follow
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <Tabs defaultValue="blogs" className="w-full">
          <TabsList className="mb-8 w-full justify-start">
            <TabsTrigger value="blogs" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Blogs
            </TabsTrigger>
            <TabsTrigger value="liked" className="gap-2">
              <Heart className="h-4 w-4" />
              Liked
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blogs">
            {userBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-muted/30 rounded-lg border">
                <PenLine className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-bold mb-2">No blogs yet</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  {isCurrentUser
                    ? "You haven't written any blogs yet. Start writing your first blog now!"
                    : "This user hasn't written any blogs yet."}
                </p>
                {isCurrentUser && (
                  <Button
                    onClick={() => navigate("/new-blog")}
                    className="bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
                  >
                    Write Your First Blog
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="liked">
            <div className="text-center py-16 bg-muted/30 rounded-lg border">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">No liked blogs</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                {isCurrentUser
                  ? "You haven't liked any blogs yet. Explore and start liking blogs you enjoy."
                  : "This user hasn't liked any blogs yet."}
              </p>
              {isCurrentUser && (
                <Button
                  onClick={() => navigate("/blogs")}
                  variant="outline"
                  className="bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
                >
                  Explore Blogs
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

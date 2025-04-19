import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Search,
  PenSquare,
  LogOut,
  User,
  LayoutDashboard,
  BookmarkCheck,
  Settings,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { isLoggedIn, user, logout, guestLogin } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setSheetOpen(false);
    toast({
      title: "Logged out",
      description: "You have successfully logged out.",
    });
  };

  const navigateAndClose = (path: string) => {
    navigate(path);
    setSheetOpen(false);
  };

  const isActive = (path: string) => {
    // For exact matches
    if (location.pathname === path) return true;

    // For paths with query params (like /blogs?tag=React)
    if (path.includes("?") && location.pathname === path.split("?")[0])
      return true;

    return false;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur transition-all duration-200",
        scrolled
          ? "bg-background/95 border-[var(--accent-color)]/10 shadow-sm"
          : "bg-background/80 border-transparent"
      )}
    >
      <div className="container py-3 flex h-14 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="rounded-full w-8 h-8 binary-gradient grid place-items-center text-white font-bold"
              whileHover={{ rotate: 10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              B
            </motion.div>
            <motion.span
              className="font-bold tracking-tight hidden sm:inline-block text-foreground"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Binary Blogs
            </motion.span>
          </Link>

          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/blogs">
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "transition-colors duration-200 border border-transparent",
                      isActive("/blogs")
                        ? "text-[var(--accent-color)] border-[var(--accent-color)]/40 bg-[var(--accent-color)]/5"
                        : "hover:text-[var(--accent-color)] hover:border-[var(--accent-color)]/20 hover:bg-[var(--accent-color)]/5"
                    )}
                  >
                    Blogs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/bookmarks">
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "transition-colors duration-200 border border-transparent",
                      isActive("/bookmarks")
                        ? "text-[var(--accent-color)] border-[var(--accent-color)]/40 bg-[var(--accent-color)]/5"
                        : "hover:text-[var(--accent-color)] hover:border-[var(--accent-color)]/20 hover:bg-[var(--accent-color)]/5"
                    )}
                  >
                    Bookmarks
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-[var(--accent-color)]/20 hover:bg-[var(--accent-color)]/5 hover:text-[var(--accent-color)] hover:border-[var(--accent-color)]/40"
              onClick={() => navigate("/blogs")}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </motion.div>

          <ThemeToggle />

          {isLoggedIn ? (
            <div className="items-center gap-2 hidden md:flex">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Button
                  size="sm"
                  onClick={() => navigate("/new-blog")}
                  className="rounded-full flex bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
                >
                  <PenSquare className="h-4 w-4 mr-2" />
                  New Blog
                </Button>
              </motion.div>

              {/* User Avatar Dropdown - Only visible on md and above screens */}
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full p-0.5 overflow-hidden border-2 border-transparent hover:border-[var(--accent-color)]/40 transition-colors duration-300"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user?.avatar}
                          alt={user?.name || "User"}
                        />
                        <AvatarFallback className="bg-[var(--accent-color)]/20 text-[var(--accent-color)]">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 border-[var(--accent-color)]/20"
                  >
                    <DropdownMenuLabel className="flex items-center gap-2">
                      <span>My Account</span>
                      {user?.role === "admin" && (
                        <Badge
                          variant="outline"
                          className="bg-[var(--accent-color)]/10 text-[var(--accent-color)] border-[var(--accent-color)]/20 text-xs"
                        >
                          Admin
                        </Badge>
                      )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => navigate("/profile")}
                        className="cursor-pointer group relative"
                      >
                        <div className="absolute inset-0 rounded-md group-hover:bg-[var(--accent-color)]/20 transition-colors duration-200"></div>
                        <User className="mr-2 h-4 w-4 relative z-10 group-hover:text-[var(--accent-color)]" />
                        <span className="relative z-10 group-hover:text-[var(--accent-color)]">
                          Profile
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard")}
                        className="cursor-pointer group relative"
                      >
                        <div className="absolute inset-0 rounded-md group-hover:bg-[var(--accent-color)]/20 transition-colors duration-200"></div>
                        <LayoutDashboard className="mr-2 h-4 w-4 relative z-10 group-hover:text-[var(--accent-color)]" />
                        <span className="relative z-10 group-hover:text-[var(--accent-color)]">
                          Dashboard
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/bookmarks")}
                        className="cursor-pointer group relative"
                      >
                        <div className="absolute inset-0 rounded-md group-hover:bg-[var(--accent-color)]/20 transition-colors duration-200"></div>
                        <BookmarkCheck className="mr-2 h-4 w-4 relative z-10 group-hover:text-[var(--accent-color)]" />
                        <span className="relative z-10 group-hover:text-[var(--accent-color)]">
                          Bookmarks
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/settings")}
                        className="cursor-pointer group relative"
                      >
                        <div className="absolute inset-0 rounded-md group-hover:bg-[var(--accent-color)]/20 transition-colors duration-200"></div>
                        <Settings className="mr-2 h-4 w-4 relative z-10 group-hover:text-[var(--accent-color)]" />
                        <span className="relative z-10 group-hover:text-[var(--accent-color)]">
                          Settings
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer group relative"
                    >
                      <div className="absolute inset-0 rounded-md group-hover:bg-red-100 dark:group-hover:bg-red-900/20 transition-colors duration-200"></div>
                      <LogOut className="mr-2 h-4 w-4 relative z-10 group-hover:text-red-500" />
                      <span className="relative z-10 group-hover:text-red-500">
                        Log out
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key="login-buttons"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex gap-2"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/login")}
                    className="hidden sm:inline-flex border-[var(--accent-color)]/20 text-[var(--accent-color-text)] hover:bg-[var(--accent-color)]/5 hover:text-[var(--accent-color)] hover:border-[var(--accent-color)]"
                  >
                    Log In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate("/signup")}
                    className="hidden sm:inline-flex bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-[var(--accent-color)]/5 hover:text-[var(--accent-color)]"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[80vw] sm:w-[350px] border-l-[var(--accent-color)]/20"
            >
              <div className="flex flex-col h-full py-4 gap-6">
                {isLoggedIn && (
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user?.avatar}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback className="bg-[var(--accent-color)]/20 text-[var(--accent-color)]">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.name || "User"}</p>
                      {user?.role === "admin" && (
                        <Badge
                          variant="outline"
                          className="bg-[var(--accent-color)]/10 text-[var(--accent-color)] border-[var(--accent-color)]/20 text-xs"
                        >
                          Admin
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <h2 className="text-lg font-medium mb-4 text-[var(--accent-color)]">
                    Navigation
                  </h2>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => navigateAndClose("/")}
                      className={cn(
                        "py-2 px-3 rounded-md transition-colors text-left",
                        isActive("/")
                          ? "bg-[var(--accent-color)]/10 text-[var(--accent-color)]"
                          : "hover:bg-[var(--accent-color)]/5 hover:text-[var(--accent-color)]"
                      )}
                    >
                      Home
                    </button>
                    <button
                      onClick={() => navigateAndClose("/blogs")}
                      className={cn(
                        "py-2 px-3 rounded-md transition-colors text-left",
                        isActive("/blogs")
                          ? "bg-[var(--accent-color)]/10 text-[var(--accent-color)]"
                          : "hover:bg-[var(--accent-color)]/5 hover:text-[var(--accent-color)]"
                      )}
                    >
                      Blogs
                    </button>
                    <button
                      onClick={() => navigateAndClose("/bookmarks")}
                      className={cn(
                        "py-2 px-3 rounded-md transition-colors text-left flex items-center gap-2",
                        isActive("/bookmarks")
                          ? "bg-[var(--accent-color)]/10 text-[var(--accent-color)]"
                          : "hover:bg-[var(--accent-color)]/5 hover:text-[var(--accent-color)]"
                      )}
                    >
                      Bookmarks
                    </button>
                    {isLoggedIn && (
                      <button
                        onClick={() => navigateAndClose("/new-blog")}
                        className={cn(
                          "py-2 px-3 rounded-md transition-colors text-left flex items-center gap-2",
                          isActive("/new-blog")
                            ? "bg-[var(--accent-color)]/10 text-[var(--accent-color)]"
                            : "hover:bg-[var(--accent-color)]/5 hover:text-[var(--accent-color)]"
                        )}
                      >
                        <PenSquare className="h-4 w-4" /> New Blog
                      </button>
                    )}
                  </div>
                </div>

                {isLoggedIn ? (
                  <div className="space-y-1 mt-auto">
                    <h2 className="text-lg font-medium mb-2 text-[var(--accent-color)]">
                      Account
                    </h2>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => navigateAndClose("/profile")}
                        className="py-2 px-3 rounded-md hover:bg-[var(--accent-color)]/5 hover:text-[var(--accent-color)] flex items-center gap-2 text-left"
                      >
                        <User className="h-4 w-4" /> Profile
                      </button>
                      <button
                        onClick={() => navigateAndClose("/dashboard")}
                        className="py-2 px-3 rounded-md hover:bg-[var(--accent-color)]/5 hover:text-[var(--accent-color)] flex items-center gap-2 text-left"
                      >
                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                      </button>
                      <button
                        onClick={() => navigateAndClose("/settings")}
                        className="py-2 px-3 rounded-md hover:bg-[var(--accent-color)]/5 hover:text-[var(--accent-color)] flex items-center gap-2 text-left"
                      >
                        <Settings className="h-4 w-4" /> Settings
                      </button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800/30 dark:text-red-400 dark:hover:bg-red-950/20"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" /> Log out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 mt-auto">
                    <h2 className="text-lg font-medium mb-2 text-[var(--accent-color)]">
                      Join us
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="w-full border-[var(--accent-color)]/20 hover:bg-[var(--accent-color)]/5 hover:text-[var(--accent-color)] hover:border-[var(--accent-color)]/40"
                        onClick={() => navigateAndClose("/login")}
                      >
                        Log In
                      </Button>
                      <Button
                        className="w-full bg-[var(--accent-color)] hover:bg-[var(--accent-color-bright)]"
                        onClick={() => navigateAndClose("/signup")}
                      >
                        Sign Up
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <Link
        to={props.href || "#"}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
          className
        )}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";

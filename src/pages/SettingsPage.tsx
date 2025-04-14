import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Moon, Sun, Palette, Bell, Shield, User, Database } from "lucide-react";
import { AccentColorSelector } from "@/components/AccentColorSelector";
import { FontSelector } from "@/components/FontSelector";

export default function SettingsPage() {
  const { isLoggedIn, user } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [codeHighlightingEnabled, setCodeHighlightingEnabled] = useState(true);
  const [wysiwygEnabled, setWysiwygEnabled] = useState(true);
  const [profileVisibilityEnabled, setProfileVisibilityEnabled] = useState(true);
  const [newsletterEnabled, setNewsletterEnabled] = useState(false);
  const [commentNotificationsEnabled, setCommentNotificationsEnabled] = useState(true);
  const [mentionNotificationsEnabled, setMentionNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleThemeChange = (theme: "light" | "dark") => {
    setTheme(theme);
    toast({
      title: `Theme changed to ${theme}`,
      description: "Your theme preference has been saved.",
      className: "bg-card border-primary shadow-lg"
    });
  };

  const handleToggleSetting = (
    setter: React.Dispatch<React.SetStateAction<boolean>>, 
    title: string, 
    currentValue: boolean
  ) => {
    setter(!currentValue);
    toast({
      title: `${title} ${!currentValue ? "enabled" : "disabled"}`,
      description: `${title} has been ${!currentValue ? "enabled" : "disabled"} successfully.`,
      className: "bg-card border-primary shadow-lg"
    });
  };

  const MotionButton = motion(Button);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="container max-w-6xl py-8 md:py-12">
      <AnimatedSection>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">
          Manage your account settings and preferences
        </p>
      </AnimatedSection>

      <Tabs defaultValue="appearance" className="space-y-8">
        <AnimatedSection>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden md:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden md:inline">Data</span>
            </TabsTrigger>
          </TabsList>
        </AnimatedSection>

        <TabsContent value="appearance" className="space-y-6">
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>
                  Customize how Binary Blogs appears to you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Theme Mode</h3>
                  <div className="flex flex-col md:flex-row gap-4">
                    <MotionButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      variant={theme === "light" ? "default" : "outline"}
                      className={`flex-1 gap-2 py-6 ${
                        theme === "light" 
                          ? "button-default hover:opacity-90" 
                          : "button-outline hover:bg-transparent"
                      }`}
                      onClick={() => handleThemeChange("light")}
                    >
                      <Sun className="h-5 w-5 mr-2" />
                      Light Mode
                    </MotionButton>
                    <MotionButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      variant={theme === "dark" ? "default" : "outline"}
                      className={`flex-1 gap-2 py-6 ${
                        theme === "dark" 
                          ? "button-default hover:opacity-90" 
                          : "button-outline hover:bg-transparent"
                      }`}
                      onClick={() => handleThemeChange("dark")}
                    >
                      <Moon className="h-5 w-5 mr-2" />
                      Dark Mode
                    </MotionButton>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Accent Color</h3>
                  <AccentColorSelector />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Font Settings</h3>
                  <FontSelector />
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </TabsContent>

        <TabsContent value="account">
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Profile Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={user?.name || ""}
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <input
                        id="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={user?.email || "user@example.com"}
                        readOnly
                      />
                    </div>
                  </div>
                  <Button className="mt-4 bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent">Update Profile</Button>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">Password</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="current-password">Current Password</Label>
                      <input
                        id="current-password"
                        type="password"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="new-password">New Password</Label>
                      <input
                        id="new-password"
                        type="password"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <Button className="mt-4 bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent">Change Password</Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </TabsContent>

        <TabsContent value="notifications">
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about comments and likes via email
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notificationsEnabled}
                      onCheckedChange={() => 
                        handleToggleSetting(
                          setNotificationsEnabled, 
                          "Email notifications", 
                          notificationsEnabled
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="comment-notifications">Comment Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone comments on your blogs
                      </p>
                    </div>
                    <Switch 
                      id="comment-notifications" 
                      checked={commentNotificationsEnabled}
                      onCheckedChange={() => 
                        handleToggleSetting(
                          setCommentNotificationsEnabled, 
                          "Comment notifications", 
                          commentNotificationsEnabled
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mention-notifications">Mention Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone mentions you in a comment
                      </p>
                    </div>
                    <Switch 
                      id="mention-notifications" 
                      checked={mentionNotificationsEnabled}
                      onCheckedChange={() => 
                        handleToggleSetting(
                          setMentionNotificationsEnabled, 
                          "Mention notifications", 
                          mentionNotificationsEnabled
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="newsletter">Newsletter</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive our weekly developer newsletter
                      </p>
                    </div>
                    <Switch 
                      id="newsletter" 
                      checked={newsletterEnabled}
                      onCheckedChange={() => 
                        handleToggleSetting(
                          setNewsletterEnabled,
                          "Newsletter subscription",
                          newsletterEnabled
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </TabsContent>

        <TabsContent value="privacy">
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your privacy and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="profile-visibility">Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible to other users
                      </p>
                    </div>
                    <Switch id="profile-visibility" checked={profileVisibilityEnabled}
                      onCheckedChange={() => 
                        handleToggleSetting(
                          setProfileVisibilityEnabled, 
                          "Profile visibility", 
                          profileVisibilityEnabled
                        )
                      } />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analytics">Usage Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Help us improve by allowing anonymous usage data collection
                      </p>
                    </div>
                    <Switch
                      id="analytics"
                      checked={analyticsEnabled}
                      onCheckedChange={() => 
                        handleToggleSetting(
                          setAnalyticsEnabled, 
                          "Usage analytics", 
                          analyticsEnabled
                        )
                      }
                    />
                  </div>

                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                      Enhance your account security with 2FA
                      </p>
                    </div>
                    <Switch
                      id="two-factor"
                      checked={twoFactorEnabled}
                      onCheckedChange={() => 
                      handleToggleSetting(
                        setTwoFactorEnabled,
                        "Two-factor authentication",
                        twoFactorEnabled
                      )
                      }
                    />
                    </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </TabsContent>

        <TabsContent value="data">
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle>Content Settings</CardTitle>
                <CardDescription>
                  Configure how your content is saved and displayed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-save">Auto-Save Drafts</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically save your blog drafts while writing
                      </p>
                    </div>
                    <Switch
                      id="auto-save"
                      checked={autoSaveEnabled}
                      onCheckedChange={() => 
                        handleToggleSetting(
                          setAutoSaveEnabled, 
                          "Auto-save drafts", 
                          autoSaveEnabled
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="code-highlighting">Code Syntax Highlighting</Label>
                      <p className="text-sm text-muted-foreground">
                        Highlight syntax in code blocks when reading blogs
                      </p>
                    </div>
                    <Switch 
                      id="code-highlighting" 
                      checked={codeHighlightingEnabled}
                      onCheckedChange={() => 
                        handleToggleSetting(
                          setCodeHighlightingEnabled,
                          "Code highlighting",
                          codeHighlightingEnabled
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="wysiwyg">WYSIWYG Editor</Label>
                      <p className="text-sm text-muted-foreground">
                        Use the visual editor when writing blogs
                      </p>
                    </div>
                    <Switch 
                      id="wysiwyg" 
                      checked={wysiwygEnabled}
                      onCheckedChange={() => 
                        handleToggleSetting(
                          setWysiwygEnabled,
                          "WYSIWYG editor",
                          wysiwygEnabled
                        )
                      }
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Storage Usage</h3>
                  <div className="space-y-2">
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Using 25MB of 100MB (25%)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </TabsContent>
      </Tabs>
    </div>
  );
}

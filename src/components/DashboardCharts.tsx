
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Blog } from "@/types/blogTypes";
import { motion } from "framer-motion";

interface DashboardChartsProps {
  blogs: Blog[];
}

export function DashboardCharts({ blogs }: DashboardChartsProps) {
  // Format data for line chart - views over time
  const getRandomViewsData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        views: Math.floor(Math.random() * 100) + 50 // Random views between 50-150
      });
    }
    
    return data;
  };
  
  const viewsData = getRandomViewsData();
  
  // Format data for bar chart - likes per blog
  const likesData = blogs.slice(0, 5).map(blog => ({
    name: blog.title.length > 20 ? blog.title.substring(0, 20) + '...' : blog.title,
    likes: blog.likes
  }));
  
  // Format data for pie chart - engagement breakdown
  const totalViews = blogs.reduce((sum, blog) => sum + blog.views, 0);
  const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  const totalComments = blogs.reduce((sum, blog) => sum + blog.comments.length, 0);
  const totalBookmarks = blogs.filter(blog => blog.bookmarked).length;
  
  const engagementData = [
    { name: 'Views', value: totalViews },
    { name: 'Likes', value: totalLikes },
    { name: 'Comments', value: totalComments },
    { name: 'Bookmarks', value: totalBookmarks }
  ];
  
  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Format data for top performing blogs
  const topBlogs = [...blogs]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map(blog => ({
      id: blog.id,
      title: blog.title,
      views: blog.views,
      likes: blog.likes,
      comments: blog.comments.length
    }));
    
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <motion.div 
        className="col-span-full lg:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
            <CardDescription>
              Daily views for the past 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Engagement Breakdown</CardTitle>
            <CardDescription>
              Distribution of user interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    animationDuration={1000}
                    animationBegin={200}
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {engagementData.map((item, index) => (
                <div key={index} className="flex items-center text-sm">
                  <span 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  {item.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        className="col-span-full md:col-span-2 lg:col-span-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Likes per Blog</CardTitle>
            <CardDescription>
              Showing top 5 blogs by likes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={likesData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }} 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar 
                    dataKey="likes" 
                    fill="hsl(var(--primary))" 
                    animationDuration={1500}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        className="col-span-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Blogs</CardTitle>
            <CardDescription>
              Based on views, likes, and comments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Title</th>
                    <th className="text-right py-3 px-4 font-medium">Views</th>
                    <th className="text-right py-3 px-4 font-medium">Likes</th>
                    <th className="text-right py-3 px-4 font-medium">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {topBlogs.map((blog, index) => (
                    <motion.tr 
                      key={blog.id} 
                      className="border-b last:border-b-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                    >
                      <td className="py-3 px-4 max-w-[300px] truncate">{blog.title}</td>
                      <td className="text-right py-3 px-4">{blog.views}</td>
                      <td className="text-right py-3 px-4">{blog.likes}</td>
                      <td className="text-right py-3 px-4">{blog.comments}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

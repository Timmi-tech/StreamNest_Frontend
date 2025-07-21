"use client";
import { useState } from "react";
import {
  Video,
  Upload,
  TrendingUp,
  Users,
  Eye,
  X,
  Heart,
  Share2,
  DollarSign,
  Play,
  Pause,
  MoreVertical,
  Calendar,
  Clock,
  Search,
  Filter,
  Bell,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Download,
  BarChart3,
  PieChart,
  Activity,
  Star,
  MessageCircle,
  Sparkles,
  Globe,
  Lock,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function CreatorDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data
  const stats = {
    totalViews: 145232,
    totalVideos: 48,
    subscribers: 8924,
    revenue: 2456.78,
    engagement: 8.5,
    watchTime: 12450,
  };

  const recentVideos = [
    {
      id: 1,
      title: "Building a Modern React App with Next.js 14",
      thumbnail: "/api/placeholder/320/180",
      views: 15420,
      likes: 892,
      comments: 156,
      duration: "24:30",
      uploadDate: "2024-01-15",
      status: "published",
      revenue: 124.5,
    },
    {
      id: 2,
      title: "Advanced TypeScript Tips for Better Code",
      thumbnail: "/api/placeholder/320/180",
      views: 8930,
      likes: 445,
      comments: 89,
      duration: "18:45",
      uploadDate: "2024-01-12",
      status: "published",
      revenue: 89.3,
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to Use What",
      thumbnail: "/api/placeholder/320/180",
      views: 12650,
      likes: 678,
      comments: 234,
      duration: "15:20",
      uploadDate: "2024-01-10",
      status: "published",
      revenue: 156.7,
    },
    {
      id: 4,
      title: "Database Design Best Practices",
      thumbnail: "/api/placeholder/320/180",
      views: 0,
      likes: 0,
      comments: 0,
      duration: "22:15",
      uploadDate: "2024-01-16",
      status: "processing",
      revenue: 0,
    },
  ];

  const analytics = {
    viewsData: [
      { period: "Mon", views: 2400 },
      { period: "Tue", views: 1398 },
      { period: "Wed", views: 9800 },
      { period: "Thu", views: 3908 },
      { period: "Fri", views: 4800 },
      { period: "Sat", views: 3800 },
      { period: "Sun", views: 4300 },
    ],
    topCountries: [
      { country: "United States", percentage: 35, views: 50823 },
      { country: "United Kingdom", percentage: 18, views: 26141 },
      { country: "Canada", percentage: 12, views: 17428 },
      { country: "Germany", percentage: 8, views: 11618 },
      { country: "Australia", percentage: 7, views: 10166 },
    ],
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (duration) => {
    return duration;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "processing":
        return "bg-yellow-500";
      case "draft":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-3">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-chart-2 rounded-xl flex items-center justify-center">
                <Video className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold">StreamNest</h1>
                <Badge variant="outline" className="text-xs mt-1">
                  Creator Studio
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-60 lg:w-80"
              />
            </div>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/api/placeholder/32/32" alt="Profile" />
                    <AvatarFallback className="bg-primary text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-chart-2 rounded-xl flex items-center justify-center">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold">StreamNest</h1>
                    <Badge variant="outline" className="text-xs mt-1">
                      Creator Studio
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setSidebarOpen(false)}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Videos
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setSidebarOpen(false)}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setSidebarOpen(false)}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Comments
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setSidebarOpen(false)}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Revenue
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Audience
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 border-r border-border bg-card/30 h-[calc(100vh-73px)]">
          <div className="p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Video className="mr-2 h-4 w-4" />
              Videos
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MessageCircle className="mr-2 h-4 w-4" />
              Comments
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <DollarSign className="mr-2 h-4 w-4" />
              Revenue
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Audience
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Welcome back, John!
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Here's what's happening with your channel
              </p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Upload Video
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Views
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">
                  {formatNumber(stats.totalViews)}
                </div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +12.3% from last week
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscribers
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">
                  {formatNumber(stats.subscribers)}
                </div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +5.2% from last week
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">
                  ${stats.revenue.toFixed(2)}
                </div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +8.1% from last week
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Engagement
                </CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">
                  {stats.engagement}%
                </div>
                <div className="flex items-center text-xs text-red-600">
                  <ArrowDown className="w-3 h-3 mr-1" />
                  -2.1% from last week
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="videos" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="videos" className="text-xs sm:text-sm">
                Recent Videos
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="audience" className="text-xs sm:text-sm">
                Audience
              </TabsTrigger>
            </TabsList>
            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                <h3 className="text-lg font-semibold">Recent Videos</h3>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="grid gap-4">
                {recentVideos.map((video) => (
                  <Card
                    key={video.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full sm:w-24 h-32 sm:h-14 object-cover rounded-lg"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                            {video.duration}
                          </div>
                          <div
                            className={`absolute top-1 left-1 w-2 h-2 rounded-full ${getStatusColor(
                              video.status
                            )}`}
                          ></div>
                        </div>

                        <div className="flex-1 min-w-0 text-center sm:text-left">
                          <h4 className="font-semibold truncate">
                            {video.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Uploaded{" "}
                            {new Date(video.uploadDate).toLocaleDateString()}
                          </p>
                          <div className="flex items-center justify-center sm:justify-start space-x-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {formatNumber(video.views)}
                            </span>
                            <span className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {formatNumber(video.likes)}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {formatNumber(video.comments)}
                            </span>
                          </div>
                        </div>

                        <div className="text-center sm:text-right flex-shrink-0">
                          <div className="text-sm font-medium">
                            ${video.revenue.toFixed(2)}
                          </div>
                          <Badge
                            variant={
                              video.status === "published"
                                ? "default"
                                : "secondary"
                            }
                            className="mt-1"
                          >
                            {video.status}
                          </Badge>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="flex-shrink-0 mx-auto sm:mx-0"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>{" "}
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Views This Week
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analytics.viewsData.map((data, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-muted-foreground">
                            {data.period}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={(data.views / 10000) * 100}
                              className="w-16 sm:w-20 h-2"
                            />
                            <span className="text-sm font-medium">
                              {formatNumber(data.views)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Top Countries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analytics.topCountries.map((country, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">{country.country}</span>
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={country.percentage}
                              className="w-16 sm:w-20 h-2"
                            />
                            <span className="text-sm font-medium">
                              {country.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            {/* Audience Tab */}
            <TabsContent value="audience" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">
                    Audience Growth
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Your subscriber growth over the past 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6 sm:py-8">
                    <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                      {formatNumber(stats.subscribers)}
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Total Subscribers
                    </p>
                    <div className="mt-4 flex items-center justify-center text-sm text-green-600">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      +234 new subscribers this week
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

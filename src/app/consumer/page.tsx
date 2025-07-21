"use client";
import { useState } from "react";
import {
  Video,
  Search,
  Filter,
  Bell,
  Settings,
  LogOut,
  Play,
  Clock,
  Heart,
  Share2,
  BookmarkPlus,
  Bookmark,
  Eye,
  Users,
  TrendingUp,
  Calendar,
  Star,
  MessageCircle,
  ChevronRight,
  MoreVertical,
  Home,
  History,
  Library,
  ThumbsUp,
  Download,
  Sparkles,
  Music,
  Gamepad2,
  Newspaper,
  Lightbulb,
  Tv,
  Monitor,
  Smartphone,
  Flame,
  Trash2,
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
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function ConsumerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [bookmarkedVideos, setBookmarkedVideos] = useState(new Set([1, 3, 5]));

  // Mock data
  const categories = [
    { id: "all", name: "All", icon: Home },
    { id: "trending", name: "Trending", icon: TrendingUp },
    { id: "tech", name: "Technology", icon: Monitor },
    { id: "music", name: "Music", icon: Music },
    { id: "gaming", name: "Gaming", icon: Gamepad2 },
    { id: "news", name: "News", icon: Newspaper },
    { id: "education", name: "Education", icon: Lightbulb },
    { id: "entertainment", name: "Entertainment", icon: Tv },
  ];

  const featuredVideos = [
    {
      id: 1,
      title: "The Future of Web Development in 2024",
      thumbnail: "/api/placeholder/400/225",
      creator: "TechGuru",
      creatorAvatar: "/api/placeholder/40/40",
      views: 125000,
      likes: 8500,
      duration: "22:30",
      uploadDate: "2024-01-15",
      category: "tech",
      verified: true,
    },
    {
      id: 2,
      title: "Epic Gaming Moments Compilation",
      thumbnail: "/api/placeholder/400/225",
      creator: "GameMaster",
      creatorAvatar: "/api/placeholder/40/40",
      views: 89000,
      likes: 5200,
      duration: "15:45",
      uploadDate: "2024-01-14",
      category: "gaming",
      verified: false,
    },
    {
      id: 3,
      title: "Learning React in 30 Minutes",
      thumbnail: "/api/placeholder/400/225",
      creator: "CodeAcademy",
      creatorAvatar: "/api/placeholder/40/40",
      views: 67000,
      likes: 4100,
      duration: "28:12",
      uploadDate: "2024-01-13",
      category: "education",
      verified: true,
    },
  ];

  const recommendedVideos = [
    {
      id: 4,
      title: "10 JavaScript Tips Every Developer Should Know",
      thumbnail: "/api/placeholder/320/180",
      creator: "WebDevPro",
      creatorAvatar: "/api/placeholder/40/40",
      views: 45000,
      likes: 2800,
      duration: "18:30",
      uploadDate: "2024-01-12",
      category: "tech",
    },
    {
      id: 5,
      title: "Best Music Releases This Week",
      thumbnail: "/api/placeholder/320/180",
      creator: "MusicReview",
      creatorAvatar: "/api/placeholder/40/40",
      views: 34000,
      likes: 1900,
      duration: "12:45",
      uploadDate: "2024-01-11",
      category: "music",
    },
    {
      id: 6,
      title: "Breaking: Tech Industry Updates",
      thumbnail: "/api/placeholder/320/180",
      creator: "TechNews",
      creatorAvatar: "/api/placeholder/40/40",
      views: 78000,
      likes: 3400,
      duration: "08:20",
      uploadDate: "2024-01-10",
      category: "news",
    },
    {
      id: 7,
      title: "CSS Grid Complete Guide",
      thumbnail: "/api/placeholder/320/180",
      creator: "DesignMaster",
      creatorAvatar: "/api/placeholder/40/40",
      views: 23000,
      likes: 1600,
      duration: "35:15",
      uploadDate: "2024-01-09",
      category: "education",
    },
    {
      id: 8,
      title: "Gaming Setup Tour 2024",
      thumbnail: "/api/placeholder/320/180",
      creator: "GamerLife",
      creatorAvatar: "/api/placeholder/40/40",
      views: 56000,
      likes: 4200,
      duration: "16:40",
      uploadDate: "2024-01-08",
      category: "gaming",
    },
  ];

  const watchHistory = [
    {
      id: 9,
      title: "Python for Beginners",
      thumbnail: "/api/placeholder/160/90",
      creator: "PythonPro",
      watchedPercentage: 75,
      lastWatched: "2 hours ago",
    },
    {
      id: 10,
      title: "UI/UX Design Principles",
      thumbnail: "/api/placeholder/160/90",
      creator: "DesignGuru",
      watchedPercentage: 100,
      lastWatched: "1 day ago",
    },
    {
      id: 11,
      title: "Database Optimization",
      thumbnail: "/api/placeholder/160/90",
      creator: "DataExpert",
      watchedPercentage: 45,
      lastWatched: "3 days ago",
    },
  ];

  const subscriptions = [
    {
      id: 1,
      name: "TechGuru",
      avatar: "/api/placeholder/40/40",
      subscribers: "2.5M",
      isLive: false,
      verified: true,
    },
    {
      id: 2,
      name: "CodeAcademy",
      avatar: "/api/placeholder/40/40",
      subscribers: "1.8M",
      isLive: true,
      verified: true,
    },
    {
      id: 3,
      name: "GameMaster",
      avatar: "/api/placeholder/40/40",
      subscribers: "965K",
      isLive: false,
      verified: false,
    },
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (duration) => {
    return duration;
  };

  const timeAgo = (date) => {
    const now = new Date();
    const videoDate = new Date(date);
    const diffInHours = Math.floor((now - videoDate) / (1000 * 60 * 60));

    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return `${Math.floor(diffInDays / 7)} weeks ago`;
  };

  const toggleBookmark = (videoId) => {
    setBookmarkedVideos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const VideoCard = ({ video, size = "normal" }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`w-full object-cover rounded-t-lg ${
            size === "large" ? "h-56" : "h-40"
          }`}
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center rounded-t-lg">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src={video.creatorAvatar} alt={video.creator} />
            <AvatarFallback>{video.creator[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
              {video.title}
            </h3>
            <div className="flex items-center space-x-1 mb-2">
              <span className="text-xs text-muted-foreground">
                {video.creator}
              </span>
              {video.verified && (
                <Badge variant="secondary" className="h-4 px-1 text-xs">
                  <Star className="w-3 h-3" />
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{formatNumber(video.views)} views</span>
              <span>•</span>
              <span>{timeAgo(video.uploadDate)}</span>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleBookmark(video.id)}
            >
              {bookmarkedVideos.has(video.id) ? (
                <Bookmark className="w-4 h-4 text-primary" />
              ) : (
                <BookmarkPlus className="w-4 h-4" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  Not interested
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">StreamNest</h1>
                <Badge variant="outline" className="text-xs mt-1">
                  Discover
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search videos, creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
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
                      JS
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
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card/30 h-[calc(100vh-73px)] overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Navigation */}
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trending
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <History className="mr-2 h-4 w-4" />
                History
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Library className="mr-2 h-4 w-4" />
                Library
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Liked Videos
              </Button>
            </div>

            <Separator />

            {/* Subscriptions */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Subscriptions
              </h3>
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 cursor-pointer"
                >
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={sub.avatar} alt={sub.name} />
                      <AvatarFallback>{sub.name[0]}</AvatarFallback>
                    </Avatar>
                    {sub.isLive && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium truncate">
                        {sub.name}
                      </span>
                      {sub.verified && (
                        <Star className="w-3 h-3 text-primary" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {sub.subscribers} subscribers
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={
                        selectedCategory === category.id ? "secondary" : "ghost"
                      }
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Welcome back, John!</h2>
                <p className="text-muted-foreground">
                  Discover amazing content from creators worldwide
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  This Week
                </Button>
              </div>
            </div>

            {/* Featured Videos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {featuredVideos.map((video) => (
                <VideoCard key={video.id} video={video} size="large" />
              ))}
            </div>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="recommended" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="history">Watch History</TabsTrigger>
              <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            </TabsList>

            {/* Recommended Tab */}
            <TabsContent value="recommended" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recommended for You</h3>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommendedVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </TabsContent>

            {/* Trending Tab */}
            <TabsContent value="trending" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center">
                  <Flame className="w-5 h-5 mr-2 text-orange-500" />
                  Trending Now
                </h3>
                <Badge variant="outline" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Updated hourly
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...featuredVideos, ...recommendedVideos.slice(0, 2)].map(
                  (video) => (
                    <VideoCard key={video.id} video={video} />
                  )
                )}
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Watch History</h3>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear History
                </Button>
              </div>

              <div className="space-y-4">
                {watchHistory.map((video) => (
                  <Card
                    key={video.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-32 h-18 object-cover rounded-lg"
                          />
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg">
                            <div
                              className="h-full bg-primary rounded-b-lg"
                              style={{ width: `${video.watchedPercentage}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{video.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {video.creator}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{video.watchedPercentage}% watched</span>
                            <span>•</span>
                            <span>{video.lastWatched}</span>
                          </div>
                        </div>

                        <Button variant="ghost" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Bookmarks Tab */}
            <TabsContent value="bookmarks" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Saved Videos</h3>
                <Badge variant="outline" className="text-xs">
                  {bookmarkedVideos.size} videos
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...featuredVideos, ...recommendedVideos]
                  .filter((video) => bookmarkedVideos.has(video.id))
                  .map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

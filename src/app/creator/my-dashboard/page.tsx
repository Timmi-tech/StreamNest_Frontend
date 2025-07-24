"use client";
import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Video,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Calendar,
  Clock,
  Trash2,
  Edit3,
  MoreVertical,
  Search,
  Grid3X3,
  List,
  Download,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  Zap,
  Info,
  ChevronDown,
  Save,
  ArrowLeft,
} from "lucide-react";
import { UploadVideoComponent } from "@/components/creator/UploadVideoComponent";
import { useRouter } from "next/navigation";
import { LogUserOut } from "@/store/AuthStore";
import { useGetAllVideos } from "@/queries/video.queries";

export default function CreatorDashboard() {
  const [view, setView] = useState("dashboard"); // dashboard, upload
  const [viewMode, setViewMode] = useState("grid"); // grid, list
  const [selectedVideos, setSelectedVideos] = useState(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("all");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  // Upload form state
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    genre: "",
    ageRating: "General",
    videoYear: new Date().getFullYear(),
    tags: [],
    videoFile: null,
  });
  const [newTag, setNewTag] = useState("");
  const [videoPreview, setVideoPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  // Mock user videos data
  const [userVideos, setUserVideos] = useState([
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      title: "Amazing React Tutorial for Beginners",
      description:
        "Learn React from scratch with this comprehensive tutorial. Perfect for beginners who want to get started with modern web development.",
      genre: "Education",
      ageRating: "General",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      videoYear: 2024,
      uploadedAt: "2025-07-23T17:04:16.315Z",
      userId: "user123",
      tags: ["react", "tutorial", "javascript", "webdev"],
      stats: {
        views: 125400,
        likes: 8900,
        comments: 342,
        shares: 156,
      },
    },
    {
      id: "4gb96g75-6828-5673-c4gd-3d074g77dhb8",
      title: "Epic Gaming Montage 2024",
      description:
        "The best gaming moments from this year compiled into one epic montage!",
      genre: "Gaming",
      ageRating: "Teen",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      videoYear: 2024,
      uploadedAt: "2025-07-22T14:22:33.215Z",
      userId: "user123",
      tags: ["gaming", "montage", "epic", "2024"],
      stats: {
        views: 89200,
        likes: 6100,
        comments: 189,
        shares: 94,
      },
    },
    {
      id: "5hc07h86-7939-6784-d5he-4e185h88eic9",
      title: "Cooking Masterclass: Italian Pasta",
      description:
        "Learn to make authentic Italian pasta from a professional chef.",
      genre: "Lifestyle",
      ageRating: "General",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      videoYear: 2024,
      uploadedAt: "2025-07-21T09:15:47.892Z",
      userId: "user123",
      tags: ["cooking", "italian", "pasta", "chef"],
      stats: {
        views: 67300,
        likes: 4200,
        comments: 198,
        shares: 78,
      },
    },
  ]);

  useEffect(() => {});

  const genres = [
    "Technology",
    "Education",
    "Entertainment",
    "Music",
    "Gaming",
    "News",
    "Sports",
    "Lifestyle",
    "Travel",
    "Cooking",
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const handleVideoUpload = (file) => {
    if (file && file.type.startsWith("video/")) {
      setUploadData((prev) => ({ ...prev, videoFile: file }));
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    // API call would go here
    // DELETE /api/videos/{videoPostId}

    setUserVideos((prev) => prev.filter((video) => video.id !== videoId));
    setShowDeleteModal(false);
    setVideoToDelete(null);
  };

  const filteredVideos = userVideos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = filterGenre === "all" || video.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  const totalStats = userVideos.reduce(
    (acc, video) => ({
      views: acc.views + video.stats.views,
      likes: acc.likes + video.stats.likes,
      comments: acc.comments + video.stats.comments,
      shares: acc.shares + video.stats.shares,
    }),
    { views: 0, likes: 0, comments: 0, shares: 0 }
  );

  // log user out
  const handleLogOut = () => {
    LogUserOut();
    console.log("logged out");
    router.push("auth/login");
    // routerServerGlobal.
  };

  if (view === "upload") {
    return <UploadVideoComponent view={view} setView={setView} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center justify-between px-1 py-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="hidden md:flex w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-md font-bold">My Dashboard</h1>
                <p className="hidden text-sm md:flex text-muted-foreground">
                  Manage your content
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setView("upload")}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white px-4 py-2 rounded-full font-medium transition-all"
            >
              <Plus className="w-4 h-4" />
              {/* <span className="hidden ">Upload</span> */}
            </button>
            <button
              onClick={handleLogOut}
              className="text-black p-1 px-4 bg-white hover:bg-white/10 rounded-full border-gradient-to-r border-4 cursor-pointer from-primary to-chart-2 "
            >
              Log out
              {/* <LogOut className="w-6 h-6" /> */}
            </button>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      {/* <div className="px-6 py-6 border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Total Views</span>
            </div>
            <p className="text-2xl font-bold">
              {formatNumber(totalStats.views)}
            </p>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </div>

          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Total Likes</span>
            </div>
            <p className="text-2xl font-bold">
              {formatNumber(totalStats.likes)}
            </p>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </div>

          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <MessageCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Comments</span>
            </div>
            <p className="text-2xl font-bold">
              {formatNumber(totalStats.comments)}
            </p>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </div>

          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Video className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Videos</span>
            </div>
            <p className="text-2xl font-bold">{userVideos.length}</p>
            <p className="text-xs text-muted-foreground">Total uploaded</p>
          </div>
        </div>
      </div> */}

      {/* Controls */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                placeholder="Search your videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "hover:bg-accent"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-white"
                  : "hover:bg-accent"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Videos Grid/List */}
      <div className="p-6">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {userVideos.length === 0 ? "No videos yet" : "No videos found"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {userVideos.length === 0
                ? "Upload your first video to get started"
                : "Try adjusting your search or filters"}
            </p>
            {userVideos.length === 0 && (
              <button
                onClick={() => setView("upload")}
                className="bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Video</span>
              </button>
            )}
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative aspect-video bg-muted">
                      <video
                        src={video.videoUrl}
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="relative">
                          <button className="p-1 bg-black/50 hover:bg-black/70 text-white rounded-full">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>{formatDate(video.uploadedAt)}</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {video.genre}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            {/* <span>{formatNumber(video.stats.views)}</span> */}
                          </span>
                          <span className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            {/* <span>{formatNumber(video.stats.likes)}</span> */}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setVideoToDelete(video);
                            setShowDeleteModal(true);
                          }}
                          className="p-1 hover:bg-red-100 hover:text-red-600 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-card rounded-lg p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative w-32 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <video
                          src={video.videoUrl}
                          className="w-full h-full object-cover"
                          muted
                          preload="metadata"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-6 h-6 text-white opacity-70" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 truncate">
                          {video.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {video.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {video.genre}
                          </span>
                          <span>{formatDate(video.uploadedAt)}</span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{formatNumber(video.stats.views)} views</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{formatNumber(video.stats.likes)} likes</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setVideoToDelete(video);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && videoToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Delete Video</h3>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-sm mb-6">
              Are you sure you want to delete "{videoToDelete.title}"? This will
              permanently remove the video and all its data.
            </p>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setVideoToDelete(null);
                }}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteVideo(videoToDelete.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

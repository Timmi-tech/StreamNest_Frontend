"use client";
import { useState, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  X,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Calendar,
  Clock,
  TrendingUp,
  Sparkles,
  Music,
  Gamepad2,
  BookOpen,
  Newspaper,
  Dumbbell,
  Plane,
  Utensils,
  Zap,
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  ChevronDown,
  Grid3X3,
  List,
  SlidersHorizontal,
  Wifi,
  WifiOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SearchSkeleton from "./SearchSkeleton";
import { useRouter } from "next/navigation";
import { useSearch } from "@/queries/search.queries";
import { useDebounce } from "@/hooks/useDebounce";

// No Results Component
function NoResults({ searchQuery, onClearSearch }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Search className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No results found</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {searchQuery
          ? `We couldn't find any videos matching "${searchQuery}". Try adjusting your search or filters.`
          : "No videos match your current filters. Try broadening your search criteria."}
      </p>
      <div className="space-y-3">
        <Button onClick={onClearSearch} variant="outline">
          <X className="w-4 h-4 mr-2" />
          Clear Search
        </Button>
        <div className="text-sm text-muted-foreground">
          <p>Suggestions:</p>
          <ul className="mt-2 space-y-1">
            <li>• Check your spelling</li>
            <li>• Try different keywords</li>
            <li>• Use fewer filters</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Error Component
function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
        <WifiOff className="w-12 h-12 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Connection Error</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        We're having trouble loading the search results. Please check your
        internet connection and try again.
      </p>
      <div className="space-y-3">
        <Button onClick={onRetry} className="min-w-32">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <AlertTriangle className="w-4 h-4" />
          <span>If the problem persists, contact support</span>
        </div>
      </div>
    </div>
  );
}

export const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay
  const SearchQuery = useSearch(
    {
      query: debouncedSearchQuery,
      genre: selectedGenre === "all" ? "" : selectedGenre,
      year: selectedYear == "all" ? "" : selectedYear,
    },
    {
      enabled:
        searchQuery != "" || selectedGenre != "all" || selectedYear != "all",
    }
  );

  const [isLoading, setIsLoading] = useState(SearchQuery.isPending);
  const [hasError, setHasError] = useState(SearchQuery.isError);

  const router = useRouter();

  const searchInputRef = useRef(null);

  // Mock data for demonstration
  const mockResults = [
    {
      id: "1",
      title: "Amazing React Tutorial for Beginners 🚀",
      description: "Learn React from scratch with this comprehensive tutorial",
      genre: "Technology",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      videoYear: 2024,
      uploadedAt: "2025-07-23T17:04:16.315Z",
      tags: ["react", "tutorial", "javascript", "webdev"],
      user: {
        username: "@techguru_dev",
        displayName: "Tech Guru",
        avatar: "/api/placeholder/40/40",
        verified: true,
      },
      stats: {
        views: 125400,
        likes: 8900,
        comments: 342,
        shares: 156,
      },
    },
    {
      id: "2",
      title: "Epic Gaming Montage 2024 🎮",
      description: "The best gaming moments compiled into one epic video",
      genre: "Gaming",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      videoYear: 2024,
      uploadedAt: "2025-07-22T14:22:33.215Z",
      tags: ["gaming", "montage", "epic", "2024"],
      user: {
        username: "@gamemaster_pro",
        displayName: "GameMaster",
        avatar: "/api/placeholder/40/40",
        verified: false,
      },
      stats: {
        views: 89200,
        likes: 6100,
        comments: 189,
        shares: 94,
      },
    },
    {
      id: "3",
      title: "Cooking Italian Pasta Like a Pro 🍝",
      description: "Master the art of authentic Italian pasta making",
      genre: "Lifestyle",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      videoYear: 2024,
      uploadedAt: "2025-07-21T09:15:47.892Z",
      tags: ["cooking", "italian", "pasta", "chef"],
      user: {
        username: "@chef_mario",
        displayName: "Chef Mario",
        avatar: "/api/placeholder/40/40",
        verified: true,
      },
      stats: {
        views: 67300,
        likes: 4200,
        comments: 198,
        shares: 78,
      },
    },
  ];

  const genres = [
    { value: "all", label: "All Categories", icon: Sparkles },
    { value: "Technology", label: "Technology", icon: Zap },
    { value: "Education", label: "Education", icon: BookOpen },
    { value: "Entertainment", label: "Entertainment", icon: Sparkles },
    { value: "Music", label: "Music", icon: Music },
    { value: "Gaming", label: "Gaming", icon: Gamepad2 },
    { value: "News", label: "News", icon: Newspaper },
    { value: "Sports", label: "Sports", icon: Dumbbell },
    { value: "Lifestyle", label: "Lifestyle", icon: Heart },
    { value: "Travel", label: "Travel", icon: Plane },
    { value: "Cooking", label: "Cooking", icon: Utensils },
  ];

  const years = [
    { value: "all", label: "All Years" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
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

    if (diffDays === 1) return "1d ago";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim() && selectedGenre === "all" && selectedYear === "all") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setIsSearching(true);
    setHasError(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate random error (10% chance)
      //   if (Math.random() < 0.1) {
      //     throw new Error("Network error");
      //   }

      // Filter mock results
      let filteredResults = mockResults.filter((video) => {
        const matchesQuery =
          !query.trim() ||
          video.title.toLowerCase().includes(query.toLowerCase()) ||
          video.description.toLowerCase().includes(query.toLowerCase()) ||
          video.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          );

        const matchesGenre =
          selectedGenre === "all" || video.genre === selectedGenre;
        const matchesYear =
          selectedYear === "all" || video.videoYear.toString() === selectedYear;

        return matchesQuery && matchesGenre && matchesYear;
      });

      setSearchResults(filteredResults);
    } catch (error) {
      setHasError(true);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    handleSearch();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedGenre("all");
    setSelectedYear("all");
    setSearchResults([]);
    setIsSearching(false);
    searchInputRef.current?.focus();
  };

  const hasActiveFilters = selectedGenre !== "all" || selectedYear !== "all";
  const showResults = isSearching && !isLoading;
  const hasResults = SearchQuery && SearchQuery.data?.length > 0;

  //   Debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  //   Filters
  useEffect(() => {
    handleSearch();
  }, [selectedGenre, selectedYear]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container flex items-center gap-4 py-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                ref={searchInputRef}
                placeholder="Search videos, users, sounds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-12 bg-muted/50 border-0 focus-visible:ring-1"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Filter Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <SlidersHorizontal className="h-4 w-4" />
                {hasActiveFilters && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Refine your search results with these filters
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mt-6 px-4">
                {/* Genre Filter */}
                <div className="space-y-6">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={selectedGenre}
                    onValueChange={setSelectedGenre}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => {
                        const Icon = genre.icon;
                        return (
                          <SelectItem key={genre.value} value={genre.value}>
                            <div className="flex items-center">
                              <Icon className="h-4 w-4 mr-2" />
                              {genre.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Year Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Year</label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year.value} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedGenre("all");
                    setSelectedYear("all");
                  }}
                  className="w-full"
                  disabled={!hasActiveFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="border-b bg-muted/30">
          <div className="container py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Filters:</span>
              {selectedGenre !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {genres.find((g) => g.value === selectedGenre)?.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedGenre("all")}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedYear !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedYear}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedYear("all")}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container py-6 p-4">
        {!isSearching && !isLoading ? (
          /* Initial State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Discover Videos</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Search for videos, creators, and content that interests you. Use
              filters to narrow down your results.
            </p>

            {/* Trending Searches */}
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-medium mb-4 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Trending Searches
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "React Tutorial",
                  "Gaming Montage",
                  "Cooking Tips",
                  "Travel Vlog",
                  "Tech Review",
                ].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(term)}
                    className="rounded-full"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : isLoading ? (
          /* Loading State */
          <SearchSkeleton />
        ) : hasError ? (
          /* Error State */
          <ErrorState onRetry={handleRetry} />
        ) : !hasResults ? (
          /* No Results */
          <NoResults searchQuery={searchQuery} onClearSearch={clearSearch} />
        ) : (
          /* Results */
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {searchQuery
                    ? `Results for "${searchQuery}"`
                    : "Search Results"}
                </h2>
                <p className="text-muted-foreground">
                  {searchResults.length} video
                  {searchResults.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="relevant">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevant">Most Relevant</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="views">Most Viewed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Grid */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {SearchQuery &&
                  SearchQuery.data?.map((video) => (
                    <Card
                      key={video.id}
                      className="group overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <video
                          src={video.videoUrl}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          muted
                          poster={
                            video.thumbnailUrl
                              ? video.thumbnailUrl
                              : "/images/defaultThumb.png"
                          }
                          preload="metadata"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-black/50 rounded-full p-3 backdrop-blur-sm">
                              <Play className="h-6 w-6 text-white fill-white" />
                            </div>
                          </div>
                        </div>

                        {/* Stats Overlay */}
                        <div className="absolute bottom-2 left-2 right-2 flex justify-between text-white text-xs">
                          <div className="flex items-center space-x-2">
                            {/* <div className="flex items-center space-x-1 bg-black/50 rounded px-1">
                            <Eye className="h-3 w-3" />
                            <span>{formatNumber(video.stats.views)}</span>
                          </div> */}
                            {/* <div className="flex items-center space-x-1 bg-black/50 rounded px-1">
                            <Heart className="h-3 w-3" />
                            <span>{formatNumber(video.stats.likes)}</span>
                          </div> */}
                          </div>
                          <div className="bg-black/50 rounded px-1">
                            {formatDate(video.uploadedAt)}
                          </div>
                        </div>

                        {/* Genre Badge */}
                        <div className="absolute top-2 right-2">
                          <Badge
                            variant="secondary"
                            className="bg-black/50 text-white border-0 text-xs"
                          >
                            {video.genre}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-3 space-y-2">
                        <h3 className="font-medium text-sm line-clamp-2 leading-tight">
                          {video.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-xs text-white font-medium">
                            {/* {video.user.username[0]} */}
                          </div>
                          <span className="text-xs text-muted-foreground truncate">
                            {/* {video.user.username} */}
                          </span>
                          {/* {video.user.verified && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-[8px]">✓</span>
                          </div>
                        )} */}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {video.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs px-1 py-0"
                            >
                              #{tag}
                            </Badge>
                          ))}
                          {video.tags.length > 2 && (
                            <Badge
                              variant="outline"
                              className="text-xs px-1 py-0"
                            >
                              +{video.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {searchResults.map((video) => (
                  <Card
                    key={video.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex space-x-4">
                        <div className="relative w-32 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <video
                            src={video.videoUrl}
                            className="w-full h-full object-cover"
                            muted
                            preload="metadata"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/50 rounded-full p-2">
                              <Play className="h-4 w-4 text-white fill-white" />
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0 space-y-2">
                          <h3 className="font-semibold line-clamp-2">
                            {video.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {video.description}
                          </p>

                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <div className="w-5 h-5 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-xs text-white font-medium">
                                {video.user.displayName[0]}
                              </div>
                              <span>{video.user.username}</span>
                              {video.user.verified && (
                                <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-[8px]">
                                    ✓
                                  </span>
                                </div>
                              )}
                            </div>

                            <Badge variant="secondary" className="text-xs">
                              {video.genre}
                            </Badge>

                            <span>{formatDate(video.uploadedAt)}</span>
                          </div>

                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>
                                {formatNumber(video.stats.views)} views
                              </span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>
                                {formatNumber(video.stats.likes)} likes
                              </span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="h-3 w-3" />
                              <span>
                                {formatNumber(video.stats.comments)} comments
                              </span>
                            </span>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {video.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs px-1 py-0"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

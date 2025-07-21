"use client";
import { useState, useRef } from "react";
import {
  Upload,
  Video,
  Image,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Users,
  Calendar,
  Clock,
  Tag,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Save,
  Sparkles,
  Zap,
  Settings,
  Info,
  ChevronDown,
  Plus,
  Trash2,
  Monitor,
  Smartphone,
  Tablet,
  Camera,
  Mic,
  Film,
  Edit3,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function VideoUploadPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    visibility: "public",
    comments: true,
    likes: true,
    downloadable: false,
    scheduled: false,
    scheduleDate: "",
    scheduleTime: "",
    language: "en",
    ageRestriction: false,
    monetization: true,
    customThumbnail: false,
  });

  const [newTag, setNewTag] = useState("");

  const categories = [
    { value: "tech", label: "Technology" },
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
    { value: "music", label: "Music" },
    { value: "gaming", label: "Gaming" },
    { value: "news", label: "News" },
    { value: "sports", label: "Sports" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "travel", label: "Travel" },
    { value: "cooking", label: "Cooking" },
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "ru", label: "Russian" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },
    { value: "zh", label: "Chinese" },
  ];

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      setCurrentStep(2);
    }
  };

  const handleThumbnailUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
      setFormData((prev) => ({ ...prev, customThumbnail: true }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handlePublish = async () => {
    setIsUploading(true);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    setIsUploading(false);
    setIsProcessing(true);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setCurrentStep(4);
  };

  const handleSaveDraft = () => {
    console.log("Saving draft...", formData);
    // Handle save draft logic
  };

  const handleSchedule = () => {
    console.log("Scheduling video...", formData);
    // Handle schedule logic
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getVideoInfo = () => {
    if (!videoFile) return null;
    return {
      name: videoFile.name,
      size: formatFileSize(videoFile.size),
      type: videoFile.type,
    };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft onClick={() => router.back()} className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Upload Video</h1>
                <Badge variant="outline" className="text-xs mt-1">
                  Creator Studio
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            {currentStep === 3 && (
              <Button
                onClick={handlePublish}
                disabled={isUploading || isProcessing}
                className="bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white"
              >
                {isUploading
                  ? "Uploading..."
                  : isProcessing
                  ? "Processing..."
                  : "Publish"}
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div
            className={`flex items-center space-x-2 ${
              currentStep >= 1 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <span className="text-sm font-medium">Upload</span>
          </div>
          <div
            className={`h-px flex-1 mx-4 ${
              currentStep >= 2 ? "bg-primary" : "bg-muted"
            }`}
          ></div>
          <div
            className={`flex items-center space-x-2 ${
              currentStep >= 2 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <span className="text-sm font-medium">Details</span>
          </div>
          <div
            className={`h-px flex-1 mx-4 ${
              currentStep >= 3 ? "bg-primary" : "bg-muted"
            }`}
          ></div>
          <div
            className={`flex items-center space-x-2 ${
              currentStep >= 3 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 3
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              3
            </div>
            <span className="text-sm font-medium">Publish</span>
          </div>
          <div
            className={`h-px flex-1 mx-4 ${
              currentStep >= 4 ? "bg-primary" : "bg-muted"
            }`}
          ></div>
          <div
            className={`flex items-center space-x-2 ${
              currentStep >= 4 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 4
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Complete</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Step 1: Upload */}
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Upload Your Video</h2>
              <p className="text-muted-foreground">
                Select your video file to get started
              </p>
            </div>

            <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-chart-2/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Drag and drop your video here
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    or click to browse from your computer
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Select Video File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="w-5 h-5 mr-2 text-primary" />
                    Fast Upload
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Upload speeds up to 10x faster with our optimized
                    infrastructure
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Film className="w-5 h-5 mr-2 text-chart-2" />
                    HD Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Support for 4K resolution and high-quality video formats
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Settings className="w-5 h-5 mr-2 text-chart-3" />
                    Auto Processing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Automatic optimization for all devices and platforms
                  </p>
                </CardContent>
              </Card>
            </div>

            <Alert className="mt-6">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Supported formats: MP4, MOV, AVI, WMV, FLV, WebM. Maximum file
                size: 10GB. For best results, use MP4 format with H.264 codec.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Step 2: Video Details */}
        {currentStep === 2 && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Video Preview */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Play className="w-5 h-5 mr-2" />
                      Video Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {videoPreview && (
                      <div className="relative rounded-lg overflow-hidden bg-black">
                        <video
                          ref={videoRef}
                          src={videoPreview}
                          className="w-full h-64 object-contain"
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={togglePlayPause}
                                className="text-white hover:bg-white/20"
                              >
                                {isPlaying ? (
                                  <Pause className="w-4 h-4" />
                                ) : (
                                  <Play className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMute}
                                className="text-white hover:bg-white/20"
                              >
                                {isMuted ? (
                                  <VolumeX className="w-4 h-4" />
                                ) : (
                                  <Volume2 className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Monitor className="w-4 h-4 text-white" />
                              <Tablet className="w-4 h-4 text-white" />
                              <Smartphone className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Video Info */}
                {videoFile && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Info className="w-5 h-5 mr-2" />
                        File Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Filename:
                          </span>
                          <span className="text-sm font-medium">
                            {getVideoInfo()?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Size:
                          </span>
                          <span className="text-sm font-medium">
                            {getVideoInfo()?.size}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Type:
                          </span>
                          <span className="text-sm font-medium">
                            {getVideoInfo()?.type}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Video Details Form */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Edit3 className="w-5 h-5 mr-2" />
                      Video Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter video title..."
                        value={formData.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        className="h-12"
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.title.length}/100 characters
                      </p>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Tell viewers about your video..."
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        rows={4}
                        className="resize-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.description.length}/5000 characters
                      </p>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select category..." />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="tags"
                          placeholder="Add tags..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && (e.preventDefault(), addTag())
                          }
                          className="flex-1"
                        />
                        <Button onClick={addTag} variant="outline">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTag(tag)}
                                className="h-4 w-4 p-0 hover:bg-transparent"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Language */}
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={formData.language}
                        onValueChange={(value) =>
                          handleInputChange("language", value)
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select language..." />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem
                              key={language.value}
                              value={language.value}
                            >
                              {language.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Thumbnail */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Image className="w-5 h-5 mr-2" />
                      Thumbnail
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Custom Thumbnail
                        </span>
                        <Switch
                          checked={formData.customThumbnail}
                          onCheckedChange={(checked) =>
                            handleInputChange("customThumbnail", checked)
                          }
                        />
                      </div>

                      {formData.customThumbnail && (
                        <div className="space-y-4">
                          <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                            {thumbnailPreview ? (
                              <div className="relative">
                                <img
                                  src={thumbnailPreview}
                                  alt="Thumbnail preview"
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                                  onClick={() => {
                                    setThumbnailPreview(null);
                                    setThumbnailFile(null);
                                  }}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground mb-2">
                                  Upload custom thumbnail
                                </p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    thumbnailInputRef.current?.click()
                                  }
                                >
                                  Choose Image
                                </Button>
                                <input
                                  ref={thumbnailInputRef}
                                  type="file"
                                  accept="image/*"
                                  onChange={handleThumbnailUpload}
                                  className="hidden"
                                />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Recommended: 1280x720 pixels, JPG or PNG format
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Button
                  onClick={() => setCurrentStep(3)}
                  className="w-full bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white"
                  disabled={!formData.title || !formData.category}
                >
                  Continue to Publish Settings
                  <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg]" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Publish Settings */}
        {currentStep === 3 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Publish Settings</h2>
              <p className="text-muted-foreground">
                Configure how your video will be published and who can see it
              </p>
            </div>

            <Tabs defaultValue="visibility" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="visibility">Visibility</TabsTrigger>
                <TabsTrigger value="interaction">Interaction</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="visibility" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="w-5 h-5 mr-2" />
                      Video Visibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/50">
                        <input
                          type="radio"
                          id="public"
                          name="visibility"
                          value="public"
                          checked={formData.visibility === "public"}
                          onChange={(e) =>
                            handleInputChange("visibility", e.target.value)
                          }
                          className="w-4 h-4 text-primary"
                        />
                        <Globe className="w-5 h-5 text-green-500" />
                        <div className="flex-1">
                          <Label
                            htmlFor="public"
                            className="text-sm font-medium cursor-pointer"
                          >
                            Public
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Anyone can search for and view your video
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/50">
                        <input
                          type="radio"
                          id="unlisted"
                          name="visibility"
                          value="unlisted"
                          checked={formData.visibility === "unlisted"}
                          onChange={(e) =>
                            handleInputChange("visibility", e.target.value)
                          }
                          className="w-4 h-4 text-primary"
                        />
                        <EyeOff className="w-5 h-5 text-yellow-500" />
                        <div className="flex-1">
                          <Label
                            htmlFor="unlisted"
                            className="text-sm font-medium cursor-pointer"
                          >
                            Unlisted
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Anyone with the link can view your video
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/50">
                        <input
                          type="radio"
                          id="private"
                          name="visibility"
                          value="private"
                          checked={formData.visibility === "private"}
                          onChange={(e) =>
                            handleInputChange("visibility", e.target.value)
                          }
                          className="w-4 h-4 text-primary"
                        />
                        <Lock className="w-5 h-5 text-red-500" />
                        <div className="flex-1">
                          <Label
                            htmlFor="private"
                            className="text-sm font-medium cursor-pointer"
                          >
                            Private
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Only you can view your video
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Scheduling */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">
                            Schedule Publication
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Publish your video at a specific time
                          </p>
                        </div>
                        <Switch
                          checked={formData.scheduled}
                          onCheckedChange={(checked) =>
                            handleInputChange("scheduled", checked)
                          }
                        />
                      </div>

                      {formData.scheduled && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="scheduleDate">Date</Label>
                            <Input
                              id="scheduleDate"
                              type="date"
                              value={formData.scheduleDate}
                              onChange={(e) =>
                                handleInputChange(
                                  "scheduleDate",
                                  e.target.value
                                )
                              }
                              className="h-12"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="scheduleTime">Time</Label>
                            <Input
                              id="scheduleTime"
                              type="time"
                              value={formData.scheduleTime}
                              onChange={(e) =>
                                handleInputChange(
                                  "scheduleTime",
                                  e.target.value
                                )
                              }
                              className="h-12"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="interaction" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Viewer Interaction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">
                            Allow Comments
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Let viewers comment on your video
                          </p>
                        </div>
                        <Switch
                          checked={formData.comments}
                          onCheckedChange={(checked) =>
                            handleInputChange("comments", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">
                            Allow Likes/Dislikes
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Show like and dislike buttons
                          </p>
                        </div>
                        <Switch
                          checked={formData.likes}
                          onCheckedChange={(checked) =>
                            handleInputChange("likes", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">
                            Allow Download
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Let viewers download your video
                          </p>
                        </div>
                        <Switch
                          checked={formData.downloadable}
                          onCheckedChange={(checked) =>
                            handleInputChange("downloadable", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">
                            Age Restriction
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Mark as 18+ content
                          </p>
                        </div>
                        <Switch
                          checked={formData.ageRestriction}
                          onCheckedChange={(checked) =>
                            handleInputChange("ageRestriction", checked)
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Advanced Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">
                            Enable Monetization
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Show ads and earn revenue from your video
                          </p>
                        </div>
                        <Switch
                          checked={formData.monetization}
                          onCheckedChange={(checked) =>
                            handleInputChange("monetization", checked)
                          }
                        />
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <Label className="text-sm font-medium">
                          Video Quality
                        </Label>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="flex items-center space-x-2 p-3 border rounded-lg">
                            <Monitor className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Desktop</p>
                              <p className="text-xs text-muted-foreground">
                                1080p
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg">
                            <Tablet className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Tablet</p>
                              <p className="text-xs text-muted-foreground">
                                720p
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg">
                            <Smartphone className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Mobile</p>
                              <p className="text-xs text-muted-foreground">
                                480p
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <Label className="text-sm font-medium">
                          Processing Options
                        </Label>
                        <div className="space-y-2">
                          <Badge variant="outline" className="mr-2">
                            <Zap className="w-3 h-3 mr-1" />
                            Fast Processing
                          </Badge>
                          <Badge variant="outline" className="mr-2">
                            <Film className="w-3 h-3 mr-1" />
                            Quality Optimization
                          </Badge>
                          <Badge variant="outline">
                            <Mic className="w-3 h-3 mr-1" />
                            Audio Enhancement
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Details
              </Button>
              <div className="flex space-x-3">
                {formData.scheduled ? (
                  <Button
                    onClick={handleSchedule}
                    className="bg-gradient-to-r from-chart-2 to-chart-3 hover:from-chart-2/90 hover:to-chart-3/90 text-white"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Video
                  </Button>
                ) : (
                  <Button
                    onClick={handlePublish}
                    disabled={isUploading || isProcessing}
                    className="bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                        Uploading...
                      </>
                    ) : isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Publish Now
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Upload Progress & Complete */}
        {(isUploading || isProcessing || currentStep === 4) && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {isUploading
                  ? "Uploading Video..."
                  : isProcessing
                  ? "Processing Video..."
                  : "Video Published!"}
              </h2>
              <p className="text-muted-foreground">
                {isUploading
                  ? "Your video is being uploaded to our servers"
                  : isProcessing
                  ? "We're optimizing your video for all devices"
                  : "Your video is now live and ready to be viewed"}
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  {isUploading && (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-chart-2/20 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          {uploadProgress}% uploaded
                        </p>
                      </div>
                    </div>
                  )}

                  {isProcessing && (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-chart-2/20 to-chart-3/20 rounded-full flex items-center justify-center mx-auto">
                        <div className="w-8 h-8 border-2 border-chart-2/20 border-t-chart-2 rounded-full animate-spin"></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Processing video for optimal quality...
                      </p>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Video Published Successfully!
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Your video "{formData.title}" is now live and can be
                          viewed by your audience.
                        </p>
                        <div className="flex justify-center space-x-4">
                          <Button variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View Video
                          </Button>
                          <Button variant="outline">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                          <Button className="bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Upload Another
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {currentStep === 4 && (
              <Alert className="mt-6">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Video processing is complete! Your video is now available in
                  multiple qualities and optimized for all devices. You can view
                  analytics in your creator dashboard.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

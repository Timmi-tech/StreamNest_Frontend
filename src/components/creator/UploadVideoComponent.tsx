import { useCreateVideoPosts } from "@/queries/video.queries";
import { getUploadStatus } from "@/store/VideoUpload";
import { ArrowLeft, Loader2, Plus, Tag, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const UploadVideoComponent = ({ view, setView }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [MAX_FILE_SIZE_MB] = useState(300);

  const router = useRouter();

  // Upload form state
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    genre: "Other",
    ageRating: "Restricted",
    videoYear: new Date().getFullYear(),
    tags: [],
    videoFile: null,
  });
  const [newTag, setNewTag] = useState("");
  const [videoPreview, setVideoPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const UploadVideo = useCreateVideoPosts();

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

  const genres = ["Comedy", "Music", "Sports", "Drama", "Tutorial", "Other"];

  const ageRatings = ["Everyone", "Teens", "Mature", "Restricted"];

  const handleVideoUpload = (file) => {
    if (file && file.type.startsWith("video/")) {
      const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        toast.error("Whoa that video is huge😮", {
          description:
            "Uploaded videos must not exceed a maximum size of 300MB.",
        });
      } else {
        setUploadData((prev) => ({ ...prev, videoFile: file }));
        const url = URL.createObjectURL(file);
        console.log(url);
        setVideoPreview(url);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleVideoUpload(files[0]);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !uploadData.tags.includes(newTag.trim())) {
      setUploadData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setUploadData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const uploadStatus = getUploadStatus();
  useEffect(() => {
    console.log(uploadStatus);
  }, [uploadProgress]);

  const handleUpload = async () => {
    if (!uploadData.title || !uploadData.genre || !uploadData.videoFile) return;
    console.log(uploadData);

    // const uploadProgress = getUploadStatus();

    setIsUploading(true);
    const promise = UploadVideo.mutateAsync(uploadData);

    toast.promise(promise, {
      loading: "Uploading Video...",
      success: (data) => {
        router.back();
        return `Your video has been Uploaded🎉`;
      },
      error: "Error Uploading Video Pleas try again",
    });

    // setUploadProgress(uploadProgress);
    // console.log(uploadProgress);

    // Add new video to the list
    const newVideo = {
      id: Date.now().toString(),
      title: uploadData.title,
      description: uploadData.description,
      genre: uploadData.genre,
      ageRating: uploadData.ageRating,
      videoUrl: videoPreview,
      videoYear: uploadData.videoYear,
      uploadedAt: new Date().toISOString(),
      userId: "user123",
      tags: uploadData.tags,
      stats: {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
      },
    };

    setUserVideos((prev) => [newVideo, ...prev]);

    // Reset form
    setUploadData({
      title: "",
      description: "",
      genre: "",
      ageRating: "",
      videoYear: new Date().getFullYear(),
      tags: [],
      videoFile: null,
    });
    setVideoPreview(null);
    setIsUploading(false);
    setUploadProgress(0);
    // setView("dashboard");
  };

  //   useEffect(() => {
  //     if (UploadVideo.isSuccess) {
  //       toast.success("Video Uploaded Successfully🎉");
  //       //   setView("dashboard");
  //     }
  //   }, [UploadVideo.isSuccess]);

  //   useEffect(() => {
  //     if (UploadVideo.isError) {
  //       toast.error("Error uploading Video. Please try again");
  //     }
  //   }, [UploadVideo.isError]);

  //   useEffect(() => {
  //     if (UploadVideo.isPending) {
  //       toast.info("Uploading video");
  //     }
  //   }, [UploadVideo.isPending]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Upload Header */}
      <header className="border-b border-gray-800 bg-black/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setView("dashboard")}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Upload Video</h1>
              <p className="text-xs text-gray-400">Share your creativity</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Save Draft
            </button>
            <button
              onClick={handleUpload}
              disabled={
                !uploadData.title || !uploadData.genre || !uploadData.videoFile
                // isUploading
              }
              className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:opacity-50 text-white text-sm font-medium rounded-full transition-colors flex items-center space-x-2"
            >
              {false ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Post</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Upload Progress */}
      {isUploading && (
        <div className="px-4 py-2 bg-gray-900/50">
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-800 rounded-full h-1">
              <div
                className="bg-red-600 h-1 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">{uploadProgress}%</span>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Video Upload & Preview */}
        <div className="flex-1 p-4 flex flex-col items-center justify-center">
          {!videoPreview ? (
            <div
              className={`w-full max-w-md aspect-[9/16] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-colors ${
                dragActive
                  ? "border-red-500 bg-red-500/10"
                  : "border-gray-600 hover:border-gray-500"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload a video</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Drag and drop or click to upload
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors"
                >
                  Select File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) =>
                    e.target.files[0] && handleVideoUpload(e.target.files[0])
                  }
                  className="hidden"
                />
                <div className="mt-6 text-xs text-gray-500 space-y-1">
                  <p>MP4, MOV, AVI, WebM up to 10GB</p>
                  <p>Vertical videos work best</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md aspect-[9/16] bg-black rounded-2xl overflow-hidden relative">
              <video
                ref={videoRef}
                src={videoPreview}
                className="w-full h-full object-cover"
                controls
                muted
              />
              <button
                onClick={() => {
                  setVideoPreview(null);
                  setUploadData((prev) => ({ ...prev, videoFile: null }));
                }}
                className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Upload Form */}
        <div className="w-full lg:w-80 border-l border-gray-800 p-4 space-y-6 overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Caption</label>
            <textarea
              placeholder="Describe your video..."
              value={uploadData.title}
              onChange={(e) =>
                setUploadData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full h-20 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500 resize-none focus:outline-none focus:border-red-500"
              maxLength="150"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Add captions to get more views</span>
              <span>{uploadData.title.length}/150</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              placeholder="Tell viewers more about your video..."
              value={uploadData.description}
              onChange={(e) =>
                setUploadData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full h-16 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500 resize-none focus:outline-none focus:border-red-500"
              maxLength="500"
            />
            <div className="text-xs text-gray-500 text-right mt-1">
              {uploadData.description.length}/500
            </div>
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={uploadData.genre}
              onChange={(e) =>
                setUploadData((prev) => ({ ...prev, genre: e.target.value }))
              }
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            >
              <option value="">Select category</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Age Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">Age Rating</label>
            <select
              value={uploadData.ageRating}
              onChange={(e) =>
                setUploadData((prev) => ({
                  ...prev,
                  ageRating: e.target.value,
                }))
              }
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            >
              {ageRatings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex items-center space-x-2 mb-2">
              <input
                placeholder="Add tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
              <button
                onClick={addTag}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {uploadData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {uploadData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 bg-gray-800 px-2 py-1 rounded-full text-xs"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video Year */}
          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <input
              type="number"
              min="1900"
              max="2030"
              value={uploadData.videoYear}
              onChange={(e) =>
                setUploadData((prev) => ({
                  ...prev,
                  videoYear: parseInt(e.target.value),
                }))
              }
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

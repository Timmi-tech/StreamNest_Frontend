import { useLikeVideo } from "@/queries/likes.queries";
import { UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const useVideoPlayer = ({
  AllVideos,
}: {
  AllVideos: UseQueryResult<any, Error>;
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [likedVideos, setLikedVideos] = useState(new Set([0, 2]));
  const [followedUsers, setFollowedUsers] = useState(
    new Set(["user1", "user3"])
  );
  const [videoDurations, setVideoDurations] = useState({});
  const [videoProgress, setVideoProgress] = useState({});
  const [loadedVideos, setLoadedVideos] = useState(new Set());
  const [videoStates, setVideoStates] = useState({});
  const [videosToLoad, setVideosToLoad] = useState(new Set([0])); // Only load first video initially

  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  // const LikeVideo = useLikeVideo(videoId);
  // const toggleLike = async (videoId, index) => {
  //   try {
  //     await LikeVideo.mutateAsync(videoId);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLikedVideos((prev) => {
  //     const newSet = new Set(prev);
  //     if (newSet.has(index)) {
  //       newSet.delete(index);
  //     } else {
  //       newSet.add(index);
  //     }
  //     return newSet;
  //   });
  // };

  const toggleFollow = (userId) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  // Safe play function for HTML5 video
  const playVideo = async (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    try {
      // Pause all other videos first
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index && !v.paused) {
          v.pause();
        }
      });

      // Play current video
      await video.play();
      setVideoStates((prev) => ({ ...prev, [index]: "playing" }));
      console.log(`✅ Video ${index} playing`);
    } catch (error) {
      console.log(`⚠️ Video ${index} play failed:`, error.message);
      // Try again after a short delay
      setTimeout(() => {
        if (video && !video.paused) return;
        video.play().catch((e) => console.log(`Retry failed: ${e.message}`));
      }, 500);
    }
  };

  // Safe pause function
  const pauseVideo = (index) => {
    const video = videoRefs.current[index];
    if (video && !video.paused) {
      video.pause();
      setVideoStates((prev) => ({ ...prev, [index]: "paused" }));
      console.log(`⏸️ Video ${index} paused`);
    }
  };

  // Preload videos around current index for smooth experience
  const preloadVideos = (centerIndex) => {
    const toLoad = new Set();

    // Load current video
    toLoad.add(centerIndex);

    // Load previous video (for smooth backward scroll)
    if (centerIndex > 0) {
      toLoad.add(centerIndex - 1);
    }

    // Load next video (for smooth forward scroll)
    if (centerIndex < AllVideos.data?.length - 1) {
      toLoad.add(centerIndex + 1);
    }

    // Optional: Load one more ahead for very smooth experience
    if (centerIndex < AllVideos.data?.length - 2) {
      toLoad.add(centerIndex + 2);
    }

    setVideosToLoad(toLoad);
    console.log(`📱 Preloading videos: ${Array.from(toLoad).join(", ")}`);
  };

  const handleScroll = (e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const itemHeight = container.clientHeight;
    const newIndex = Math.round(scrollTop / itemHeight);

    if (newIndex !== currentVideoIndex && newIndex < AllVideos.data?.length) {
      // Pause current video
      pauseVideo(currentVideoIndex);

      // Update index
      setCurrentVideoIndex(newIndex);
      setIsPlaying(true);

      // Preload videos around new index
      preloadVideos(newIndex);

      // Play new video after a short delay
      setTimeout(() => {
        playVideo(newIndex);
      }, 300);
    }
  };

  const scrollToVideo = (index) => {
    if (containerRef.current) {
      const itemHeight = containerRef.current.clientHeight;
      containerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: "smooth",
      });

      // Preload videos around target index
      preloadVideos(index);
    }
  };

  // Event handlers
  const handleVideoLoaded = (index) => {
    console.log(`📹 Video ${index} loaded`);
    setLoadedVideos((prev) => new Set([...prev, index]));
    setVideoStates((prev) => ({ ...prev, [index]: "loaded" }));
  };

  const handleVideoPlay = (index) => {
    console.log(`▶️ Video ${index} started playing`);
    setVideoStates((prev) => ({ ...prev, [index]: "playing" }));
    if (index === currentVideoIndex) {
      setIsPlaying(true);
    }
  };

  const handleVideoPause = (index) => {
    console.log(`⏸️ Video ${index} paused`);
    setVideoStates((prev) => ({ ...prev, [index]: "paused" }));
    if (index === currentVideoIndex) {
      setIsPlaying(false);
    }
  };

  const handleVideoEnded = (index) => {
    console.log(`🏁 Video ${index} ended`);
    setVideoStates((prev) => ({ ...prev, [index]: "ended" }));
    if (index === currentVideoIndex) {
      if (index < AllVideos.data?.length - 1) {
        scrollToVideo(index + 1);
      } else {
        scrollToVideo(0);
      }
    }
  };

  const handleVideoProgress = (index, e) => {
    const video = e.target;
    const progress = {
      played: video.currentTime / video.duration,
      playedSeconds: video.currentTime,
      loaded:
        video.buffered.length > 0 ? video.buffered.end(0) / video.duration : 0,
    };
    setVideoProgress((prev) => ({ ...prev, [index]: progress }));
  };

  const handleVideoDuration = (index, e) => {
    const duration = e.target.duration;
    setVideoDurations((prev) => ({ ...prev, [index]: duration }));
    console.log(`⏱️ Video ${index} duration: ${duration}s`);
  };

  const handleVideoError = (index, error) => {
    console.error(`❌ Video ${index} error:`, error);
    setVideoStates((prev) => ({ ...prev, [index]: "error" }));
    setLoadedVideos((prev) => new Set([...prev, index])); // Remove loading state
  };

  const togglePlayPause = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);

    if (newState) {
      playVideo(currentVideoIndex);
    } else {
      pauseVideo(currentVideoIndex);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    // Apply to all videos
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = newMuted;
        video.volume = newMuted ? 0 : volume;
      }
    });
  };

  const seekTo = (index, seconds) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = seconds;
    }
  };

  // Auto-start first video and preload nearby videos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true);
      playVideo(0);
      preloadVideos(0); // Preload first few videos
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle volume changes
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.volume = isMuted ? 0 : volume;
        video.muted = isMuted;
      }
    });
  }, [volume, isMuted]);

  return {
    // ref
    containerRef,
    videoRefs,

    // stateActions
    setVolume,
    setVideoStates,
    //   state
    likedVideos,
    followedUsers,
    videoDurations,
    videoProgress,
    loadedVideos,
    videoStates,
    videosToLoad,
    isMuted,
    isPlaying,
    currentVideoIndex,
    // functions
    // toggleLike,
    toggleFollow,
    // event handlers
    handleScroll,
    handleVideoLoaded,
    handleVideoPlay,
    handleVideoPause,
    handleVideoEnded,
    handleVideoProgress,
    handleVideoDuration,
    handleVideoError,
    togglePlayPause,
    toggleMute,
    seekTo,
  };
};

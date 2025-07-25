import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { getUser, LogUserOut } from "@/store/AuthStore";
import { UseQueryResult } from "@tanstack/react-query";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Play,
  Video,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import CommentSection from "./CommentSection";
import { setVideoId } from "@/store/CommentStore";
import { useGetLikes, useLikeVideo } from "@/queries/likes.queries";

export const VideoPlayer = ({
  AllVideos,
  setView,
  view,
}: {
  AllVideos: UseQueryResult<any, Error>;
  setView?: Dispatch<SetStateAction<string>>;
  view?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const router = useRouter();
  const render = "once";
  // log user out
  const handleLogOut = () => {
    LogUserOut();
    console.log("logged out");
    router.push("auth/login");
    // routerServerGlobal.
  };
  // reseting
  useEffect(() => {
    !isOpen && setSelectedVideoId("");
    console.log(AllVideos.data);
  }, [isOpen]);

  // user details
  const user = getUser();

  // render toast

  const {
    // LikeVideo,
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
  } = useVideoPlayer({ AllVideos });

  const Likes = useGetLikes(AllVideos.data[currentVideoIndex].id);
  const LikeVideo = useLikeVideo(AllVideos.data[currentVideoIndex].id);

  useEffect(() => {
    Likes.isSuccess && console.log(Likes.data);
  }, [Likes.isSuccess]);

  const isVideoLiked = (Likes, LikeVideo) => {
    if (LikeVideo?.data?.isLiked !== undefined) return LikeVideo.data.isLiked;
    if (!Likes.isPending && Likes?.data?.isLiked !== undefined)
      return Likes.data.isLiked;
    return false;
  };

  return (
    <div
      className="bg-black relative overflow-hidden"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      {/* Enhanced Debug Info */}
      {/* <div className="absolute top-4 left-4 z-50 bg-black/90 text-white p-3 rounded text-xs max-w-sm">
        <div className="font-bold mb-2">Lazy Loading Debug:</div>
        <div>Current: {currentVideoIndex}</div>
        <div>Playing: {isPlaying ? "Yes" : "No"}</div>
        <div>Muted: {isMuted ? "Yes" : "No"}</div>
        <div>Loaded: {Array.from(loadedVideos).join(", ")}</div>
        <div>To Load: {Array.from(videosToLoad).join(", ")}</div>
        <div>
          Current State: {videoStates[currentVideoIndex] || "not loaded"}
        </div>
        <div className="text-green-400 mt-2">📱 Lazy Loading Active</div>
        <div className="text-blue-400 text-xs mt-1">
          Only loads {videosToLoad.size}/{videos.length} videos
        </div>
      </div> */}

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between p-4 pt-5">
          <div className="flex items-center space-x-4">
            {view != "video" ? (
              <button className="text-white p-2 hover:bg-white/10 rounded-full">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-xl flex items-center justify-center">
                    <Video
                      onClick={() => setView && setView("dashboard")}
                      className="w-6 h-6 text-white"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setView("dashboard")}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-8 h-8 cursor-pointer text-white" />
                </button>
              </>
            )}

            {view != "video" && (
              <div className="">
                <h1 className="text-white text:md md:text-lg font-bold">
                  StreamNest
                </h1>
                {user && user.role == "Creator" ? (
                  <p className="text-white text-sm">Creator</p>
                ) : (
                  <p className="text-white font-bold  text-sm">
                    Hello {user?.firstname} 😀
                  </p>
                )}
              </div>
            )}
          </div>
          {/* search and more */}
          <div className="flex items-center space-x-2">
            {/* <button className="text-white p-2 hover:bg-white/10 rounded-full">
              <Search className="w-6 h-6" />
            </button> */}
            {/* this check if the video is rendering in the user dashboard vie video if it is it dosent return the buttons */}
            {/* if its not then it check the user role and renders the required button */}
            {view != "video" ? (
              (user && user.role) == "Creator" ? (
                <button
                  onClick={() => router.push("creator/my-dashboard")}
                  className="text-black p-1 px-4 bg-white hover:border-primary rounded-full"
                >
                  Dashboard
                  {/* <LogOut className="w-6 h-6" /> */}
                </button>
              ) : (
                <button
                  onClick={handleLogOut}
                  className="text-black p-1 px-4 bg-white hover:border-primary rounded-full"
                >
                  Log out
                  {/* <LogOut className="w-6 h-6" /> */}
                </button>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* Video Feed */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory"
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {AllVideos.data?.length > 0 &&
          AllVideos.data?.map((video, index) => (
            <div
              key={video.id}
              className="h-screen w-full snap-start relative bg-black"
            >
              {/* Lazy Loaded HTML5 Video */}
              <div className="absolute inset-0">
                {videosToLoad.has(index) ? (
                  // Load video only when needed
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video?.videoUrl}
                    className="w-full h-full object-cover"
                    muted={isMuted}
                    loop
                    playsInline
                    preload="metadata" // Only load metadata initially
                    webkit-playsinline="true"
                    onLoadedData={() => handleVideoLoaded(index)}
                    onLoadStart={() => {
                      console.log(`📥 Video ${index} loading started`);
                      setVideoStates((prev) => ({
                        ...prev,
                        [index]: "loading",
                      }));
                    }}
                    onCanPlay={() => {
                      console.log(`✅ Video ${index} can play`);
                      setVideoStates((prev) => ({ ...prev, [index]: "ready" }));
                    }}
                    onPlay={() => handleVideoPlay(index)}
                    onPause={() => handleVideoPause(index)}
                    onEnded={() => handleVideoEnded(index)}
                    onTimeUpdate={(e) => handleVideoProgress(index, e)}
                    onDurationChange={(e) => handleVideoDuration(index, e)}
                    onError={(e) => handleVideoError(index, e.target.error)}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      backgroundColor: "#000",
                    }}
                  />
                ) : (
                  // Placeholder for unloaded videos
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <div className="text-white/60 text-center">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                        <Play className="w-8 h-8 text-white/40" />
                      </div>
                      <div className="text-sm font-medium">{video.title}</div>
                      <div className="text-xs mt-1">Scroll to load video</div>
                    </div>
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none z-5" />
              </div>

              {/* Loading State - Only show for videos that should be loading */}
              {videosToLoad.has(index) && !loadedVideos.has(index) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    <span className="text-white text-sm">
                      Loading {video.title}...
                    </span>
                    <div className="text-white/60 text-xs text-center max-w-xs">
                      Video {index + 1} of {AllVideos.data?.length}
                    </div>
                  </div>
                </div>
              )}

              {/* Play/Pause Overlay - Only show for loaded videos */}
              {videosToLoad.has(index) && (
                <div
                  className="absolute inset-0 flex items-center justify-center z-10"
                  onClick={togglePlayPause}
                >
                  {!isPlaying &&
                    index === currentVideoIndex &&
                    loadedVideos.has(index) && (
                      <div className="bg-black/60 rounded-full p-6 animate-pulse">
                        <Play className="w-16 h-16 text-white fill-white" />
                      </div>
                    )}
                </div>
              )}

              {/* Right Side Actions */}
              <div className="absolute right-4 bottom-5 flex flex-col items-center space-y-6 z-20">
                {/* User Avatar */}
                <div className="relative">
                  {/* <div className="w-14 h-14 border-2 border-white rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                  {video.user.displayName[0]}
                </div> */}
                  {/* {!followedUsers.has(video.userId) && (
                  <button
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                    onClick={() => toggleFollow(video.userId)}
                  >
                    <PlusCircle className="w-4 h-4 text-white" />
                  </button>
                )} */}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col items-center">
                  <button
                    className="w-12 h-12 text-white hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    onClick={() => LikeVideo.mutate()}
                  >
                    <Heart
                      className={`w-7 h-7 transition-colors ${
                        !Likes.isPending && Likes?.data?.isLiked
                          ? "fill-red-500 text-red-500"
                          : "text-white hover:text-red-300"
                      }`}
                    />
                  </button>
                  <span className="text-white text-xs font-medium mt-1">
                    {!Likes.isPending && Likes?.data?.totalLikes}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      setSelectedVideoId(video.id);
                      setIsOpen((prev) => !prev);
                    }}
                    className="w-12 h-12 text-white hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  >
                    <MessageCircle className="w-7 h-7" />
                  </button>
                  <span className="text-white text-xs font-medium mt-1">
                    {/* {formatNumber(video.stats.comments)} */}
                  </span>
                </div>

                {/* Volume Control */}
                <div className=" ">
                  <button
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isMuted
                        ? "text-white/60 hover:bg-white/10"
                        : "text-white hover:bg-white/20"
                    }`}
                    onClick={toggleMute}
                  >
                    {isMuted ? (
                      <VolumeX className="w-7 h-7" />
                    ) : (
                      <Volume2 className="w-7 h-7 " />
                    )}
                  </button>
                </div>

                {/* <div className="flex flex-col items-center">
                <button className="w-12 h-12 text-white hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                  <Share2 className="w-7 h-7" />
                </button>
                <span className="text-white text-xs font-medium mt-1">
                  {formatNumber(video.stats.shares)}
                </span>
              </div> */}

                {/* <button className="w-12 h-12 text-white hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Bookmark className="w-7 h-7" />
              </button> */}
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-20 p-4 z-15">
                <div className="flex items-center space-x-3 mb-3">
                  {/* use avater */}
                  <div className="w-14 h-14 border-2 border-white rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-white font-bold text-lg">
                    {video.userName[0]}
                  </div>
                  <span className="text-white font-semibold text-lg">
                    {video.userName}
                  </span>
                  {/* user verified */}
                  {/* {video.user.verified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )} */}
                  {/* <span className="text-gray-300 text-sm">
                  • {timeAgo(video.uploadedAt)}
                </span> */}
                  {/* {!followedUsers.has(video.userId) && (
                  <button
                    className="border border-white text-white hover:bg-white hover:text-black px-4 py-1 rounded-md text-sm font-medium ml-auto transition-colors"
                    onClick={() => toggleFollow(video.userId)}
                  >
                    Follow
                  </button>
                )} */}
                </div>

                <p className="text-white text-sm mb-3 max-w-md leading-relaxed">
                  {video.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium hover:bg-white/30 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Progress Bar */}
                {videoProgress[index] && videoDurations[index] && (
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-white text-xs mb-1">
                      <span>
                        {Math.floor(
                          (videoProgress[index].playedSeconds || 0) / 60
                        )}
                        :
                        {String(
                          Math.floor(
                            (videoProgress[index].playedSeconds || 0) % 60
                          )
                        ).padStart(2, "0")}
                      </span>
                      <span>
                        {Math.floor(videoDurations[index] / 60)}:
                        {String(
                          Math.floor(videoDurations[index] % 60)
                        ).padStart(2, "0")}
                      </span>
                    </div>
                    <div
                      className="w-full bg-white/20 rounded-full h-1 cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        const seekTime = percent * videoDurations[index];
                        seekTo(index, seekTime);
                      }}
                    >
                      <div
                        className="bg-white rounded-full h-1 transition-all duration-300"
                        style={{
                          width: `${(videoProgress[index].played || 0) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      <CommentSection
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedVideoId={selectedVideoId}
      />
      {/* Bottom Navigation */}
      {/* <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-gray-800 z-30">
        <div className="flex items-center justify-around py-3">
          <button className="flex flex-col items-center space-y-1 text-white py-2 px-4 hover:bg-white/10 rounded-lg transition-colors">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400 py-2 px-4 hover:bg-white/10 rounded-lg transition-colors">
            <Search className="w-6 h-6" />
            <span className="text-xs">Discover</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400 py-2 px-4 hover:bg-white/10 rounded-lg transition-colors">
            <PlusCircle className="w-8 h-8" />
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400 py-2 px-4 hover:bg-white/10 rounded-lg transition-colors">
            <Bell className="w-6 h-6" />
            <span className="text-xs">Inbox</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400 py-2 px-4 hover:bg-white/10 rounded-lg transition-colors">
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div> */}

      {/* Navigation Dots */}
      {/* <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-2">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`w-1 h-8 rounded-full transition-all ${
                index === currentVideoIndex
                  ? "bg-white shadow-lg"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              onClick={() => scrollToVideo(index)}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

"use client";
import { Video, Heart, MessageCircle, VolumeX } from "lucide-react";
export default function VideoFeedSkeleton() {
  // Create multiple skeleton screens for realistic loading effect
  const skeletonItems = Array.from({ length: 3 }, (_, i) => i);
  return (
    <div className="h-screen bg-black relative overflow-hidden">
      {/* Top Navigation Skeleton */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between p-4 pt-5">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-10 h-10 bg-gray-700 rounded-xl animate-pulse"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-600 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-1">
              <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-16 h-3 bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="w-20 h-8 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Video Feed Skeleton */}
      <div className="h-full overflow-hidden">
        {skeletonItems.map((index) => (
          <div
            key={index}
            className="h-screen w-full absolute inset-0 bg-black"
            style={{
              transform: `translateY(${index * 100}vh)`,
              opacity: index === 0 ? 1 : 0.3,
            }}
          >
            {/* Video Background Skeleton */}
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>

                {/* Video placeholder icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center animate-pulse">
                    <Video className="w-10 h-10 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"></div>
            </div>

            {/* Right Side Actions Skeleton */}
            <div className="absolute right-4 bottom-5 flex flex-col items-center space-y-6 z-20">
              {/* Like Button Skeleton */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-7 h-7 text-gray-500" />
                </div>
                <div className="w-8 h-3 bg-gray-600 rounded mt-1 animate-pulse"></div>
              </div>

              {/* Comment Button Skeleton */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center animate-pulse">
                  <MessageCircle className="w-7 h-7 text-gray-500" />
                </div>
                <div className="w-6 h-3 bg-gray-600 rounded mt-1 animate-pulse"></div>
              </div>

              {/* Volume Button Skeleton */}
              <div className="w-10 h-10 bg-gray-700/50 rounded-full flex items-center justify-center animate-pulse">
                <VolumeX className="w-7 h-7 text-gray-500" />
              </div>
            </div>

            {/* Bottom Content Skeleton */}
            <div className="absolute bottom-0 left-0 right-20 p-4 z-15">
              {/* User Info Skeleton */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-14 h-14 bg-gray-700 rounded-full animate-pulse"></div>
                <div className="space-y-1">
                  <div className="w-24 h-4 bg-gray-600 rounded animate-pulse"></div>
                  <div className="w-4 h-4 bg-blue-600/50 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Description Skeleton */}
              <div className="space-y-2 mb-3 max-w-md">
                <div className="w-full h-3 bg-gray-600 rounded animate-pulse"></div>
                <div className="w-4/5 h-3 bg-gray-600 rounded animate-pulse"></div>
                <div className="w-3/5 h-3 bg-gray-600 rounded animate-pulse"></div>
              </div>

              {/* Tags Skeleton */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="w-16 h-6 bg-gray-600/50 rounded-full animate-pulse"></div>
                <div className="w-20 h-6 bg-gray-600/50 rounded-full animate-pulse"></div>
                <div className="w-14 h-6 bg-gray-600/50 rounded-full animate-pulse"></div>
              </div>

              {/* Progress Bar Skeleton */}
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="w-8 h-3 bg-gray-600 rounded animate-pulse"></div>
                  <div className="w-8 h-3 bg-gray-600 rounded animate-pulse"></div>
                </div>
                <div className="w-full bg-gray-600/30 rounded-full h-1">
                  <div className="bg-gray-500 rounded-full h-1 w-1/3 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Loading Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border border-white/20"></div>
                </div>
                <div className="space-y-2 text-center">
                  <div className="w-32 h-4 bg-gray-600 rounded mx-auto animate-pulse"></div>
                  <div className="w-20 h-3 bg-gray-700 rounded mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pulsing Network Indicator */}
      <div className="absolute top-20 right-4 z-40">
        <div className="flex items-center space-x-2 bg-black/50 rounded-full px-3 py-1">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-white text-xs">Loading...</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        @keyframes skeleton-pulse {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}

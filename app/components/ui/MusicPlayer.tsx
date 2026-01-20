"use client";

import { useState, useRef, useEffect } from "react";
import { Headphones, Music } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";

// YouTube IFrame API types
declare global {
  interface Window {
    YT: {
      Player: new (id: string, config: {
        videoId: string;
        playerVars: Record<string, number | string>;
        events: {
          onReady?: (event: { target: YTPlayer }) => void;
          onStateChange?: (event: { data: number; target: YTPlayer }) => void;
        };
      }) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }

  interface YTPlayer {
    playVideo: () => void;
    pauseVideo: () => void;
    getCurrentTime: () => number;
    getDuration: () => number;
    destroy: () => void;
  }
}

interface MusicPlayerProps {
  youtubeUrl: string;
}

const MusicPlayer = ({ youtubeUrl }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(youtubeUrl);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;


  useEffect(() => {
    if (!videoId) return;

    // Load YouTube IFrame API
    if (!('YT' in window)) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const createPlayer = () => {
      if (!('YT' in window) || !window.YT.Player) return;

      const playerId = `youtube-player-${videoId}`;
      let container = document.getElementById(playerId);
      if (!container) {
        container = document.createElement("div");
        container.id = playerId;
        container.style.display = "none";
        document.body.appendChild(container);
      }

      playerRef.current = new window.YT.Player(playerId, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          loop: 1,
          playlist: videoId,
        },
        events: {
          onStateChange: (event: { data: number; target: YTPlayer }) => {
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2 || event.data === 0) {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    if ('YT' in window && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore errors
        }
      }
    };
  }, [videoId]);

  if (!videoId || !thumbnailUrl) return null;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 p-4">

      {/* Main Content: Album Art and Info Column */}
      <div className="flex items-center gap-4 grow h-full">
        {/* Spinning Vinyl Album Art - Bigger */}
        <div className="relative shrink-0">
          <motion.div
            className="w-40 h-40 rounded-lg overflow-hidden"
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              rotate: {
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            <Image
              src={thumbnailUrl}
              alt="Album Art"
              width={96}
              height={96}
              className="w-full h-full object-cover"
              unoptimized
            />
          </motion.div>
        </div>

        {/* Info Column: AirPods, Title, Singer */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {/* AirPods Connection Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 w-fit">
            <Headphones className="w-4 h-4 text-white" />
            <span className="text-xs text-white font-medium">Lucas&apos; AirPods</span>
          </div>

          {/* Song Info */}
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-white mb-0.5 truncate">luther</h3>
            <p className="text-xs text-white/60 truncate">Kendrick Lamar, SZA</p>
          </div>
        </div>

        {/* Music/Spotify Logo - Right Side */}
        <div className="shrink-0">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <Music className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Background glow effect */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-colors" />
    </div>
  );
};

export default MusicPlayer;

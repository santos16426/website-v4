"use client";

import { useState, useEffect } from "react";
import { Music } from "lucide-react";
import Image from "next/image";

interface Track {
  title: string;
  artist: string;
  albumArt: string;
  progressMs: number;
  durationMs: number;
}

const DEFAULT_TRACK: Track = {
  title: "luther",
  artist: "Kendrick Lamar, SZA",
  albumArt:
    "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=400&h=400&fit=crop",
  progressMs: 0,
  durationMs: 180000,
};

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function SpotifyLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.508 17.302c-.216.334-.654.434-.988.216-2.73-1.666-6.16-2.042-10.208-1.118-.382.088-.76-.154-.848-.538-.088-.382.154-.76.538-.848 4.43-1.014 8.212-.582 11.29 1.298.334.218.434.654.216.99zm1.47-3.262c-.272.438-.846.578-1.284.306-3.12-1.92-7.872-2.472-11.562-1.352-.494.15-1.018-.128-1.168-.622-.15-.494.128-1.018.622-1.168 4.224-1.28 9.456-.648 13.086 1.584.438.272.578.846.306 1.252zm.126-3.414c-3.744-2.222-9.924-2.424-13.482-1.342-.574.174-1.182-.152-1.356-.726-.174-.574.152-1.182.726-1.356 4.092-1.242 10.92-1.008 15.222 1.548.516.306.684.972.378 1.488-.306.516-.972.684-1.488.388z" />
    </svg>
  );
}

const POLL_INTERVAL_MS = 15000;
const PROGRESS_TICK_MS = 1000;

export default function MusicPlayer() {
  const [track, setTrack] = useState<Track>(DEFAULT_TRACK);
  const [progressMs, setProgressMs] = useState(DEFAULT_TRACK.progressMs);

  useEffect(() => {
    let cancelled = false;

    async function fetchNowPlaying() {
      try {
        const res = await fetch("/api/spotify/now-playing");
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (data.track) {
          setTrack(data.track);
          setProgressMs(data.track.progressMs ?? 0);
        }
      } catch {
        // Keep default track
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (track.durationMs <= 0) return;
    const t = setInterval(() => {
      setProgressMs((p) => (p + PROGRESS_TICK_MS >= track.durationMs ? 0 : p + PROGRESS_TICK_MS));
    }, PROGRESS_TICK_MS);
    return () => clearInterval(t);
  }, [track.durationMs]);

  const progressPercent = track.durationMs > 0 ? (progressMs / track.durationMs) * 100 : 0;

  return (
    <div className="group relative z-10 w-full h-full min-h-[200px] overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-500 ease-out hover:bg-white/10 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <Music className="w-3.5 h-3.5" />
          Spotify Desktop
        </div>
        <div className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold text-white tracking-tight">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          LUCAS&apos; AIRPODS
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group shrink-0">
          <Image
            src={track.albumArt}
            alt="Album Art"
            width={144}
            height={144}
            className="w-36 h-36 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute -bottom-2 -right-2 bg-black p-1.5 rounded-full border border-white/10 shadow-lg">
            <SpotifyLogo className="w-5 h-5 text-[#1DB954]" />
          </div>
        </div>

        <div className="flex-1 min-w-0 w-full">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1DB954] mb-3 flex items-center justify-center sm:justify-start gap-2">
            <div className="flex items-end gap-[3px] h-3.5">
              <div className="w-[3px] bg-[#1DB954] rounded-full animate-[bounce_1s_ease-in-out_infinite]" style={{ height: "60%" }} />
              <div className="w-[3px] bg-[#1DB954] rounded-full animate-[bounce_1s_ease-in-out_0.2s_infinite]" style={{ height: "100%" }} />
              <div className="w-[3px] bg-[#1DB954] rounded-full animate-[bounce_1s_ease-in-out_0.4s_infinite]" style={{ height: "40%" }} />
            </div>
            Now Playing
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-black truncate text-white mb-0.5 tracking-tight">
              {track.title}
            </h2>
            <p className="text-gray-400 font-semibold truncate mb-4">{track.artist}</p>
          </div>

          <div className="space-y-2">
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#1DB954] h-full rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-gray-500 tracking-wider">
              <span>{formatTime(progressMs)}</span>
              <span>{formatTime(track.durationMs)}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl transition-colors pointer-events-none bg-[#1DB954]/20 group-hover:bg-[#1DB954]/30"
        aria-hidden
      />
    </div>
  );
}

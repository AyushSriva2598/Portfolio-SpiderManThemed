import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { loadYouTubeIFrameAPI } from "../../lib/youtube";

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function Turntable() {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const currentTrack = PORTFOLIO_DATA.tracks[currentTrackIndex];
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Initialize YouTube Player
  useEffect(() => {
    let isCancelled = false;

    loadYouTubeIFrameAPI().then(() => {
      if (isCancelled || !containerRef.current || !window.YT) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: PORTFOLIO_DATA.tracks[0].videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => setIsPlayerReady(true),
          onStateChange: (event) => {
            setIsPlaying(event.data === 1);
            if (event.data === 0) {
              // Track finished -> auto loop or seek to 0
              try {
                playerRef.current?.seekTo(0, true);
                playerRef.current?.playVideo();
              } catch {
                // Ignore errors
              }
            }
          },
        },
      });
    });

    return () => {
      isCancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        // Ignore errors
      }
    };
  }, []);

  // Update playback time ticker
  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      const player = playerRef.current;
      if (player) {
        try {
          const current = player.getCurrentTime();
          const dur = player.getDuration();
          setCurrentTime(current);
          if (dur > 0) setDuration(dur);
        } catch {
          // Ignore errors
        }
      }
    }, 500);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  // Track switching
  const handleSwitchTrack = (index) => {
    const total = PORTFOLIO_DATA.tracks.length;
    const nextIndex = (index + total) % total;
    const wasPlaying = isPlaying;

    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
    setDuration(0);

    const player = playerRef.current;
    if (player) {
      try {
        const nextVideoId = PORTFOLIO_DATA.tracks[nextIndex].videoId;
        if (wasPlaying) {
          player.loadVideoById(nextVideoId);
        } else {
          player.cueVideoById(nextVideoId);
        }
      } catch {
        // Ignore errors
      }
    }
  };

  // Play / Pause toggle
  const handleTogglePlay = () => {
    const player = playerRef.current;
    if (!player || !isPlayerReady) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  // Scrub progress
  const handleSeek = (clientX, targetEl) => {
    const player = playerRef.current;
    if (!player || duration <= 0) return;

    const rect = targetEl.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const targetSeconds = ratio * duration;

    player.seekTo(targetSeconds, true);
    setCurrentTime(targetSeconds);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Vinyl Record Visual with Arm */}
        <div className="relative h-20 w-20 flex-none sm:h-24 sm:w-24" aria-hidden="true">
          {/* Shadow */}
          <div className="absolute -bottom-2 left-1/2 h-3 w-[85%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-md" />

          {/* Rotating Vinyl Grooves */}
          <div
            className="relative h-full w-full rounded-full"
            style={{
              background: [
                "repeating-radial-gradient(circle at center, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
                "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.16) 14deg, transparent 38deg, transparent 140deg, rgba(255,255,255,0.09) 158deg, transparent 176deg, transparent 280deg, rgba(255,255,255,0.13) 296deg, transparent 318deg)",
                "radial-gradient(circle, #121212 0%, #0b0b0b 62%, #050505 100%)",
              ].join(", "),
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.08), 0 12px 28px rgba(0,0,0,0.75)",
              animation: "vinyl-spin 2.5s linear infinite",
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          >
            {/* Center Record Label */}
            <div
              className="absolute inset-[29%] rounded-full"
              style={{
                background: "radial-gradient(circle at 40% 35%, #2c2c2c, #141414 72%)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
              }}
            >
              {/* Spindle Hole */}
              <div className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-neutral-200" />
            </div>
          </div>

          {/* Glossy Sheen Highlight */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.10), transparent 45%)",
            }}
          />

          {/* Turntable Tone Arm */}
          <div
            className="pointer-events-none absolute z-10"
            style={{
              top: "-6px",
              right: "-6px",
              transformOrigin: "40px 5px",
              transform: isPlaying ? "rotate(28deg)" : "rotate(-5deg)",
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <svg width="44" height="56" viewBox="0 0 44 56" fill="none">
              <circle cx="40" cy="5" r="4" fill="#6b6b6b" />
              <circle cx="40" cy="5" r="2" fill="#c0c0c0" />
              <line
                x1="40"
                y1="5"
                x2="8"
                y2="50"
                stroke="url(#toneGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <rect
                x="3"
                y="46"
                width="8"
                height="3.5"
                rx="1"
                fill="#999"
                transform="rotate(-52 7 47.5)"
              />
              <circle cx="5" cy="52" r="1.4" fill="#e0e0e0" />
              <defs>
                <linearGradient
                  id="toneGrad"
                  x1="40"
                  y1="5"
                  x2="8"
                  y2="50"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#888" />
                  <stop offset="45%" stopColor="#d4d4d4" />
                  <stop offset="100%" stopColor="#777" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Track Info & Controls */}
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--soft)]">
            Now Playing
          </p>

          <div className="mt-0.5 flex items-center">
            {/* Title */}
            <p className="w-[220px] truncate text-[15px] font-medium text-[var(--fg)]">
              {currentTrack.title}
            </p>

            {/* Controls */}
            <div className="flex flex-none items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => handleSwitchTrack(currentTrackIndex - 1)}
                aria-label="Previous track"
                className="cursor-pointer text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
              >
                <SkipBack size={16} fill="currentColor" />
              </button>

              <button
                type="button"
                onClick={handleTogglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-600 text-[var(--fg)] transition-all hover:scale-105 hover:border-neutral-200 active:scale-95"
              >
                {isPlaying ? (
                  <Pause size={16} fill="currentColor" />
                ) : (
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSwitchTrack(currentTrackIndex + 1)}
                aria-label="Next track"
                className="cursor-pointer text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
              >
                <SkipForward size={16} fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Artist */}
          <p className="truncate font-mono text-[11px] text-[var(--muted)]">
            {currentTrack.artist}
          </p>

          {/* Progress Slider */}
          <div
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(currentTime)}
            className="group mt-3 flex h-4 cursor-pointer items-center"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              handleSeek(e.clientX, e.currentTarget);
            }}
            onPointerMove={(e) => {
              if (e.buttons === 1) handleSeek(e.clientX, e.currentTarget);
            }}
          >
            <div className="relative h-[3px] w-full rounded-full bg-neutral-800 transition-colors group-hover:bg-neutral-700">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-neutral-100"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Timestamps */}
          <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-[var(--soft)]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Hidden YouTube IFrame */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-[200px] w-[200px] opacity-0"
        aria-hidden="true"
      >
        <div ref={containerRef} />
      </div>
    </div>
  );
}

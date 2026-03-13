import { useRef, useState, useCallback } from "react";

export const useVideoControls = (src: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const toggleFullscreen = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await videoRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.log("Fullscreen error:", err);
    }
  }, []);

  const togglePiP = useCallback(async () => {
    if (!videoRef.current || !document.pictureInPictureEnabled) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.log("PiP error:", err);
    }
  }, []);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * videoRef.current.duration;
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    setProgress(duration ? (currentTime / duration) * 100 : 0);
  }, []);

  return {
    videoRef,
    isPlaying,
    isMuted,
    progress,
    isFullscreen,
    togglePlay,
    toggleMute,
    toggleFullscreen,
    togglePiP,
    seek,
    formatTime,
    handleTimeUpdate,
    onEnded: () => setIsPlaying(false),
  };
};
"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface UseCameraProps {
  isOpen: boolean;
  onCapture: (file: File) => void;
  onClose: () => void;
}

export function useCamera({ isOpen, onCapture, onClose }: UseCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const stopCamera = useCallback((mediaStream: MediaStream | null) => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError(
          "Your browser does not support camera access or it is disabled.",
        );
        return null;
      }
      const constraints = {
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };
      const mediaStream =
        await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      return mediaStream;
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        "Could not access your camera. Please ensure you have given permission and that no other app is using it.",
      );
      return null;
    }
  }, []);

  useEffect(() => {
    let currentStream: MediaStream | null = null;

    const init = async () => {
      if (isOpen) {
        currentStream = await startCamera();
      }
    };

    init();

    return () => {
      if (currentStream) {
        stopCamera(currentStream);
        setStream(null);
      }
    };
  }, [isOpen, startCamera, stopCamera]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], "captured-image.jpg", {
                type: "image/jpeg",
              });
              onCapture(file);
              onClose();
            }
          },
          "image/jpeg",
          0.9,
        );
      }
    }
  };

  return {
    videoRef,
    canvasRef,
    error,
    stream,
    startCamera,
    capturePhoto,
  };
}

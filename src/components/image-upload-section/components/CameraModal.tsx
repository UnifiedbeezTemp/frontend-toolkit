import React from "react";
import Modal from "../../modal/Modal";
import Button from "../../ui/Button";
import ImageComponent from "../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import { useCamera } from "../hooks/useCamera";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

export default function CameraModal({
  isOpen,
  onClose,
  onCapture,
}: CameraModalProps) {
  const icons = useSupabaseIcons();

  const { videoRef, canvasRef, error, stream, startCamera, capturePhoto } =
    useCamera({ isOpen, onCapture, onClose });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title="Take a Photo">
      <div className="p-6 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-6">
          <Heading size="sm">Take a Photo</Heading>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors"
          >
            <ImageComponent
              src={icons.close}
              alt="close"
              width={20}
              height={20}
              className="brightness-0"
            />
          </button>
        </div>

        <div className="relative w-full h-[40rem] bg-secondary rounded-xl overflow-hidden mb-6 flex items-center justify-center border border-border">
          {error ? (
            <div className="p-6 text-center">
              <Text className="text-primary mb-4">{error}</Text>
              <Button onClick={startCamera} variant="secondary">
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {!stream && (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                  <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              )}
            </>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        <div className="flex gap-4 w-full">
          <Button onClick={onClose} variant="secondary" className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={capturePhoto}
            disabled={!stream}
            className="flex-1 bg-brand-primary text-primary"
          >
            Capture Photo
          </Button>
        </div>
      </div>
    </Modal>
  );
}

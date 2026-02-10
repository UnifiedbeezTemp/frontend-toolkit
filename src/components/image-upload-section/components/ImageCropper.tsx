import React from "react";
import Cropper from "react-easy-crop";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import { useImageCropper } from "../hooks/useImageCropper";

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (file: File) => void;
  onCancel: () => void;
}

export default function ImageCropper({
  imageSrc,
  onCropComplete,
  onCancel,
}: ImageCropperProps) {
  const icons = useSupabaseIcons();

  const {
    crop,
    zoom,
    loading,
    onCropChange,
    onZoomChange,
    onCropCompleteHandler,
    handleSave,
  } = useImageCropper({ imageSrc, onCropComplete });

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-primary p-[2.4rem] rounded-[1.2rem] w-full max-w-[50rem] relative flex flex-col h-[90vh] md:h-auto border border-border overflow-hidden">
        <div className="flex justify-between items-center mb-[1.6rem]">
          <Heading size="sm">Edit Photo</Heading>
          <button
            onClick={onCancel}
            className="p-[0.8rem] rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <ImageComponent
              src={icons.close}
              alt="close"
              width={20}
              height={20}
              className="w-[2rem] h-[2rem]"
            />
          </button>
        </div>

        <div className="relative w-full h-[30rem] md:h-[40rem] bg-secondary rounded-[0.8rem] overflow-hidden mb-[2.4rem] border border-border">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteHandler}
            cropShape="round"
            showGrid={false}
            style={{
              containerStyle: { backgroundColor: "var(--secondary)" },
            }}
          />
        </div>

        <div className="mb-[2.4rem] px-[0.4rem]">
          <div className="flex justify-between items-center mb-[0.8rem]">
            <Text size="sm" className="font-medium text-text-primary">
              Zoom
            </Text>
            <Text size="xs" className="text-text-secondary">
              {Math.round(zoom * 100)}%
            </Text>
          </div>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => onZoomChange(Number(e.target.value))}
            className="w-full h-[0.6rem] bg-gray-200 rounded-[0.4rem] appearance-none cursor-pointer accent-brand-primary"
          />
        </div>

        <div className="flex gap-[1.6rem] mt-auto">
          <Button
            onClick={onCancel}
            variant="secondary"
            className="flex-1 py-[1rem] px-[1.6rem] text-[1.4rem] font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-brand-primary text-primary hover:bg-green-90 py-[1rem] px-[1.6rem] text-[1.4rem] font-bold transition-colors"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Photo"}
          </Button>
        </div>
      </div>
    </div>
  );
}

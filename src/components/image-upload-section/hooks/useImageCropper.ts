import { useState, useCallback } from "react";
import { Area } from "react-easy-crop";
import getCroppedImg from "../utils/canvasUtils";

interface UseImageCropperProps {
  imageSrc: string;
  onCropComplete: (file: File) => void;
}

export const useImageCropper = ({
  imageSrc,
  onCropComplete,
}: UseImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [loading, setLoading] = useState(false);

  const onCropChange = useCallback((crop: { x: number; y: number }) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const onCropCompleteHandler = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleSave = useCallback(async () => {
    if (!croppedAreaPixels) return;

    try {
      setLoading(true);
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedImage) {
        onCropComplete(croppedImage);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [imageSrc, croppedAreaPixels, onCropComplete]);

  return {
    crop,
    zoom,
    loading,
    onCropChange,
    onZoomChange,
    onCropCompleteHandler,
    handleSave,
  };
};

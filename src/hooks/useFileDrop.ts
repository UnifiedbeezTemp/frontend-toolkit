import { useState, useCallback, DragEvent } from "react";

interface UseFileDropOptions {
  onDrop?: (files: FileList) => void;
  allowedTypes?: string[];
}

export function useFileDrop(options: UseFileDropOptions = {}) {
  const [isOver, setIsOver] = useState(false);

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(true);
  }, []);

  const onDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOver(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        if (options.allowedTypes) {
          const allAllowed = Array.from(files).every((file) =>
            options.allowedTypes?.some((type) => {
              if (type.startsWith(".")) {
                return file.name.toLowerCase().endsWith(type.toLowerCase());
              }
              return file.type.match(new RegExp(type.replace("*", ".*")));
            })
          );

          if (!allAllowed) {
            // Optional: Handle error feedback here or return it
            return;
          }
        }
        options.onDrop?.(files);
      }
    },
    [options]
  );

  return {
    isOver,
    bind: {
      onDragOver,
      onDragEnter,
      onDragLeave,
      onDrop,
    },
  };
}

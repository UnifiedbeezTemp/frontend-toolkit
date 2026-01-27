import React from "react";
import ImageComponent from "../../ui/ImageComponent";

interface ImagePreviewProps {
  previewUrl: string | null;
  image: string | null;
  type: "profile" | "logo" | "banner";
  displayName?: string;
  getInitials: (name: string) => string;
  icons: Record<string, string>;
  sizeClasses: Record<string, string>;
  size: "sm" | "md" | "lg" | "xs";
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  previewUrl,
  image,
  type,
  displayName,
  getInitials,
  icons,
  sizeClasses,
  size,
}) => {
  if (previewUrl) {
    return (
      <ImageComponent
        src={previewUrl}
        alt={`${type} preview`}
        width={500}
        height={500}
        className={`${sizeClasses[size]} rounded-full object-cover object-center`}
      />
    );
  }

  if (image) {
    return (
      <ImageComponent
        src={image}
        alt={`${type} preview`}
        width={500}
        height={500}
        className={`${sizeClasses[size]} rounded-full object-cover object-center`}
      />
    );
  }

  if (type === "logo") {
    return (
      <div
        className={`flex items-center text-[2rem] text-text-primary justify-center w-full h-full bg-border/20 rounded-full`}
      >
        {displayName ? (
          getInitials(displayName)
        ) : (
          <ImageComponent
            src={icons.profileActive}
            alt={`${type} preview`}
            width={500}
            height={500}
            className={`rounded-full object-cover object-center`}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center text-[2rem] text-text-primary justify-center w-full h-full bg-border/20 rounded-full`}
    >
      {displayName ? (
        getInitials(displayName)
      ) : (
        <ImageComponent
          src={icons.preferenceActive}
          alt={`${type} preview`}
          width={100}
          height={100}
          className={`rounded-full object-cover object-center hidden`}
        />
      )}
    </div>
  );
};

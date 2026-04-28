import React from "react";
import Button from "../../ui/Button";
import ImageComponent from "../../ui/ImageComponent";
import { cn } from "../../../lib/utils";

interface ChannelCardCTAProps {
  isSelected: boolean;
  comingSoon: boolean;
  canEdit?: boolean;
  isLoading: boolean;
  editIcon: string;
  onToggle: () => void;
  onEdit: () => void;
}

export const ChannelCardCTA: React.FC<ChannelCardCTAProps> = ({
  isSelected,
  comingSoon,
  canEdit,
  isLoading,
  editIcon,
  onToggle,
  onEdit,
}) => {
  if (comingSoon) {
    return (
      <Button
        variant="secondary"
        className="w-full border-0 rounded-[0.8rem] bg-input-filled text-text-secondary cursor-not-allowed"
        disabled
      >
        Select
      </Button>
    );
  }

  if (canEdit) {
    return (
      <Button
        variant={isSelected ? "secondary" : "primary"}
        className={cn(
          "w-full rounded-[0.8rem] text-[1.4rem] py-[1rem]",
          isSelected ? "bg-input-filled" : "",
        )}
        onClick={isSelected ? onEdit : onToggle}
        loading={isLoading}
        disabled={isLoading}
      >
        {isSelected ? (
          <>
            <ImageComponent
              alt="edit"
              className="ml-[-4px]"
              src={editIcon}
              width={30}
              height={30}
            />{" "}
            Edit settings
          </>
        ) : (
          "Select"
        )}
      </Button>
    );
  }

  return (
    <Button
      variant={isSelected ? "secondary" : "primary"}
      className="w-full rounded-[0.8rem]"
      onClick={onToggle}
      loading={isLoading}
      disabled={isLoading}
    >
      {isSelected ? "Unselect" : "Select"}
    </Button>
  );
};

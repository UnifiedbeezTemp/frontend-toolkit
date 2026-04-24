import React from "react";
import ImageComponent from "../../ui/ImageComponent";
import Button from "../../ui/Button";
import { cn } from "../../../lib/utils";

interface ChannelCardHeaderProps {
  name: string;
  icon: string;
  comingSoon: boolean;
  allowed: boolean;
  requiredAddon: string | null;
  linkExternalIcon: string;
  onAddonClick: () => void;
}

export const ChannelCardHeader: React.FC<ChannelCardHeaderProps> = ({
  name,
  icon,
  comingSoon,
  allowed,
  requiredAddon,
  linkExternalIcon,
  onAddonClick,
}) => {
  return (
    <div className="flex flex-col gap-[1rem] xl:flex-row items-start justify-between">
      <div className="shrink-0 w-[5rem] h-[5rem]">
        <ImageComponent
          alt={name}
          src={icon}
          width={60}
          height={60}
          className={cn("w-full h-full", comingSoon && "grayscale")}
        />
      </div>

      {!allowed && requiredAddon && (
        <Button
          size="sm"
          variant="secondary"
          className="text-brand-primary underline text-[1rem] lg:text-[1.4rem] leading-[2.07rem] font-[700] flex items-center gap-[0.5rem] shrink-0"
          onClick={onAddonClick}
        >
          Add-on required{" "}
          <ImageComponent
            alt="link"
            className="ml-[-4px]"
            src={linkExternalIcon}
            width={20}
            height={20}
          />
        </Button>
      )}
    </div>
  );
};

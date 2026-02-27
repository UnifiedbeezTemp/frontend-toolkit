import React from "react";
import ImageComponent from "../../../ui/ImageComponent";
import CloseModalButton from "../../../modal/CloseModalButton";

interface SelectionHeaderProps {
  icons: { whatsappIcon: string };
  onClose: () => void;
}

export function SelectionHeader({ icons, onClose }: SelectionHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-[1.5rem] mb-[2.4rem] pb-[1.6rem] border-b border-border sticky top-0 bg-primary z-[10]">
        <div className="flex items-center gap-[1.6rem]">
          <div className="w-[4.8rem] h-[4.8rem] rounded-[1rem] border border-solid-green flex items-center justify-center shrink-0">
            <ImageComponent
              src={icons.whatsappIcon}
              alt="WhatsApp"
              width={24}
              height={24}
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[1.8rem] sm:text-[2rem] lg:text-[2.4rem] font-bold text-text-secondary leading-tight">
              WhatsApp templates
            </h2>
            <p className="text-[1.4rem] text-text-primary hidden lg:block">
              Create a custom Webchat for a website of your choice.{" "}
              <span className="underline text-brand-primary font-medium cursor-pointer">
                Learn more
              </span>
            </p>
          </div>
        </div>
        <CloseModalButton onClick={onClose} />
      </div>

      <p className="text-[1.4rem] text-text-primary lg:hidden block mb-[1.6rem]">
        Create a custom Webchat for a website of your choice.{" "}
        <span className="underline text-brand-primary font-medium cursor-pointer">
          Learn more
        </span>
      </p>
    </>
  );
}

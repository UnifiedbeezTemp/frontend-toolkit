"use client";

import Button from "../../ui/Button";
import ImageComponent from "../../ui/ImageComponent";
import { useAIInput } from "./hooks/useAIInput";

interface Props {
  sendIcon: string;
}

export default function AIInput({ sendIcon }: Props) {
  const { inputValue, handleInputChange } = useAIInput();

  return (
    <div
      className="rounded-[1.2rem] bg-popover p-[1.6rem] relative mt-[2.4rem] lg:min-h-[16rem] lg:min-h-auto flex bg-primary lg:flex-row items-center w-full"
      style={{
        background: `
          linear-gradient(white, white) padding-box,
          linear-gradient(to right, var(--brand-primary), var(--brand-secondary)) border-box
        `,
        border: "2px solid transparent",
        borderRadius: "1.2rem",
      }}
    >
      <div className="flex items-center gap-[1.2rem] flex-1">
        <div className="border border-border rounded-md p-[0.4rem] shrink-0 flex items-center justify-center w-[3.6rem] h-[3.6rem]">
          <ImageComponent
            src="/images/logo.svg"
            alt="logo"
            width={24}
            height={24}
          />
        </div>

        <input
          className="border-none flex-1 shadow-none focus:shadow-none bg-transparent resize-none outline-none text-[1.2rem] sm:text-[1.6rem]  placeholder:text-inactive-color lg:min-h-[10rem] lg:min-h-auto mt-[rem]"
          placeholder="Create anything with a simple sentence"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div> 

      <div className="flex justify-end mt-[1rem] md:mt-0">
        <Button className="grad-btn p-[0.8rem] rounded-[0.8rem] w-[4rem] h-[4rem] flex items-center justify-center">
          <ImageComponent
            src={sendIcon}
            alt="send"
            width={20}
            height={20}
            className="brightness-0 invert"
          />
        </Button>
      </div>
    </div>
  );
}

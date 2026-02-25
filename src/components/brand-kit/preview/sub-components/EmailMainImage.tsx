"use client";

import React from "react";
import ImageComponent from "../../../ui/ImageComponent";

interface Props {
  src: string;
}

export default function EmailMainImage({ src }: Props) {
  return (
    <div className="w-full px-[3rem]">
      <ImageComponent
        src={src}
        alt="image"
        width={500}
        height={500}
        className="rounded-[1.5rem] h-[20rem] object-cover mt-[4rem] w-full"
      />
    </div>
  );
}

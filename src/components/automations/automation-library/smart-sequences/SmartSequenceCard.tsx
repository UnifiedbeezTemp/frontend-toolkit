"use client";

import React from "react";
import Image from "next/image";
import { SmartSequence } from "./types";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import Button from "../../../ui/Button";
import ImageComponent from "../../../ui/ImageComponent";

interface SmartSequenceCardProps {
  sequence: SmartSequence;
  onUse: (id: string) => void;
}

export default function SmartSequenceCard({
  sequence,
  onUse,
}: SmartSequenceCardProps) {
  const icons = useSupabaseIcons();

  const sequenceIcon =
    icons[sequence.iconKey as keyof typeof icons] || icons.featuredIcon1;

  if (sequence.isCustom) {
    return <BuildYourFlowCard onUse={() => onUse(sequence.id)} />;
  }

  return (
    <div className="flex flex-col h-full rounded-[1.2rem] border border-[var(--input-stroke)] bg-[var(--primary)] overflow-hidden transition-all hover:shadow-md">
      <CardIconArea icon={sequenceIcon} />
      <CardContent sequence={sequence} />
      <CardFooter onUse={() => onUse(sequence.id)} />
    </div>
  );
}

function BuildYourFlowCard({ onUse }: { onUse: () => void }) {
  const icons = useSupabaseIcons();

  return (
    <button
      onClick={onUse}
      className="flex flex-col items-center justify-center h-full min-h-[34rem] rounded-[1.2rem] border border-[var(--input-stroke)] bg-[var(--primary)] overflow-hidden transition-all hover:border-[var(--brand-primary)] hover:shadow-md group"
    >
       <div className="flex px-[1.6rem] pt-[1.6rem] pb-[.8rem]">
      <div className="relative rounded-[1rem] bg-[var(--primary)] border border-[var(--input-stroke)] h-[10rem] w-[13rem] flex items-center justify-center shadow-sm">
        <Image
          src={icons.net}
          alt=""
          width={60}
          height={60}
          className="object-contain absolute top-0 bottom-0 w-full h-full"
        />
        <Image
          src={icons.copy}
          alt=""
          width={20}
          height={20}
          className="object-contain z-[10]"
        />
      </div>
    </div>
      <span className="text-[1.4rem] font-bold text-center text-[var(--text-primary)]">
        Build Your Flow
      </span>
    </button>
  );
}

function CardIconArea({ icon }: { icon: string }) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex px-[1.6rem] pt-[1.6rem] pb-[.8rem]">
      <div className="relative rounded-[1rem] bg-[var(--primary)] border border-[var(--input-stroke)] p-[2rem] flex items-center justify-center shadow-sm">
        <Image
          src={icons.net}
          alt=""
          width={60}
          height={60}
          className="object-contain absolute top-0 bottom-0 w-full h-full"
        />
        <Image
          src={icon}
          alt=""
          width={60}
          height={60}
          className="object-contain z-[10]"
        />
        <div className="absolute top-[1.5rem] right-[1rem] z-[20] w-[2rem] h-[2rem] rounded-full bg-destructive flex items-center justify-center">
          <span className="text-[0.9rem] font-bold leading-none">
             <Image
          src={icons.cart}
          alt=""
          width={10}
          height={10}
          className=""
        />
          </span>
        </div>
      </div>
    </div>
  );
}

function CardContent({ sequence }: { sequence: SmartSequence }) {
  return (
    <div className="flex flex-col gap-[0.8rem] px-[1.6rem] pb-[0.8rem] flex-1">
      <span className="self-start px-[1rem] py-[0.3rem] rounded-full border border-input-stroke text-[1rem] font-semibold text-[var(--dark-base-40)] tracking-wide">
        {sequence.industry}
      </span>

      <h3 className="text-[1.22rem] font-bold text-[var(--text-primary)] leading-[148%] line-clamp-2">
        {sequence.title}
      </h3>

      <p className="text-[1.2rem] text-[var(--dark-base-40)] leading-[160%] line-clamp-3">
        {sequence.description}{" "}
        {/* <button className="text-[var(--brand-primary)] font-bold hover:underline">
          Read more
        </button> */}
      </p>
    </div>
  );
}

function CardFooter({ onUse }: { onUse: () => void }) {
  return (
    <div className="px-[1.6rem] pb-[1.6rem]">
      <Button
        onClick={onUse}
        className="grad-btn py-[.6rem] px-[1.8rem] text-[1.2rem]"
      >
        Use Sequences
      </Button>
    </div>
  );
}

"use client";

import React from "react";
import ImageComponent from "../../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";

interface Template {
  title: string;
  description: string;
  tag: string;
  image: string;
  icon?: string;
}

interface TemplateGridProps {
  templates: Template[];
  selectedTemplateIndex: number;
  setSelectedTemplateIndex: (index: number) => void;
}

export default function TemplateGrid({
  templates,
  selectedTemplateIndex,
  setSelectedTemplateIndex,
}: TemplateGridProps) {
  return (
    <div className="py-[20px] grid grid-cols-2 lg:grid-cols-4 gap-[10px]">
      {templates.map((template, idx) => (
        <TemplateCard
          key={idx}
          template={template}
          index={idx}
          isSelected={selectedTemplateIndex === idx}
          onClick={() => setSelectedTemplateIndex(idx)}
        />
      ))}
    </div>
  );
}

interface TemplateCardProps {
  template: Template;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

function TemplateCard({
  template,
  index,
  isSelected,
  onClick,
}: TemplateCardProps) {
  return (
    <div
      onClick={onClick}
      className={`${
        isSelected
          ? "border-brand-primary layout-body shadow-lg ring-1 ring-brand-primary/20"
          : "border-border"
      } border p-[10px] rounded-lg relative lg:min-h-[29.5rem] cursor-pointer transition-all duration-200 hover:border-brand-primary/40 bg-white`}
    >
      <div className="sm:flex items-center gap-[1rem] lg:block">
        <TemplateImage
          template={template}
          index={index}
          isSelected={isSelected}
        />

        <TemplateContent template={template} />
      </div>
    </div>
  );
}

function TemplateImage({
  template,
  index,
  isSelected,
}: {
  template: Template;
  index: number;
  isSelected: boolean;
}) {
  const supabaseIcons = useSupabaseIcons();

  return (
    <div
      className={`${
        isSelected ? "border-brand-primary/60" : "border-border"
      } border rounded-lg inline-block mb-[10px] relative overflow-hidden`}
    >
      <ImageComponent
        alt="net"
        src={supabaseIcons.net}
        width={100}
        height={100}
        className="lg:w-[10rem] w-[5rem] sm:w-[8rem] object-cover"
      />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <ImageComponent
          alt={template.title}
          src={template.image}
          width={index === 0 ? 30 : 50}
          height={index === 0 ? 30 : 50}
        />
        {template.icon && (
          <div
            className={`${
              index === 1 ? "bg-destructive rounded-full p-[4px]" : ""
            } absolute top-[-10px] right-[-10px]`}
          >
            <ImageComponent
              alt="icon"
              src={template.icon}
              width={index === 1 ? 15 : 25}
              height={index === 1 ? 15 : 25}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function TemplateContent({ template }: { template: Template }) {
  const supabaseIcons = useSupabaseIcons();

  return (
    <div className="">
      <div className="inline-flex p-[.3rem] lg:p-[.5rem] items-center gap-[5px] bg-border/20 rounded-lg">
        <ImageComponent
          alt="box"
          src={supabaseIcons.box}
          width={20}
          height={20}
        />
        <p className="text-text-primary/50 text-[1rem] font-medium">
          {template.tag}
        </p>
      </div>

      <p className="text-text-primary font-bold text-[1.4rem] lg:text-[1.6rem] mt-2">
        {template.title}
      </p>
      <p className="text-text-primary font-normal text-[1.2rem] mt-1 hidden lg:block opacity-60">
        {template.description}
      </p>
    </div>
  );
}

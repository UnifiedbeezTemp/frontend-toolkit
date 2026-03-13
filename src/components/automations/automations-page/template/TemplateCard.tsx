"use client";

import TemplateModal from "./TemplateModal";
import { Template } from "../utils/data";
import { useTemplateCard } from "../hooks/useTemplateCard";
import ImageComponent from "../../../ui/ImageComponent";
import Heading from "../../../ui/Heading";
import Button from "../../../ui/Button";
import Text from "../../../ui/Text";

interface Props {
  template: Template;
}

export default function TemplateCard({ template }: Props) {
  const { showModal, openModal, closeModal, icons, handleGetStarted } =
    useTemplateCard();

  return (
    <>
      <div className="border border-border rounded-[16px] p-[1.6rem] flex flex-col sm:flex-row items-start sm:items-center justify-between mt-[1.6rem] bg-primary cursor-pointer transition-colors gap-[1.6rem] sm:gap-0">
        <div className="flex flex-col sm:flex-row items-start gap-[1.6rem] w-full sm:w-auto">
          <div className="flex items-center justify-center shrink-0">
            <ImageComponent
              src={template.icon}
              alt={template.title}
              width={100}
              height={100}
            />
          </div>
          <div className="space-y-[1.6rem] w-full">
            <div>
              <Heading size="sm" className="text-text-primary">
                {template.title}
              </Heading>
              <Text size="sm" className="mt-[0.8rem]">
                {template.description}
              </Text>
            </div>

            <Button
              className="px-[1.6rem] py-[.7rem] rounded-[0.8rem] sm:w-auto"
              size="sm"
              onClick={() => handleGetStarted(template)}
            >
              Get started
            </Button>
          </div>
        </div>

        <button
          onClick={openModal}
          className="relative w-full sm:w-[15.6rem] h-[18rem] sm:h-[13.6rem] rounded-[1rem] shadow-md overflow-hidden bg-gray-100 shrink-0 mt-[1.6rem] sm:mt-0"
        >
          <video
            src={template.video}
            className="w-full h-full object-cover"
            muted
            preload="metadata"
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
            <div className="w-[3.2rem] h-[3.2rem] bg-primary rounded-full flex items-center justify-center">
              <ImageComponent
                src={icons.playGreen1}
                alt=""
                width={20}
                height={20}
              />
            </div>
            <p className="text text-white font-[700] text-[1rem] mt-2">
              Watch tutorial
            </p>
          </div>
        </button>
      </div>

      <TemplateModal
        template={template}
        isOpen={showModal}
        onClose={closeModal}
      />
    </>
  );
}

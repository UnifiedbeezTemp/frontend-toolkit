"use client";

import TemplateVideoPlayer from "./TemplateVideoPlayer";
import { useTemplateCard } from "../hooks/useTemplateCard";
import TemplateInfo from "./TemplateInfo";
import { Template } from "../utils/data";
import ImageComponent from "next/image";
import CloseModalButton from "../../../modal/CloseModalButton";
import Modal from "../../../modal/Modal";
import ModalHeader from "../../../modal/ModalHeader";
import Button from "../../../ui/Button";

interface Props {
  template: Template;
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplateModal({ template, isOpen, onClose }: Props) {
  const { handleGetStarted } = useTemplateCard();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      className="max-h-[95dvh] rounded-se-[2.4rem] rounded-ss-[2.4rem] sm:rounded-[2.4rem]"
      bottomSheet
    >
      <div className="px-[2.4rem] pb-[4rem]">
        <ModalHeader
          text={`${template.title} Settings`}
          description={`Embed ${template.title} automation`}
          className="pt-[1.6rem] pb-[.5rem]"
          action={<CloseModalButton onClick={onClose} />}
          leftContent={
            <ImageComponent
              src={template.icon}
              alt={template.title}
              width={45}
              height={45}
            />
          }
        />

        <div className="mt-[2.4rem] space-y-[2.4rem]">
          <TemplateVideoPlayer src={template.video} />
          <TemplateInfo
            description={template.info.desription}
            lists={template.info.lists}
          />

          <div className="flex gap-4">
            <Button variant="secondary" className="flex-1" onClick={onClose}>
              Go back
            </Button>
            <Button className="flex-1" onClick={() => handleGetStarted(template)}>
              Go to dashboard
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

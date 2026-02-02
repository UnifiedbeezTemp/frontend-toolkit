"use client";

import Modal from "../../../components/modal/Modal";
import Button from "../../../components/ui/Button";
import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";
import ImageComponent from "../../../components/ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

interface RedirectNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export default function RedirectNoticeModal({
  isOpen,
  onClose,
  onProceed,
}: RedirectNoticeModalProps) {
  const icons = useSupabaseIcons();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="bg-primary rounded-[2rem] p-[2.4rem] w-[90dvw] max-w-[44rem]"
      closeOnOverlayClick={false}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-[2rem] rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 p-[1.6rem]">
          <ImageComponent
            src={icons.linkExternal2}
            alt="External Link"
            width={48}
            height={48}
            className="w-[4.8rem] h-[4.8rem]"
          />
        </div>

        <Heading size="xl" className="text-[2rem] font-bold mb-[0.8rem]">
          Ready to Connect Your Channels?
        </Heading>

        <Text
          size="md"
          className="text-text-secondary mb-[2.4rem] max-w-[36rem] leading-relaxed"
        >
          To connect some channels, you&apos;ll be redirected to their
          respective platforms to authorize the connection. This is required to
          securely link your accounts.
        </Text>

        <div className="bg-secondary/50 rounded-[1.2rem] p-[1.6rem] mb-[2.4rem] w-full">
          <div className="flex items-start gap-[1.2rem]">
            <div className="shrink-0 mt-[0.2rem]">
              <ImageComponent
                src={icons.infoGreen}
                alt="Info"
                width={20}
                height={20}
                className="w-[2rem] h-[2rem]"
              />
            </div>
            <Text size="sm" className="text-left text-text-secondary">
              After authorizing on the external platform, you&apos;ll be
              automatically redirected back to complete the setup.
            </Text>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-[1.2rem] w-full">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1 py-[1.2rem]"
          >
            Go Back
          </Button>
          <Button
            variant="primary"
            onClick={onProceed}
            className="flex-1 py-[1.2rem]"
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
}

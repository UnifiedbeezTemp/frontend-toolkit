"use client";

import Modal from "../../../components/modal/Modal";
import Button from "../../../components/ui/Button";
import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";
import ImageComponent from "../../../components/ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { useRedirectModalContext } from "../context/RedirectModalContext";

export default function RedirectModal() {
  const icons = useSupabaseIcons();
  const { isOpen, redirectInfo, handleClose, handleProceed } =
    useRedirectModalContext();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="bg-primary rounded-[2.4rem] w-[90dvw] max-w-[42rem] overflow-hidden"
      closeOnOverlayClick={false}
    >
      <div className="relative">
       

        <div className="relative px-[2.4rem] pt-[3.2rem] pb-[2.4rem]">
          <div className="flex justify-center mb-[2rem]">
            <div className="relative">
              <div className="w-[7.2rem] h-[7.2rem] rounded-full bg-gradient-to-br from-brand-primary to-brand-primary flex items-center justify-center border border-brand-primary/10 shadow-lg shadow-brand-primary/10">
                {redirectInfo?.channelIcon ? (
                  <ImageComponent
                    src={redirectInfo.channelIcon}
                    alt={redirectInfo.channelName}
                    width={36}
                    height={36}
                    className="w-[3.6rem] h-[3.6rem]"
                  />
                ) : (
                  <ImageComponent
                    src={icons.linkExternal2}
                    alt="External Link"
                    width={32}
                    height={32}
                    className="w-[3.2rem] h-[3.2rem] opacity-80"
                  />
                )}
              </div>
            </div>
          </div>

          <Heading
            size="xl"
            className="text-[2rem] font-bold text-center mb-[0.8rem]"
          >
            Redirecting to {redirectInfo?.channelName || "External Platform"}
          </Heading>

          <Text
            size="md"
            className="text-text-secondary text-center mb-[2rem] leading-relaxed mx-auto"
          >
            You&apos;ll be redirected to{" "}
            <span className="font-semibold text-brand-primary">
              {redirectInfo?.channelName}
            </span>{" "}
            to authorize the connection. This is required to securely link your
            account.
          </Text>

          <div className="backdrop-blur-sm rounded-[1.4rem] p-[1.4rem] mb-[2.4rem] border border-border">
            <div className="flex items-start gap-[1rem]">
              <div className="shrink-0 w-[3.2rem] h-[3.2rem] rounded-full bg-brand-primary/10 flex items-center justify-center">
                <ImageComponent
                  src={icons.infoGreen}
                  alt="Info"
                  width={16}
                  height={16}
                  className="w-[1.6rem] h-[1.6rem]"
                />
              </div>
              <div>
                <Text
                  size="sm"
                  className="font-medium text-text-secondary mb-[0.2rem]"
                >
                  Automatic Return
                </Text>
                <Text size="sm" className="text-text-primary leading-snug">
                  After setup, you&apos;ll be automatically brought back.
                </Text>
              </div>
            </div>
          </div>

          <div className="flex gap-[1.2rem]">
            <Button
              variant="secondary"
              onClick={handleClose}
              className="flex-1 rounded-[1.2rem]"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleProceed}
              className="flex-1 rounded-[1.2rem] gap-[0.8rem]"
            >
              <span>Continue</span>
              <ImageComponent
                src={icons.linkExternal}
                alt=""
                width={16}
                height={16}
                className="w-[1.6rem] h-[1.6rem] filter brightness-0 invert"
              />
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

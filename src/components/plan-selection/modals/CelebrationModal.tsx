import Modal from "../../modal/Modal";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import ImageComponent from "../../ui/ImageComponent";
import Text from "../../ui/Text";
import { useSupabaseGifs } from "../../../lib/supabase/useSupabase";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function CelebrationModal({
  isOpen,
  onClose,
  onContinue,
}: Props) {
  const gifs = useSupabaseGifs();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="rounded-[1.6rem] w-full max-w-[59rem]"
      isBlur
    >
      <div className="px-[2.7rem] py-[4rem] sm:px-[4rem]">
        <div className="flex flex-col items-center justify-center text-center">
          <ImageComponent
            src={gifs.celebrationPopup}
            alt="celebration"
            width={100}
            height={100}
            className="mb-[2.4rem] w-[25rem]"
          />
          <Heading align="center" className="sm:text-[3rem] lg:text-[3.5rem]">
            Thank you for selecting a plan
          </Heading>
          <Text
            align="center"
            size="sm"
            className="mt-[1.2rem] sm:-[1.6rem] max-w-[35rem]"
          >
            We appreciate how far you have come, you still have a few more steps
            till complete account setup.
          </Text>
        </div>

        <div className="flex flex-col sm:flex-row mt-[6.4rem] gap-[1.2rem]">
          <Button className="w-full" onClick={onContinue}>
            Continue
          </Button>
          <Button variant="secondary" className="w-full" onClick={onClose}>
            Go back
          </Button>
        </div>
      </div>
    </Modal>
  );
}

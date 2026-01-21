import Button from "../ui/Button";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import ImageComponent from "../ui/ImageComponent";
import { useSessionExpiredCountdown } from "./hooks/useSessionExpiredCountdown";

interface SessionExpiredModalProps {
  isOpen: boolean;
}

export default function SessionExpiredModal({
  isOpen,
}: SessionExpiredModalProps) {
  const icons = useSupabaseIcons();
  const { countdown, redirectToLogin } = useSessionExpiredCountdown(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-primary border border-border rounded-[1.2rem] p-[3.2rem] max-w-[42rem] w-full mx-[1.6rem] shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-[6.4rem] h-[6.4rem] bg-yellow-500/10 rounded-full flex items-center justify-center mb-[2.4rem]">
            <ImageComponent
              src={icons.warning}
              alt="Session expired"
              width={32}
              height={32}
              className="w-[3.2rem] h-[3.2rem]"
            />
          </div>

          <h2 className="text-[2.4rem] font-bold text-text-primary mb-[0.8rem]">
            Session Expired
          </h2>

          <p className="text-[1.6rem] text-text-secondary mb-[2.4rem]">
            Your session has expired. You will be redirected to login in{" "}
            <span className="font-bold text-brand-primary">{countdown}</span>{" "}
            {countdown === 1 ? "second" : "seconds"}.
          </p>

          <Button
            onClick={redirectToLogin}
            className="w-full py-[1.2rem] text-[1.6rem] font-bold"
          >
            Go to Login Now
          </Button>
        </div>
      </div>
    </div>
  );
}

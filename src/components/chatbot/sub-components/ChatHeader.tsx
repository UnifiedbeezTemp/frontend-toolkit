import BotIcon from "../../../assets/icons/BotIcon";
import CloseIcon from "../../../assets/icons/CloseIcon";
import UsersO2 from "../../../assets/icons/UsersO2";
import MinimizeIcon from "../../../assets/icons/MinimizeIcon";
import { ChatMode } from "../types";

interface ChatHeaderProps {
  mode: ChatMode;
  onSwitchMode: (mode: ChatMode) => void;
  onClose: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function ChatHeader({
  mode,
  onSwitchMode,
  onClose,
  isExpanded,
  onToggleExpand,
}: ChatHeaderProps) {
  return (
    <div className="flex flex-col">
      <div className="grad-btn rounded-t-[1.6rem] p-[1.6rem]">
        <div className="flex items-center justify-between mb-[1.2rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="w-[3.6rem] h-[3.6rem] rounded-full bg-white/20 flex items-center justify-center">
              {mode === "ai" ? (
                <BotIcon color="white" size={20} />
              ) : (
                <UsersO2 color="white" size={20} />
              )}
            </div>
            <div>
              <h3 className="text-white text-[1.6rem] font-bold">
                Beezora Support
              </h3>
              <p className="text-white/80 text-[1.2rem]">
                {mode === "ai" ? "AI Assistant" : "Live Support"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-[0.8rem]">
            <button
              className="text-white/70 hover:text-white transition-colors p-[0.4rem]"
              onClick={onToggleExpand}
              title={isExpanded ? "Shrink" : "Expand"}
            >
              <MinimizeIcon
                size={18}
                color="white"
                className={isExpanded ? "" : "rotate-180 transition-transform"}
              />
            </button>
            <button
              className="text-white/70 hover:text-white transition-colors p-[0.4rem]"
              onClick={onClose}
            >
              <CloseIcon size={18} color="white" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-[0.8rem] bg-soft-green">
        <div className="flex items-center bg-input-filled rounded-[0.8rem] p-[0.4rem]">
          <button
            onClick={() => onSwitchMode("ai")}
            className={`flex-1 text-[1.3rem] font-semibold py-[0.6rem] px-[1.2rem] rounded-[0.6rem] transition-all flex items-center justify-center gap-[0.8rem] ${
              mode === "ai"
                ? "grad-btn text-white shadow"
                : "text-muted hover:text-text-primary"
            }`}
          >
            <BotIcon
              size={16}
              color={mode === "ai" ? "white" : "currentColor"}
            />
            <span>Beezora AI</span>
          </button>
          <button
            onClick={() => onSwitchMode("live")}
            className={`flex-1 text-[1.3rem] font-semibold py-[0.6rem] px-[1.2rem] rounded-[0.6rem] transition-all flex items-center justify-center gap-[0.8rem] ${
              mode === "live"
                ? "grad-btn text-white shadow"
                : "text-muted hover:text-text-primary"
            }`}
          >
            <UsersO2
              size={16}
              color={mode === "live" ? "white" : "currentColor"}
            />
            <span>Live Support</span>
          </button>
        </div>
      </div>
    </div>
  );
}

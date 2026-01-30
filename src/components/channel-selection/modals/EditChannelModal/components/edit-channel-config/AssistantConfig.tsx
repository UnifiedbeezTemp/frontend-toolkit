import { useAssistantSelector } from "../../../../../ai-assistant/hooks/useAssistantSelector";
import AssistantSelector from "../../../../../ai-assistant/selector/AssistantSelector";
import Heading from "../../../../../ui/Heading";

export default function AssistantConfig() {
  const { assistants, selectedAssistant, selectAssistant, isLoading } =
    useAssistantSelector();

  return (
    <div className="space-y-[0.8rem]">
      <Heading className="text-[2rem]">
        Ai Assistant{" "}
        <span className="text-text-primary text-[1.2rem] font-[400]">
          ( Select AI Assistant ){" "}
        </span>{" "}
      </Heading>
      <AssistantSelector
        assistants={assistants}
        selectedAssistant={selectedAssistant}
        onSelectAssistant={selectAssistant}
        noBorder={true}
        isLoading={isLoading}
      />
    </div>
  );
}

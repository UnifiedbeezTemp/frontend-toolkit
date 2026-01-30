import AssistantSelector from "../../../../../ai-assistant/selector/AssistantSelector";
import { AIConfigParams } from "../../../../../channel-account-ai-config/services/aiConfigService";
import Heading from "../../../../../ui/Heading";
import { AIAssistant } from "../../../../../../types/aiAssistantTypes";
import { useAssistantSelection } from "../../hooks/useAssistantSelection";

interface AssistantConfigProps {
  params: AIConfigParams;
  assistants: AIAssistant[];
  onAssistantChange: (aiId: number) => void;
}

export default function AssistantConfig({
  params,
  assistants,
  onAssistantChange,
}: AssistantConfigProps) {
  const { selectedAssistant, isLoading, handleSelect } = useAssistantSelection({
    params,
    assistants,
    onAssistantChange,
  });

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
        onSelectAssistant={handleSelect}
        noBorder={true}
        isLoading={isLoading}
      />
    </div>
  );
}

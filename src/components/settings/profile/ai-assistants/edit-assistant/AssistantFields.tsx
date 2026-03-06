import Link from "next/link";
import { AIAssistant } from "../utils/types";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import Input from "../../../../forms/Input";
import PersonalityField from "../../../../ai-assistant/PersonalityField";
import {
  ASSISTANT_PERSONALITY_OPTIONS,
  ASSISTANT_STYLE_OPTIONS,
  ASSISTANT_TONE_OPTIONS,
} from "../../../../../constants/aiAssistantOptions";

interface AssistantFieldsProps {
  localAssistant: AIAssistant;
  updateField: (field: keyof AIAssistant, value: string) => void;
}

export default function AssistantFields({
  localAssistant,
  updateField,
}: AssistantFieldsProps) {
  return (
    <>
      <div>
        <Heading size="sm">Name</Heading>
        <Input
          className="mt-[1rem]"
          placeholder="Enter name"
          value={localAssistant.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
      </div>

      <PersonalityField
        label="Tone"
        value={localAssistant.tone || ""}
        options={ASSISTANT_TONE_OPTIONS}
        onSelect={(value) => updateField("tone", value)}
        fieldType="tone"
      />

      <PersonalityField
        label="Style"
        value={localAssistant.style || ""}
        options={ASSISTANT_STYLE_OPTIONS}
        onSelect={(value) => updateField("style", value)}
        fieldType="style"
      />

      <PersonalityField
        label="Personality Type"
        value={localAssistant.personalityType || ""}
        options={ASSISTANT_PERSONALITY_OPTIONS}
        onSelect={(value) => updateField("personalityType", value)}
        fieldType="personalityType"
      />

      <div>
        <Heading size="sm">What should your AI chatbot do?</Heading>
        <Text size="sm">
          Give your AI Chatbot clear instructions on what to do.{" "}
          {/* <Link href="#" className="text-brand-primary underline">
            Get inspired
          </Link> */}
        </Text>
        <textarea
          placeholder="Enter instructions"
          value={localAssistant.instruction}
          onChange={(e) => updateField("instruction", e.target.value)}
          className="focus:ring-0 focus:outline-0 resize-none min-h-[20rem] w-full text-[1.6rem] text-text-primary border-border border p-[1.6rem] rounded-[0.8rem] mt-[1.6rem]"
        />
      </div>
    </>
  );
}

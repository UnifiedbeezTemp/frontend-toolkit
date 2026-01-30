import {
  ASSISTANT_TONE_OPTIONS,
  ASSISTANT_STYLE_OPTIONS,
  ASSISTANT_PERSONALITY_OPTIONS,
} from "./helpers";

interface OptionType {
  label: string;
  value: string;
}

const getLabelFromValue = (
  value: string | undefined,
  options: OptionType[],
): string => {
  if (!value) return "";
  const option = options.find((opt) => opt.value === value);
  return option?.label || value;
};

export const getToneLabel = (value: string | undefined): string => {
  return getLabelFromValue(value, ASSISTANT_TONE_OPTIONS);
};

export const getStyleLabel = (value: string | undefined): string => {
  return getLabelFromValue(value, ASSISTANT_STYLE_OPTIONS);
};

export const getPersonalityLabel = (value: string | undefined): string => {
  return getLabelFromValue(value, ASSISTANT_PERSONALITY_OPTIONS);
};

export const getSelectionText = (assistant: {
  tone?: string;
  style?: string;
  personalityType?: string;
}): string => {
  const parts: string[] = [];
  if (assistant.tone) parts.push(getToneLabel(assistant.tone));
  if (assistant.style) parts.push(getStyleLabel(assistant.style));
  if (assistant.personalityType)
    parts.push(getPersonalityLabel(assistant.personalityType));
  return parts.join(", ");
};

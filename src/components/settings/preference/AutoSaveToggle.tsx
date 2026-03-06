"use client";

import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import ToggleSwitch from "../../ui/ToggleSwitch";

interface Props {
  onAutoSaveChange?: (autoSave: boolean) => void;
  autoSave?: boolean;
}

export default function AutoSaveToggle({ onAutoSaveChange, autoSave }: Props) {
  const handleToggle = () => {
    if (onAutoSaveChange) {
      onAutoSaveChange(!autoSave);
    }
  };

  return (
    <div className="py-[3.2rem] border-b border-inactive-color">
      <div className="flex items-center justify-between">
        <Heading size="sm">Auto-save</Heading>
        <ToggleSwitch isActive={!!autoSave} onToggle={handleToggle} />
      </div>
      <Text className="mt-[.8rem]">Automatically save as you work</Text>
    </div>
  );
}

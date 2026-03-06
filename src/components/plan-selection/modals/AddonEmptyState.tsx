import React from "react";
import Text from "../../ui/Text";

export const AddonEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-[4rem]">
      <Text className="text-text-secondary text-[1.4rem] text-center">
        No add-ons available for this plan level.
      </Text>
    </div>
  );
};

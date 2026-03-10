import React from "react";
import Text from "../../ui/Text";
import Button from "../../ui/Button";

interface AddonErrorStateProps {
  onRetry: () => void;
}

export const AddonErrorState: React.FC<AddonErrorStateProps> = ({
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-[4rem] gap-[1.6rem]">
      <Text className="text-text-secondary text-[1.4rem] text-center">
        Something went wrong while loading add-ons.
      </Text>
      <Button
        variant="secondary"
        className="text-[1.4rem] font-[700] px-[2rem] py-[1rem]"
        onClick={onRetry}
      >
        Try Again
      </Button>
    </div>
  );
};

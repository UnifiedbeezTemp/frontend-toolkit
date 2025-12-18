import Button from "../ui/Button";
import Text from "../ui/Text";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
  type?: "members" | "invitations";
}

export default function ErrorState({
  message = "Failed to load data",
  onRetry,
  type = "members",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-[4rem] text-center">
      <div className="mb-[1.6rem]">
        <Text size="base" className="text-destructive mb-[0.8rem] text-center">
          {message}
        </Text>
        <Text size="sm" className="text-secondary text-center">
          Unable to load {type === "members" ? "team members" : "invitations"}.
          Please try again.
        </Text>
      </div>
      <Button onClick={onRetry} variant="primary" size="md">
        Retry
      </Button>
    </div>
  );
}


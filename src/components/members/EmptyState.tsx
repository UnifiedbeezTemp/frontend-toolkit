import Text from "../ui/Text";

interface EmptyStateProps {
  type: "members" | "invitations";
}

export default function EmptyState({ type }: EmptyStateProps) {
  const messages = {
    members: {
      title: "No team members yet",
      description: "Start by inviting team members to your organization.",
    },
    invitations: {
      title: "No pending invitations",
      description: "Invitations you send will appear here.",
    },
  };

  const message = messages[type];

  return (
    <div className="flex flex-col items-center justify-center py-[4rem] text-center">
      <Text size="base" className="text-text-primary mb-[0.8rem] font-[600]">
        {message.title}
      </Text>
      <Text size="sm" className="text-secondary max-w-[30rem] text-center">
        {message.description}
      </Text>
    </div>
  );
}


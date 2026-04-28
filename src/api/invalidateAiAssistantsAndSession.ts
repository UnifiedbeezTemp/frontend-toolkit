import { queryClient } from "./client";

export async function invalidateAiAssistantsAndSession(options?: {
  refetchActive?: boolean;
}) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ["ai-assistants"] }),
    queryClient.invalidateQueries({ queryKey: ["session"] }),
  ]);

  if (options?.refetchActive) {
    await Promise.all([
      queryClient.refetchQueries({ queryKey: ["ai-assistants"], type: "active" }),
      queryClient.refetchQueries({ queryKey: ["session"], type: "active" }),
    ]);
  }
}


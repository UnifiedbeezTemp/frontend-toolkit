import { queryClient } from "./client";

export const invalidateAiAssistants = () =>
  queryClient.invalidateQueries({ queryKey: ["ai-assistants"] });


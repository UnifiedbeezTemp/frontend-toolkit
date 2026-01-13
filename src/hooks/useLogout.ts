import { useRouter } from "next/navigation";
import { useAppMutation, api } from "../api";
import { useToast } from "../components/ui/toast/ToastProvider";

export const useLogout = () => {
  const router = useRouter();
  const { showToast } = useToast();

  const { mutate: logout, isPending: isLoading } = useAppMutation<void, void>(
    () => api.post("/auth/logout"),
    {
      onSuccess: () => {
        showToast({
          title: "Logged out successfully",
          variant: "success",
        });
        const authBase = process.env.NEXT_PUBLIC_BASE || "";
        router.push(`${authBase}/auth/signin`);
        router.refresh();
      },
      onError: (error) => {
        showToast({
          title: "Failed to logout. Please try again.",
          variant: "error",
        });
      },
    }
  );

  return {
    logout,
    isLoading,
  };
};

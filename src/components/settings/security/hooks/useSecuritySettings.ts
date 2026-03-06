import { useState } from "react";
import { useChangePassword } from "../../../../hooks/useAuthMutations";
import useSession from "../../../../providers/hooks/useSession";
import { extractErrorMessage } from "../../../../utils";
import { useToast } from "../../../ui/toast/ToastProvider";

export interface SecurityFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const useSecuritySettings = () => {
  const { showToast } = useToast();
  const { refetch } = useSession();
  const [formData, setFormData] = useState<SecurityFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState<Partial<SecurityFormData>>({});

  const { mutate: changePassword, isPending: isLoading } = useChangePassword({
    onSuccess: (data: { message: string }) => {
      showToast({
        title: "Password updated successfully",
        description: data.message,
        variant: "success",
      });
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswords({
        current: false,
        new: false,
        confirm: false,
      });
      setErrors({});

      refetch();
    },
    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(
        error,
        "Failed to update password"
      );
      showToast({
        title: "Update failed",
        description: errorMessage,
        variant: "error",
      });
    },
  });

  const handleInputChange = (field: keyof SecurityFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SecurityFormData> = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePassword = () => {
    if (!validateForm()) {
      return;
    }

    changePassword(formData);
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
    setShowPasswords({
      current: false,
      new: false,
      confirm: false,
    });
  };

  return {
    formData,
    showPasswords,
    errors,
    isLoading,
    handleInputChange,
    togglePasswordVisibility,
    handleUpdatePassword,
    handleCancel,
  };
};

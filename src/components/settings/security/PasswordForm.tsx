import Button from "../../ui/Button";
import PasswordField from "./PasswordField";

interface PasswordFormProps {
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  showPasswords: {
    current: boolean;
    new: boolean;
    confirm: boolean;
  };
  errors: Partial<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>;
  isLoading?: boolean;
  onInputChange: (field: string, value: string) => void;
  onToggleVisibility: (field: string) => void;
  onUpdatePassword: () => void;
}

export default function PasswordForm({
  formData,
  showPasswords,
  errors,
  isLoading,
  onInputChange,
  onToggleVisibility,
  onUpdatePassword,
}: PasswordFormProps) {
  return (
    <div className="mt-[1.6rem]">
      <PasswordField
        label="Current password"
        value={formData.currentPassword}
        placeholder="Enter current password"
        isVisible={showPasswords.current}
        error={errors.currentPassword}
        disabled={false}
        onChange={(value) => onInputChange("currentPassword", value)}
        onToggleVisibility={() => onToggleVisibility("current")}
      />

      <PasswordField
        label="New password"
        value={formData.newPassword}
        placeholder="Enter new password"
        isVisible={showPasswords.new}
        error={errors.newPassword}
        disabled={false}
        onChange={(value) => onInputChange("newPassword", value)}
        onToggleVisibility={() => onToggleVisibility("new")}
      />

      <PasswordField
        label="Confirm new password"
        value={formData.confirmPassword}
        placeholder="Re-enter password"
        isVisible={showPasswords.confirm}
        error={errors.confirmPassword}
        disabled={false}
        onChange={(value) => onInputChange("confirmPassword", value)}
        onToggleVisibility={() => onToggleVisibility("confirm")}
      />

      <Button
        className="highlight-inside border-0 mt-[1.6rem] py-[1rem] rounded-[0.8rem] px-[5.5rem]"
        onClick={onUpdatePassword}
        loading={isLoading}
        loadingText="Updating..."
      >
        Update Password
      </Button>
    </div>
  );
}

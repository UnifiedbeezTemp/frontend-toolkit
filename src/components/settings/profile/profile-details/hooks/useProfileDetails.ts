import { useState, useEffect, useMemo } from "react";
import { authService } from "../../../../../api/services/auth";
import { useUser } from "../../../../../contexts/UserContext";
import { useToast } from "../../../../ui/toast/ToastProvider";

interface UserInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
}

const initialUserInfo: UserInfo = {
  fullName: "",
  email: "",
  phoneNumber: "",
  profileImage: "",
};

export function useProfileDetails() {
  const { user, refetch } = useUser();
  const { showToast } = useToast();

  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [editingInfo, setEditingInfo] = useState<UserInfo>(initialUserInfo);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      const info: UserInfo = {
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phone || "",
        profileImage: user.profilePhoto || "",
      };
      setUserInfo(info);
      setEditingInfo(info);
      setProfileImage(user.profilePhoto);
    }
  }, [user]);

  const hasChanges = useMemo(() => {
    const isNameChanged = editingInfo.fullName !== userInfo.fullName;
    const isFileSelected = !!selectedFile;
    return isNameChanged || isFileSelected;
  }, [editingInfo, userInfo, selectedFile]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (selectedFile) {
        await authService.uploadProfilePhoto(selectedFile);
      }

      if (editingInfo.fullName !== userInfo.fullName) {
        const names = editingInfo.fullName.trim().split(" ");
        const firstName = names[0] || "";
        const lastName = names.slice(1).join(" ") || "";

        await authService.setupProfile({
          firstName,
          lastName,
          phone: userInfo.phoneNumber,
        });
      }

      refetch(); 

      showToast({
        title: "Profile updated successfully",
        variant: "success",
      });

      setSelectedFile(null);
    } catch (error) {
      console.error("Failed to update profile", error);
      showToast({
        title: "Failed to update profile",
        variant: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingInfo(userInfo);
    setProfileImage(userInfo.profileImage);
    setSelectedFile(null);
  };

  const handleImageSelect = (file: File | null) => {
    if (!file) {
      setProfileImage(userInfo.profileImage);
      setSelectedFile(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setProfileImage(url);
    setSelectedFile(file);
  };

  useEffect(() => {
    return () => {
      if (profileImage && profileImage.startsWith("blob:")) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  return {
    userInfo,
    editingInfo,
    profileImage,
    selectedFile,
    isSaving,
    hasChanges,
    handleSave,
    handleCancel,
    handleImageSelect,
    setEditingInfo,
  };
}

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { BusinessInfo, UploadedFile } from "../utils/types";
import { Website } from "../knowledge-files/websites/utils/types";
import { UserProfile } from "../../../../../types/userProfileTypes";
import { useAppMutation, api } from "../../../../../api";
import { useUser } from "../../../../../contexts/UserContext";
import { useToast } from "../../../../ui/toast/ToastProvider";

const initialBusinessInfo: BusinessInfo = {
  businessName: "",
  logo: "",
  businessDescription: "",
  industry: {
    name: "E-commerce / Retail",
    icon: "🛍️",
  },
  goals: [],
  objectives: [],
  uploadedFiles: [],
  websites: [],
};

const mapUserProfileToBusinessInfo = (
  user: UserProfile | null
): BusinessInfo => {
  if (!user) return initialBusinessInfo;
  return {
    logo: user.businessLogo || "",
    businessName: user.businessName || "",
    businessDescription: user.businessOverview || "",
    industry: {
      name: user.industry || "E-commerce / Retail",
      icon: "🛍️",
    },
    goals:
      user.businessGoals?.map((goal) => ({
        id: goal.id,
        title: goal.title,
        description: goal.description,
      })) || [],
    objectives:
      user.businessObjectives?.map((obj) => ({
        id: obj.id,
        title: obj.title,
        description: obj.description,
      })) || [],
    uploadedFiles:
      user.businessFiles?.map((file) => ({
        id: String(file.id),
        name: file.originalName,
        type: file.fileType,
        size: file.fileSize,
        progress: 100,
        status: "completed",
        url: file.filePath,
      })) || [],
    websites:
      user.websites?.map((w) => ({
        url: w.baseUrl,
        allPages: w.crawlType === "ENTIRE_SITE",
        pages: [],
      })) || [],
  };
};

export function useBusinessDetails() {
  const { user, refetch: refreshUser } = useUser();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(true);
  const isInitialized = useRef(false);

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(
    mapUserProfileToBusinessInfo(user)
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingInfo, setEditingInfo] = useState<BusinessInfo>(
    mapUserProfileToBusinessInfo(user)
  );
  const [logo, setLogo] = useState<string>(
    user?.businessLogo || user?.profilePhoto || ""
  );
  const [originalBusinessInfo, setOriginalBusinessInfo] =
    useState<BusinessInfo>(mapUserProfileToBusinessInfo(user));
  const [originalLogo, setOriginalLogo] = useState<string>(
    user?.businessLogo || user?.profilePhoto || ""
  );
  const [stagedFiles, setStagedFiles] = useState<Map<string, File>>(new Map());

  useEffect(() => {
    if (user && !isInitialized.current) {
      const info = mapUserProfileToBusinessInfo(user);
      setBusinessInfo(info);
      setEditingInfo(info);
      setOriginalBusinessInfo(info);
      setLogo(info.logo);
      setOriginalLogo(info.logo);
      isInitialized.current = true;
    }
  }, [user]);

  const handleFilesChange = useCallback((fileMap: Map<string, File>) => {
    setStagedFiles(fileMap);
  }, []);

  const hasChanges = useMemo(() => {
    if (selectedFile) return true;
    if (stagedFiles.size > 0) return true;
    if (editingInfo.businessName !== businessInfo.businessName) return true;
    if (editingInfo.businessDescription !== businessInfo.businessDescription)
      return true;

    const originalGoalIds = businessInfo.goals
      .map((g) => g.id)
      .sort()
      .join(",");
    const currentGoalIds = editingInfo.goals
      .map((g) => g.id)
      .sort()
      .join(",");
    if (originalGoalIds !== currentGoalIds) return true;

    const originalObjectiveIds = businessInfo.objectives
      .map((o) => o.id)
      .sort()
      .join(",");
    const currentObjectiveIds = editingInfo.objectives
      .map((o) => o.id)
      .sort()
      .join(",");
    if (originalObjectiveIds !== currentObjectiveIds) return true;

    return false;
  }, [editingInfo, businessInfo, selectedFile, stagedFiles]);

  const { mutateAsync: updateProfile, isPending } = useAppMutation(
    async (data) => {
      return await api.patch("/auth/setup/profile", data);
    }
  );

  const { mutateAsync: updateMultipart, isPending: isUpdatingMultipart } =
    useAppMutation(async (formData: FormData) => {
      return await api.patch("/auth/setup/profile", formData);
    });

  const handleSave = async () => {
    try {
      const dataPayload = {
        businessName: editingInfo.businessName,
        businessOverview: editingInfo.businessDescription,
        businessGoalIds: editingInfo.goals.map((g) => g.id),
        businessObjectiveIds: editingInfo.objectives.map((o) => o.id),
      };

      await updateProfile(dataPayload);

      if (selectedFile || stagedFiles.size > 0) {
        const formData = new FormData();
        if (selectedFile) {
          formData.append("businessLogo", selectedFile);
        }

        stagedFiles.forEach((file) => {
          formData.append("businessFiles", file);
        });

        await updateMultipart(formData);
      }

      refreshUser();

      const updatedInfo = mapUserProfileToBusinessInfo(user);
      setBusinessInfo(updatedInfo);
      setOriginalBusinessInfo(updatedInfo);
      setOriginalLogo(updatedInfo.logo);
      setSelectedFile(null);
      setStagedFiles(new Map());

      showToast({
        title: "Success",
        description: "Business details updated successfully.",
        variant: "success",
      });
    } catch (error) {
      showToast({
        title: "Error",
        description: "Failed to update business details. Please try again.",
        variant: "error",
      });
    }
  };

  const handleCancel = () => {
    setEditingInfo(businessInfo);
    setLogo(originalLogo);
    setSelectedFile(null);
    setStagedFiles(new Map());
  };

  const handleImageSelect = (file: File | null) => {
    if (!file) {
      setLogo(originalLogo);
      setSelectedFile(null);
      setEditingInfo((prev) => ({ ...prev, logo: originalLogo }));
      return;
    }

    const url = URL.createObjectURL(file);
    setLogo(url);
    setSelectedFile(file);
    setEditingInfo((prev) => ({ ...prev, logo: url }));
  };

  const updateEditingFiles = useCallback((files: UploadedFile[]) => {
    setEditingInfo((prev) => ({ ...prev, uploadedFiles: files }));
  }, []);

  const updateEditingWebsites = useCallback((websites: Website[]) => {
    setEditingInfo((prev) => ({ ...prev, websites }));
  }, []);

  return {
    isEditing,
    logo,
    editingInfo,
    selectedFile,
    currentInfo: editingInfo,
    setEditingInfo,
    updateEditingFiles,
    updateEditingWebsites,
    handleSave,
    handleCancel,
    handleImageSelect,
    handleFilesChange,
    hasChanges,
    isSubmitting: isPending || isUpdatingMultipart,
  };
}

import KnowledgeFiles from "./knowledge-files/KnowledgeFiles";
import ActionButtons from "../profile-details/ActionButtons";
import { useBusinessDetails } from "./hooks/useBusinessDetails";
import BusinessDescription from "./description/BusinessDescription";
import BusinessGoals from "./goals/BusinessGoals";
import BusinessIndustry from "./industry/BusinessIndustry";
import BusinessObjectives from "./objectives/BusinessObjectives";
import SettingsSectionHeader from "../../SettingsSectionHeader";
import ImageUploadSection from "../../../image-upload-section/ImageUploadSection";
import Heading from "../../../ui/Heading";
import Input from "../../../forms/Input";

export default function BusinessDetails() {
  const {
    logo,
    selectedFile,
    editingInfo,
    handleImageSelect,
    setEditingInfo,
    updateEditingFiles,
    updateEditingWebsites,
    handleSave,
    handleCancel,
    hasChanges,
    handleFilesChange,
    isSubmitting,
  } = useBusinessDetails();

  return (
    <div className="py-[4rem] border-b border-border">
      <SettingsSectionHeader title="Business Details" />

      <div className="mt-[2rem]">
        <ImageUploadSection
          image={logo}
          selectedFile={selectedFile}
          onImageSelect={handleImageSelect}
          optional
          title={"Business Logo"}
          description={"The image is displayed on your UnifiedBeez account."}
          displayName={editingInfo.businessName}
          isEditing={true}
          type="logo"
        />
      </div>
      <div className="mt-[2rem]">
        <div>
          <Heading size="sm" className="mb-[0.8rem]">
            Business name
          </Heading>
          <Input
            value={editingInfo.businessName}
            placeholder="Enter business name"
            onChange={(e) =>
              setEditingInfo({ ...editingInfo, businessName: e.target.value })
            }
            className="w-full"
          />
        </div>

        <BusinessIndustry
          isEditing={true}
          currentInfo={editingInfo}
          setEditingInfo={setEditingInfo}
        />

        <BusinessGoals
          isEditing={true}
          currentInfo={editingInfo}
          setEditingInfo={setEditingInfo}
        />

        <BusinessObjectives
          isEditing={true}
          currentInfo={editingInfo}
          setEditingInfo={setEditingInfo}
        />

        <BusinessDescription
          isEditing={true}
          currentInfo={editingInfo}
          setEditingInfo={setEditingInfo}
        />

        <KnowledgeFiles onFilesChange={handleFilesChange} />

        <ActionButtons
          isEditing={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}

import ProfileImageSection from "./ProfileImageSection";
import ActionButtons from "./ActionButtons";
import { useProfileDetails } from "./hooks/useProfileDetails";
import SettingsSectionHeader from "../../SettingsSectionHeader";
import Heading from "../../../ui/Heading";
import Input from "../../../forms/Input";

export default function ProfileDetails() {
  const {
    profileImage,
    selectedFile,
    editingInfo,
    isSaving,
    hasChanges,
    handleSave,
    handleCancel,
    handleImageSelect,
    setEditingInfo,
  } = useProfileDetails();


  return (
    <div className="border-border border-b pb-[4rem]">
      <SettingsSectionHeader
        title="Personal details"
        isEditing={true}
        handleEditClick={() => {}}
      />

      <div className="mt-[2rem]">
        <ProfileImageSection
          profileImage={profileImage}
          selectedFile={selectedFile}
          onImageSelect={handleImageSelect}
          fullName={editingInfo.fullName}
          isEditing={true}
        />
      </div>

      <div className="mt-[3rem] space-y-[2rem]">
        <div>
          <Heading size="sm" className="mb-[0.8rem]">
            Full name
          </Heading>
          <Input
            value={editingInfo.fullName}
            onChange={(e) =>
              setEditingInfo({ ...editingInfo, fullName: e.target.value })
            }
            className="w-full"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-[2rem]">
          <div>
            <Heading size="sm" className="mb-[0.8rem]">
              Email
            </Heading>
            <div className="text-[1.6rem] bg-primary border border-border rounded-[0.8rem] text-text-primary px-[1.4rem] py-[1rem]">
              {editingInfo.email}
            </div>
          </div>

          <div>
            <Heading size="sm" className="mb-[0.8rem]">
              Phone number
            </Heading>
            <div className="text-[1.6rem] bg-primary border border-border rounded-[0.8rem] text-text-primary px-[1.4rem] py-[1rem] h-[4.2rem] flex items-center">
              {editingInfo.phoneNumber || "N/A"}
            </div>
          </div>
        </div>

        <ActionButtons
          onSave={handleSave}
          onCancel={handleCancel}
          isEditing={hasChanges}
          isLoading={isSaving}
        />
      </div>
    </div>
  );
}

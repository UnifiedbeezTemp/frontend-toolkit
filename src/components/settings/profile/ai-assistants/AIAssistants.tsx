"use client";

import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ConfirmActionModal from "../../../modal/ConfirmActionModal";
import Button from "../../../ui/Button";
import Heading from "../../../ui/Heading";
import ImageComponent from "../../../ui/ImageComponent";
import SettingsSectionHeader from "../../SettingsSectionHeader";
import BotList from "./BotList";
import EditAssistantModal from "./edit-assistant/EditAssistantModal";
import { useAIAssistantFormActions } from "./hooks/useAIAssistantFormActions";

export default function AIAssistants() {
  const {
    editingId,
    pendingDeleteId,
    assistants,
    assistantsLeft,
    botName,
    isValid,
    isCreating,
    isUpdating,
    isDeleting,
    isEditing,
    setBotName,
    handleAddAssistant,
    handleEditAssistant,
    handleSaveEdit,
    handleCancelEdit,
    handleDeleteAssistant,
    handleDeleteRequest,
    handleCloseDeleteModal,
  } = useAIAssistantFormActions();

  const icons = useSupabaseIcons();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isValid) {
        if (isEditing) {
          handleSaveEdit();
        } else {
          handleAddAssistant();
        }
      }
    }
  };

  const handleEnterClick = () => {
    if (isEditing) {
      handleSaveEdit();
    } else {
      handleAddAssistant();
    }
  };

  const editingAssistant = assistants.find((a: { id: string | null; }) => a.id === editingId);

  return (
    <div className="py-[4rem]">
      <SettingsSectionHeader title="AI Assistants" />

      <div className="mt-[1.6rem]">
        <div>
          <Heading size="sm">AI Assistants name</Heading>

          <div className="rounded-[0.8rem] bg-primary px-[0.8rem] gap-[0.8rem] py-[.4rem] border border-border mt-[1.6rem] flex items-center justify-between">
            <div className="border border-border rounded-[0.34rem] p-[0.34rem] flex-shrink-0">
              <ImageComponent
                src={"/images/logo.svg"}
                alt="logo"
                width={25}
                height={25}
              />
            </div>
            <input
              type="text"
              placeholder="Enter bot name"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="focus:ring-0 focus:outline-0 w-full text-[1.6rem] text-text-primary border-none placeholder:text-[1.6rem] placeholder:text-inactive-color"
            />
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-[1.4rem] text-text-secondary px-[0.8rem]"
              >
                Cancel
              </button>
            )}
            <Button
              type="button"
              onClick={handleEnterClick}
              disabled={!isValid || isCreating || isUpdating}
              className="sm:px-[1.5rem] sm:py-[0.4rem] rounded-[0.4rem] disabled:opacity-50 flex items-center gap-[0.8rem]"
              loading={isCreating || isUpdating}
            >
              <span className="hidden sm:block">
                {isEditing ? "Save" : "Enter"}
              </span>
              {!isUpdating && !isCreating && (
                <ImageComponent
                  src={icons.plusWhite}
                  alt="add"
                  width={20}
                  height={20}
                  className="sm:hidden"
                />
              )}
            </Button>
          </div>

          <div className="py-[2.3rem] sm:py-[1.6rem] border-b border-border flex items-center justify-between">
            <button
              onClick={() => !isEditing && handleAddAssistant()}
              disabled={isEditing || isCreating}
              className="p-[0.8rem] py-[0.2rem] rounded-[0.8rem] text-[1.4rem] text-brand-primary border border-brand-primary flex items-center gap-[0.8rem] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ImageComponent
                src={icons.beeGreenLeft}
                alt="logo"
                width={25}
                height={25}
              />
              {isCreating ? "Creating..." : "Add BeeZora"}
              {!isCreating && <span className="text-[2rem] mb-[3px]">+</span>}
            </button>
            <p className="text-[1.4rem] text-brand-primary">
              {assistantsLeft === "Unlimited"
                ? "Unlimited"
                : `${assistantsLeft} AI assistants left`}
            </p>
          </div>

          <BotList
            assistants={assistants}
            isEditing={true}
            onDelete={handleDeleteRequest}
            onEdit={handleEditAssistant}
          />
        </div>
      </div>

      {editingAssistant && (
        <EditAssistantModal
          assistant={editingAssistant}
          isOpen={isEditing && !!editingId}
          onClose={handleCancelEdit}
          onSave={(a) => handleCancelEdit()}
        />
      )}

      <ConfirmActionModal
        isOpen={!!pendingDeleteId}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAssistant}
        title="Delete AI assistant?"
        description="This action cannot be undone. The assistant will be removed permanently."
        confirmLoading={isDeleting}
      />
    </div>
  );
}

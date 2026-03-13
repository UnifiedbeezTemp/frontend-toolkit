"use client";

import { useSupabaseIcons } from "../../../../../../../lib/supabase/useSupabase";
import { EmailDraft } from "../../types";
import { useEmailComposer } from "../../hooks/useEmailComposer";
import EmailComposerHeader from "./EmailComposerHeader";
import EmailComposerSubHeader from "./EmailComposerSubHeader";
import EmailComposerFields from "./EmailComposerFields";
import EmailComposerToolbar from "./EmailComposerToolbar";
import EmailComposerBodyAttachments from "./EmailComposerBodyAttachments";
import EmailComposerFooter from "./EmailComposerFooter";
import EmailComposerAttachmentRow from "./EmailComposerAttachmentRow";
import {
  LinkPopover,
  ImagePopover,
  EmojiPopover,
} from "./EmailComposerPopovers";
import { cn } from "../../../../../../../lib/utils";
import ImageComponent from "../../../../../../ui/ImageComponent";
import Text from "../../../../../../ui/Text";

interface EmailComposerProps {
  draft: EmailDraft;
  onUpdate: (updates: Partial<EmailDraft>) => void;
  onCancel: () => void;
  onSend: () => void;
  contactName: string;
}

export default function EmailComposer(props: EmailComposerProps) {
  const icons = useSupabaseIcons() as Record<string, string>;
  const state = useEmailComposer(props);

  const containerClasses = cn(
    "flex flex-col gap-[1.6rem] transition-all duration-300",
    "fixed inset-x-0 bottom-0 top-[14rem] z-[999] bg-primary rounded-t-[1rem] shadow-md p-[1.6rem]",
    "sm:fixed sm:inset-auto sm:right-0 sm:bottom-0 sm:top-auto sm:w-[54rem] sm:h-[80dvh] sm:bg-transparent sm:shadow-none sm:p-0",
    "lg:static lg:inset-auto lg:w-full lg:h-full lg:p-0 lg:bg-transparent lg:shadow-none",
    state.isExpanded &&
      "sm:fixed sm:inset-0 sm:z-[999] sm:w-full sm:h-full sm:p-[4rem] sm:bg-primary sm:rounded-none sm:shadow-none",
  );

  return (
    <div className={containerClasses}>
      <div className="hidden lg:flex items-center gap-[1.2rem] mb-[2.4rem]">
        <button
          onClick={state.onCancel}
          className="flex items-center gap-[0.8rem] px-[1.2rem] py-[0.8rem] rounded-[1rem] border border-input-stroke hover:bg-input-filled transition-colors"
        >
          <ImageComponent
            src={icons.arrowLeft}
            alt="back"
            width={16}
            height={16}
            className="opacity-60"
          />
          <Text className="text-[1.4rem] font-bold text-dark-base-100">
            Go back
          </Text>
        </button>
        <Text className="text-[2.2rem] font-bold text-dark-base-100 tracking-tight">
          Create email
        </Text>
      </div>

      <div
        className={cn(
          "flex flex-col overflow-hidden relative min-h-0 bg-primary shadow-2xl transition-all duration-300",
          "rounded-t-[1rem] border-t border-input-stroke flex-1",
          "sm:rounded-none sm:rounded-tl-[1rem] sm:border-t sm:border-l sm:border-r-0 sm:border-b-0 sm:border-input-stroke",
          "lg:rounded-[1rem] lg:border lg:border-input-stroke lg:shadow-sm",
        )}
      >
        <div className="shrink-0 py-[1.6rem] sm:py-[2rem] px-[1.6rem] sm:px-[2.4rem] lg:hidden">
          <EmailComposerHeader
            onCancel={state.onCancel}
            onToggleExpand={state.toggleExpanded}
            expandIcon={icons.expand}
            closeIcon={icons.close}
          />
        </div>

        {state.activePopover === "link" && (
          <LinkPopover
            onApply={state.applyCustomAction}
            onClose={() => state.setActivePopover(null)}
          />
        )}
        {state.activePopover === "image" && (
          <ImagePopover
            onApply={state.applyCustomAction}
            onClose={() => state.setActivePopover(null)}
          />
        )}
        {state.activePopover === "emoji" && (
          <EmojiPopover
            onApply={state.applyCustomAction}
            onClose={() => state.setActivePopover(null)}
          />
        )}

        <EmailComposerSubHeader
          subject={state.draft.subject || "No Subject"}
          onCancel={state.onCancel}
          onToggleExpand={state.toggleExpanded}
          expandIcon={icons.expand}
          closeIcon={icons.close}
        />

        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col min-h-0">
          <EmailComposerFields
            {...state}
            closeIcon={icons.close}
            to={state.draft.to}
            cc={state.draft.cc}
            subject={state.draft.subject}
          />

          <EmailComposerToolbar
            icons={icons}
            onAction={state.execAction}
            activeStyles={state.activeStyles}
          />

          <EmailComposerBodyAttachments
            body={state.draft.body}
            attachments={state.draft.attachments}
            editorRef={state.editorRef}
            handleEditorChange={state.handleEditorChange}
            onUpdate={state.onUpdate}
            onRemoveAttachment={state.handleRemoveAttachment}
            triggerFileSelect={state.triggerFileSelect}
            fileInputRef={state.fileInputRef}
            handleFileChange={state.handleFileChange}
            fileIcon={icons.fileIcon}
            closeIcon={icons.close}
            currentLinkUrl={state.currentLinkUrl}
            handleEditorClick={state.handleEditorClick}
          />
        </div>

        <div className="shrink-0">
          <EmailComposerAttachmentRow
            attachments={state.draft.attachments}
            onRemoveAttachment={state.handleRemoveAttachment}
            triggerFileSelect={state.triggerFileSelect}
            fileInputRef={state.fileInputRef}
            handleFileChange={state.handleFileChange}
            fileIcon={icons.fileIcon}
            closeIcon={icons.close}
          />
          <EmailComposerFooter
            onCancel={state.onCancel}
            onSend={state.onSend}
          />
        </div>
      </div>
    </div>
  );
}

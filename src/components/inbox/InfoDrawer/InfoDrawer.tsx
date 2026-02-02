"use client";

import { cn } from "../../../lib/utils";
import IconButton from "../../ui/IconButton";
import Text from "../../ui/Text";
import TimesIcon from "../../../assets/icons/TimesIcon";
import ThreadsIcon from "../../../assets/icons/ThreadsIcon";
import CommentsIcon from "../../../assets/icons/CommentsIcon";
import NotesIcon from "../../../assets/icons/NotesIcon";
import FilesIcon from "../../../assets/icons/FilesIcon";
import InfoSection from "./components/InfoSection";
import ThreadsSection from "./components/ThreadsSection";
import CommentsSection from "./components/CommentsSection";
import NotesSection from "./components/NotesSection";
import FilesSection from "./components/FilesSection";
import { InfoDrawerProps, Comment, Note } from "./types";
import { mockThreads, mockFiles } from "./constants";
import { useInfoDrawer } from "./hooks/useInfoDrawer";

export default function InfoDrawer({
  isOpen,
  onClose,
}: InfoDrawerProps) {
  const {
    comments,
    notes,
    handleAddComment,
    handleAddNote,
  } = useInfoDrawer();

  if (!isOpen) return null;

  return (
    <>
      <div
        className={cn("md:hidden fixed inset-0 z-[1000]", "flex items-end")}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />

        <div
          className={cn(
            "relative w-full bg-primary rounded-t-[1.6rem] shadow-xl",
            "max-h-[90vh] overflow-y-auto",
            "animate-in slide-in-from-bottom duration-300",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-primary border-b border-input-stroke px-4 py-3 flex items-center justify-between z-10">
            <Text className="text-[1.8rem] font-bold text-text-primary">
              Info
            </Text>
            <IconButton
              variant="secondary"
              icon={<TimesIcon size={10} />}
              onClick={onClose}
              ariaLabel="Close"
              className="bg-gray-100"
            />
          </div>
          <div className="p-4">
            <DrawerContent
              comments={comments}
              notes={notes}
              onAddComment={handleAddComment}
              onAddNote={handleAddNote}
            />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "hidden md:block relative z-50",
          "w-[32rem] border-l border-input-stroke bg-primary",
          "h-[calc(100dvh-16.5rem)] sm:h-[calc(100dvh-5.7rem)] overflow-y-auto shrink-0 px-3 py-2.75",
        )}
      >
        <div className="sticky top-0 bg-primary border-b border-input-stroke py-3 flex items-center justify-between z-10">
          <Text className="text-[1.8rem] font-bold text-text-primary">
            Info
          </Text>
          <IconButton
            variant="secondary"
            icon={<TimesIcon size={10} />}
            onClick={onClose}
            ariaLabel="Close"
            className="bg-gray-100"
          />
        </div>
        <div>
          <DrawerContent
            comments={comments}
            notes={notes}
            onAddComment={handleAddComment}
            onAddNote={handleAddNote}
          />
        </div>
      </div>
    </>
  );
}

function DrawerContent({
  comments,
  notes,
  onAddComment,
  onAddNote,
}: {
  comments: Comment[];
  notes: Note[];
  onAddComment: (text: string) => void;
  onAddNote: (text: string, color: string) => void;
}) {
  return (
    <div className="flex flex-col divide-y divide-input-stroke">
      <InfoSection
        title="Threads"
        subtitle="Recent Threads"
        icon={<ThreadsIcon size={20} className="text-dark-base-70"/>}
      >
        <ThreadsSection threads={mockThreads} />
      </InfoSection>

      <InfoSection
        title="Comments"
        subtitle="Latest Comments"
        icon={<CommentsIcon size={20} className="text-dark-base-70" />}
        showAddButton
      >
        <CommentsSection comments={comments} onAddComment={onAddComment} />
      </InfoSection>

      <InfoSection
        title="Notes"
        subtitle="Inbox Notes"
        icon={<NotesIcon size={20}className="text-dark-base-70"/>}
        showAddButton
      >
        <NotesSection notes={notes} onAddNote={onAddNote} />
      </InfoSection>

      <InfoSection
        title="Files"
        icon={<FilesIcon size={20}className="text-dark-base-70"/>}
      >
        <FilesSection files={mockFiles} />
      </InfoSection>
    </div>
  );
}

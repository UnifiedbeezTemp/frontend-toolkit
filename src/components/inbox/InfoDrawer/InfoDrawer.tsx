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
import { useState } from "react";
import { InfoDrawerProps, Comment, Note } from "./types";
import { mockThreads, mockComments, mockNotes, mockFiles } from "./constants";

export default function InfoDrawer({
  isOpen,
  onClose,
  conversationId,
}: InfoDrawerProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [notes, setNotes] = useState<Note[]>(mockNotes);

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: "You",
      text,
      timestamp: "Just now",
    };
    setComments([newComment, ...comments]);
  };

  const handleAddNote = (text: string, color: string) => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      color,
    };
    setNotes([newNote, ...notes]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile: Bottom Drawer with z-index */}
      <div
        className={cn("md:hidden fixed inset-0 z-[1000]", "flex items-end")}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* Backdrop */}
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

      {/* Desktop: Side Drawer with relative positioning */}
      <div
        className={cn(
          "hidden md:block relative z-50",
          "w-[32rem] border-l border-input-stroke bg-primary",
          "h-[calc(100dvh-16.5rem)] sm:h-[calc(100dvh-5.7rem)] overflow-y-auto shrink-0",
        )}
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
    <div className="flex flex-col">
      <InfoSection
        title="Threads"
        subtitle="Recent Threads"
        icon={<ThreadsIcon size={20} color="var(--dark-base-70)" />}
      >
        <ThreadsSection threads={mockThreads} />
      </InfoSection>

      <InfoSection
        title="Comments"
        subtitle="Latest Comments"
        icon={<CommentsIcon size={20} color="var(--dark-base-70)" />}
        showAddButton
      >
        <CommentsSection comments={comments} onAddComment={onAddComment} />
      </InfoSection>

      <InfoSection
        title="Notes"
        subtitle="Inbox Notes"
        icon={<NotesIcon size={20} color="var(--dark-base-70)" />}
        showAddButton
      >
        <NotesSection notes={notes} onAddNote={onAddNote} />
      </InfoSection>

      <InfoSection
        title="Files"
        icon={<FilesIcon size={20} color="var(--dark-base-70)" />}
      >
        <FilesSection files={mockFiles} />
      </InfoSection>
    </div>
  );
}

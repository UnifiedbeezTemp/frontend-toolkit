"use client"

import { MessageSquare, FileText, Paperclip } from "lucide-react"
import { cn } from "../../../lib/utils"
import IconButton from "../../ui/IconButton"
import Text from "../../ui/Text"
import TimesIcon from "../../../assets/icons/TimesIcon"
import InfoSection from "./components/InfoSection"
import ThreadsSection from "./components/ThreadsSection"
import CommentsSection from "./components/CommentsSection"
import NotesSection from "./components/NotesSection"
import FilesSection from "./components/FilesSection"
import { InfoDrawerProps } from "./types"
import {
  mockThreads,
  mockComments,
  mockNotes,
  mockFiles,
} from "./constants"

export default function InfoDrawer({
  isOpen,
  onClose,
  conversationId,
}: InfoDrawerProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Mobile: Bottom Drawer with z-index */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-[1000]",
          "flex items-end"
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose()
          }
        }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        
        <div
          className={cn(
            "relative w-full bg-primary rounded-t-[1.6rem] shadow-xl",
            "max-h-[90vh] overflow-y-auto",
            "animate-in slide-in-from-bottom duration-300"
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
            <DrawerContent />
          </div>
        </div>
      </div>

      {/* Desktop: Side Drawer with relative positioning */}
      <div
        className={cn(
          "hidden md:block relative",
          "w-[32rem] border-l border-input-stroke bg-primary",
          "h-[calc(100dvh-16.5rem)] sm:h-[calc(100dvh-5.7rem)] overflow-y-auto shrink-0"
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
          <DrawerContent />
        </div>
      </div>
    </>
  )
}

function DrawerContent() {
  return (
    <div className="flex flex-col">
      <InfoSection
        title="Threads"
        subtitle="Recent Threads"
        icon={<MessageSquare size={20} className="text-text-primary" />}
      >
        <ThreadsSection threads={mockThreads} />
      </InfoSection>

      <InfoSection
        title="Comments"
        subtitle="Latest Comments"
        icon={<MessageSquare size={20} className="text-text-primary" />}
        showAddButton
        onAdd={() => {}}
      >
        <CommentsSection comments={mockComments} />
      </InfoSection>

      <InfoSection
        title="Notes"
        subtitle="Inbox Notes"
        icon={<FileText size={20} className="text-text-primary" />}
        showAddButton
        onAdd={() => {}}
      >
        <NotesSection notes={mockNotes} />
      </InfoSection>

      <InfoSection
        title="Files"
        icon={<Paperclip size={20} className="text-text-primary" />}
      >
        <FilesSection files={mockFiles} />
      </InfoSection>
    </div>
  )
}

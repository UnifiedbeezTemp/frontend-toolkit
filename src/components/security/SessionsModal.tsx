import React from "react";
import Modal from "../modal/Modal";
import ModalHeader from "../modal/ModalHeader";
import CloseModalButton from "../modal/CloseModalButton";
import { useSessionsModal } from "./hooks/useSessionsModal";
import SessionItem from "./SessionItem";
import Skeleton from "../ui/Skeleton";
import Text from "../ui/Text";
import Button from "../ui/Button";

interface SessionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SessionsModal({ isOpen, onClose }: SessionsModalProps) {
  const {
    sessions,
    isLoading,
    isError,
    refetch,
    handleTerminateSession,
    handleTerminateAll,
    handleCleanup,
    isTerminating,
    isTerminatingAll,
    isCleaningUp,
  } = useSessionsModal();

  const otherSessionsCount = sessions?.filter((s) => !s.isCurrent).length || 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      className="max-h-[85vh] sm:max-h-[90vh] flex flex-col sm:rounded-[1.6rem]"
      bottomSheet
    >
      <div className="flex flex-col h-full">
        <div className="px-[1.6rem] pt-[2.4rem] pb-[1.6rem] border-b border-border">
          <ModalHeader
            text="Active Sessions"
            description="Manage devices logged into your account"
            action={<CloseModalButton onClick={onClose} />}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-[1.6rem] py-[1.6rem]">
          {isLoading ? (
            <div className="flex flex-col gap-[1.6rem]">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-[1.6rem]">
                  <Skeleton className="w-[4rem] h-[4rem] rounded-[1rem]" />
                  <div className="flex flex-col gap-[0.8rem] flex-1">
                    <Skeleton className="h-[2rem] w-[60%]" />
                    <Skeleton className="h-[1.4rem] w-[40%]" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-[4rem] gap-[1.6rem]">
              <Text className="text-destructive">Failed to load sessions</Text>
              <Button onClick={() => refetch()} variant="secondary">
                Retry
              </Button>
            </div>
          ) : (
            <div className="flex flex-col">
              {sessions?.map((session) => (
                <SessionItem
                  key={session.id}
                  session={session}
                  onTerminate={handleTerminateSession}
                  isTerminating={isTerminating}
                />
              ))}

              {sessions && sessions.length === 0 && (
                <Text className="text-center py-[2rem] text-text-secondary">
                  No active sessions found.
                </Text>
              )}
            </div>
          )}
        </div>

        <div className="p-[1.6rem] border-t border-border bg-gray-50 flex flex-col sm:flex-row gap-[1rem] sm:justify-between items-center rounded-b-[2rem]">
          <Button
            variant="secondary"
            className="text-text-tertiary hover:text-text-primary text-[1.2rem]"
            onClick={handleCleanup}
            loading={isCleaningUp}
          >
            Clean up expired sessions
          </Button>

          {otherSessionsCount > 0 && (
            <Button
              variant="danger"
              onClick={handleTerminateAll}
              loading={isTerminatingAll}
              className="w-full sm:w-auto"
            >
              Log out all other devices
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

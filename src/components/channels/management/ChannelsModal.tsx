"use client";

import { useChannelsSettings } from "@/shared/src/components/channels/hooks/useChannelsSettings";
import ChannelConnection from "@/shared/src/components/channels/management/ChannelConnection";
import { RedirectModalProvider } from "@/shared/src/components/channels/context/RedirectModalContext";
import RedirectModal from "@/shared/src/components/channels/management/RedirectModal";
import Modal from "@/shared/src/components/modal/Modal";
import ModalHeader from "@/shared/src/components/modal/ModalHeader";
import Button from "@/shared/src/components/ui/Button";
import ChannelsSection from "./sub-components/ChannelsSection";
import CloseModalButton from "@/shared/src/components/modal/CloseModalButton";
import SearchSection from "@/shared/src/components/channel-selection/SearchSection";
import Loader from "@/shared/src/components/ui/Loader";
import Text from "@/shared/src/components/ui/Text";
import { cn } from "@/shared/src/lib/utils"; // Adjusted path

interface ChildProps {
  isMinimal?: boolean;
}

export default function ChannelsModal({ isMinimal = false }: ChildProps) {
  const {
    isOpen,
    onClose,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    channelView,
    setChannelView,
    isConnectionMode,
    selectedChannels,
    isLoading,
    isError,
    refetch,
    displayData,
    handleGoBackToConnected,
    handleContinueToConnection,
    handleExitConnectionMode,
  } = useChannelsSettings();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xxl"
      className="max-h-[90dvh] sm:max-h-[98vh] sm:max-w-[69.9rem] lg:max-w-[100rem] rounded-ss-[2rem] rounded-se-[2rem] sm:rounded-[1.6rem] bg-white"
      bottomSheet
    >
      <RedirectModalProvider>
        <div className="px-[1.4rem] lg:px-[4rem]">
          <ModalHeader
            text={
              isConnectionMode
                ? "Connect your channels"
                : "Selected channels you would like connect"
            }
            description={
              isConnectionMode
                ? "Set up the connection for your selected channels"
                : "Connect as many channels as you like"
            }
            className={cn("pt-[2rem] lg:pt-[4rem] pb-[1.5rem]")}
            action={<CloseModalButton onClick={onClose} />}
          />

          {isConnectionMode ? (
            <div className="mt-[2rem]">
              <ChannelConnection
                onBack={handleExitConnectionMode}
                hideHeader={true}
              />
            </div>
          ) : (
            <div className="mt-[3rem]">
              <SearchSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filter={filter}
                setFilter={setFilter}
              />

              {isLoading ? (
                <div className="flex items-center justify-center py-[6rem]">
                  <Loader />
                </div>
              ) : isError ? (
                <div className="flex flex-col items-center justify-center py-[6rem] gap-[1.6rem]">
                  <Text className="">
                    Failed to load channels. Please try again.
                  </Text>
                  <Button onClick={() => refetch?.()} variant="secondary">
                    Retry
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mt-[1.6rem] border border-border bg-input-filled px-[1.2rem] py-[0.8rem] rounded-[0.8rem] w-fit flex items-center gap-[1.6rem]">
                    {["Connected Channels", "All Channels"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setChannelView(item)}
                        className={cn(
                          "text-[1.6rem] p-[0.8rem] rounded-[0.8rem] transition-all duration-300",
                          item === channelView
                            ? "bg-primary text-text-primary"
                            : "text-inactive-color",
                        )}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <ChannelsSection
                    searchQuery={searchQuery}
                    filter={filter}
                    backendData={displayData}
                    selectedChannels={selectedChannels}
                    setSearchQuery={setSearchQuery}
                    setFilter={setFilter}
                    canEdit={channelView === "Connected Channels"}
                  />
                </>
              )}
            </div>
          )}
        </div>

        {!isConnectionMode && (
          <div className="sticky bottom-0 bg-primary py-[1.4rem] sm:py-[4rem] px-[1.4rem] lg:px-[4rem] flex items-center justify-between gap-[10px] w-full">
            {isMinimal ? (
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => onClose()}
              >
                Go back
              </Button>
            ) : channelView === "All Channels" ? (
              <>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={handleGoBackToConnected}
                >
                  Go Back
                </Button>
                <Button className="w-full" onClick={handleContinueToConnection}>
                  Continue
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => onClose()}
                >
                  Go back
                </Button>
                <Button className="w-full" onClick={() => onClose()}>
                  Save
                </Button>
              </>
            )}
          </div>
        )}
        <RedirectModal />
      </RedirectModalProvider>
    </Modal>
  );
}

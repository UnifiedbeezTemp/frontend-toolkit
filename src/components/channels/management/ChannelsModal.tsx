"use client";

import { cn } from "../../../lib/utils";
import SearchSection from "../../channel-selection/SearchSection";
import CloseModalButton from "../../modal/CloseModalButton";
import Modal from "../../modal/Modal";
import ModalHeader from "../../modal/ModalHeader";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import { RedirectModalProvider } from "../context/RedirectModalContext";
import { useChannelsSettings } from "../hooks/useChannelsSettings";
import ChannelConnection from "./ChannelConnection";
import RedirectModal from "./RedirectModal";
import ChannelsSection from "./sub-components/ChannelsSection";
import Text from "../../ui/Text";

interface ChildProps {
  isMinimal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ChannelsModal({
  isMinimal = false,
  isOpen: propsIsOpen,
  onClose: propsOnClose,
}: ChildProps) {
  const {
    isOpen: hookIsOpen,
    onClose: hookOnClose,
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

  const isOpen = propsIsOpen ?? hookIsOpen;
  const onClose = propsOnClose ?? hookOnClose;

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

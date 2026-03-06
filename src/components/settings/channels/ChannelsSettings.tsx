import { cn } from "../../../lib/utils";
import SearchSection from "../../channel-selection/SearchSection";
import { RedirectModalProvider } from "../../channels/context/RedirectModalContext";
import ChannelConnection from "../../channels/management/ChannelConnection";
import RedirectModal from "../../channels/management/RedirectModal";
import ChannelsSection from "../../channels/management/sub-components/ChannelsSection";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import { useChannelsSettings } from "./hooks/useChannelsSettings";

export default function ChannelsSettings() {
  const {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[20rem]">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[20rem] gap-[1rem]">
        <p className="text-text-secondary">Failed to load channels</p>
        <button
          onClick={() => refetch()}
          className="text-brand-primary underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isConnectionMode) {
    return (
      <RedirectModalProvider>
        <ChannelConnection onBack={handleExitConnectionMode} />

        <RedirectModal />
      </RedirectModalProvider>
    );
  }

  return (
    <RedirectModalProvider>
      <div className="px-[1.6rem] lg:px-0">
        <div className="">
          <SearchSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filter={filter}
            setFilter={setFilter}
          />
        </div>

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
          canEdit={channelView === "Connected Channels"}
          onSwitchToAll={() => setChannelView("All Channels")}
          setSearchQuery={setSearchQuery}
          setFilter={setFilter}
        />

        {channelView === "All Channels" && (
          <div className="sticky bottom-0 left-0 right-0 p-[1.6rem] gap-[1.6rem] border-border mt-[2.4rem] flex justify-between items-center z-10">
            <Button
              variant="secondary"
              onClick={handleGoBackToConnected}
              className="w-full"
            >
              Go Back
            </Button>
            <Button onClick={handleContinueToConnection} className="w-full">
              Continue
            </Button>
          </div>
        )}

        <RedirectModal />
      </div>
    </RedirectModalProvider>
  );
}

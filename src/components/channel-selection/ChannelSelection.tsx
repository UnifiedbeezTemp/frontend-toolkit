import SelectedChannelsBadge from "./SelectedChannelsBadge";
import { useChannelSelection } from "./hooks/useChannelSelection";
import ChannelTypeSection from "./ChannelTypeSection";
import SearchSection from "./SearchSection";
import { ChannelsApiResponse, SelectedChannelsResponse } from "../../types/channelApiTypes";
import Heading from "../ui/Heading";
import Text from "../ui/Text";

interface ChannelSelectionProps {
  backendData?: ChannelsApiResponse | null;
  selectedChannels?: SelectedChannelsResponse | null;
  title?: string;
  subTitle?: string;
}

export default function ChannelSelection({
  backendData,
  selectedChannels,
  title = "Selected channels you would like to connect",
  subTitle = "Connect as many channels as you like",
}: ChannelSelectionProps) {
  const {
    selectedChannels: selectedChannelsList,
    filteredChannels,
    typeEntries,
    toggleChannel,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    isChannelLoading,
  } = useChannelSelection({ backendData, selectedChannels });

  return (
    <div className="">
      <div className="mx-auto max-w-[50rem] lg:max-w-full">
        <SearchSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={filter}
          setFilter={setFilter}
        />
        <div className="lg:space-y-[1rem] mt-[4rem]">
          <Heading className="text-[1.8rem]">{title}</Heading>
          <Text className="text-[1.4rem]">{subTitle}</Text>
        </div>
        <SelectedChannelsBadge count={selectedChannelsList.length} />
      </div>

      <div className="mt-[4rem] lg:mt-[1rem]">
        <div className="mt-[1.5rem]">
          {typeEntries.length > 0 ? (
            typeEntries.map(([type, typeChannels], index) => (
              <ChannelTypeSection
                key={type}
                type={type}
                channels={typeChannels}
                isLast={index === typeEntries.length - 1}
                onToggleChannel={toggleChannel}
                isChannelLoading={isChannelLoading}
              />
            ))
          ) : (
            <div className="text-center py-[4rem]">
              <Text size="base" className="text-secondary">
                No channels available at the moment.
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

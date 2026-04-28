import SearchSection from "./SearchSection";
import {
  ChannelsApiResponse,
  SelectedChannelsResponse,
} from "../../types/channelApiTypes";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import ChannelCategory from "./ChannelCategory";
import { useChannelSearch } from "./hooks/useChannelSearch";

interface ChannelSelectionProps {
  backendData?: ChannelsApiResponse | null;
  selectedChannels?: SelectedChannelsResponse | null;
  title?: string;
  subTitle?: string;
}

export default function ChannelSelection({
  backendData,
  title = "Selected channels you would like to connect",
  subTitle = "Connect as many channels as you like",
}: ChannelSelectionProps) {
  const {
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    filteredData,
    hasResults,
  } = useChannelSearch(backendData);

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
      </div>

      <div className="mt-[4rem] lg:mt-[1rem]">
        <div className="mt-[1.5rem] min-h-[40rem]">
          {hasResults ? (
            filteredData &&
            Object.entries(filteredData.categories).map(
              ([categoryName, categoryData]) => (
                <ChannelCategory
                  key={categoryName}
                  title={categoryName}
                  data={categoryData}
                  className="py-[2rem] border-inactive-color border-b last:border-b-0"
                />
              ),
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-[8rem] text-center">
              <Heading size="sm" className="text-text-secondary">
                No channels found
              </Heading>
              <Text className="mt-[0.5rem] text-text-tertiary">
                Try adjusting your search or filter to find what you're looking
                for.
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

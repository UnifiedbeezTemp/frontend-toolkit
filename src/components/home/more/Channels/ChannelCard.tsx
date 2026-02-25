"use client";

import FeatureList from "./FeatureList";
import AnimatedBeehive from "./AnimatedBeehive";
import BackgroundBlurs from "../BackgroundBlurs";
import { useChannelCard } from "./hooks/useChannelCard";
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import ChannelsModal from "../../../channels/management/ChannelsModal";

export default function ChannelCard() {
  const {
    showChannelsModal,
    setShowChannelsModal,
    availableChannels,
    selectedChannels,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useChannelCard();

  return (
    <div className="" id="channels">
      <Card className="relative overflow-hidden rounded rounded-[2rem] sm:rounded-[4rem] bg-input-filled lg:px-[4.6rem] mt-[2.3rem] py-[3rem]">
        <BackgroundBlurs className="z-0" />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex- 1 space-y-4 text-left lg:w-[50%] xl:w-[40%]">
            <div className="grid gap-[1.2rem] grid-cols-2 sm:grid-cols-3 items-center">
              <div className="lg:hidden block sm:col-span-1">
                <AnimatedBeehive />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <Button
                  variant="secondary"
                  className="inline-block text-[1.2rem] font-[400] text-dark-base-70 lg:text-[1.6rem] lg:font-[700] rounded-[.8rem] p-[0.8rem]"
                  size="sm"
                >
                  Channels
                </Button>

                <Heading className="text-[1.8rem] lg:text-[2.4rem]">
                  All Conversations, One Hive 🐝
                </Heading>

                <Text className="leading-[2.3rem] text-[1.4rem] hidden sm:block lg:hidden">
                  Connect all your customer touchpoints, from social DMs to
                  email into a single, intelligent inbox. With UnifiedBeez, no
                  message gets lost and no customer is left waiting.
                </Text>
              </div>
            </div>
            <Text className="leading-[2.3rem] text-[1.4rem] sm:hidden lg:block">
              Connect all your customer touchpoints, from social DMs to email
              into a single, intelligent inbox. With UnifiedBeez, no message
              gets lost and no customer is left waiting.
            </Text>
            <FeatureList />
            <Button
              onClick={() => setShowChannelsModal(true)}
              className="rounded-[0.8rem] px-[1.6rem] py-[.5rem] z-[10] relative"
            >
              Connect your channels
            </Button>
          </div>
          <div className="hidden lg:block w-[35%]">
            <AnimatedBeehive />
          </div>
        </div>
      </Card>

      <ChannelsModal
        isOpen={showChannelsModal}
        onClose={() => setShowChannelsModal(false)}
      />
    </div>
  );
}

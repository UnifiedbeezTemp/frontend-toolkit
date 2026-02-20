import Modal from "../modal/Modal";
import { useDowngradeWarning } from "./hooks/useDowngradeWarning";
import { DowngradeWarningModalProps } from "./types";
import DowngradeWarningHeader from "./components/DowngradeWarningHeader";
import PlanTransition from "./components/PlanTransition";
import SavingsDisplay from "./components/SavingsDisplay";
import ItemSelectionHeader from "./components/ItemSelectionHeader";
import TabSwitcher from "./components/TabSwitcher";
import AddonGroupItem from "./components/DowngradeItem";
import ChannelItem from "./components/DowngradeItemGroup";
import DowngradeWarningFooter from "./components/DowngradeWarningFooter";
import WarningBanner from "./components/WarningBanner";
import Text from "../ui/Text";

export default function DowngradeWarningModal({
  isOpen,
  onClose,
  previewData,
  isLoading,
  onProceed,
  isProceedLoading,
}: DowngradeWarningModalProps) {
  const {
    activeTab,
    selectedAddonTypes,
    selectedChannelIds,
    totalItemCount,
    selectedCount,
    totalSavings,
    groupedAddons,
    blockedChannels,
    addonsCount,
    channelsCount,
    handleTabChange,
    handleToggleAddon,
    handleToggleChannel,
    handleSelectAll,
    handleDeselectAll,
    handleToggleGroup,
    isGroupExpanded,
    isProceedDisabled,
  } = useDowngradeWarning({ previewData });

  if (isLoading) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="rounded-[1.6rem] sm:w-[54rem] overflow-hidden"
        bottomSheet
        overflow={false}
      >
        <div className="flex items-center justify-center p-[4rem]">
          <div className="w-[3rem] h-[3rem] border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Modal>
    );
  }

  if (!previewData) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="sm:w-[54rem] overflow-hidden p-0 rounded-t-[1.6rem] sm:rounded-[1.6rem]"
      bottomSheet
      isBlur
      overflow={false}
    >
      <DowngradeWarningHeader onClose={onClose} />

      <div className="px-[1.4rem] sm:px-[2rem]">
        <PlanTransition
          currentPlan={previewData.currentPlan}
          targetPlan={previewData.targetPlan}
        />

        <SavingsDisplay savings={previewData.totalEstimatedRefund / 100} />
      </div>

      <div className="px-[1.4rem] sm:px-[2rem]">
        <ItemSelectionHeader
          selectedCount={selectedCount}
          totalCount={totalItemCount}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
        />

        <TabSwitcher activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="flex-1 overflow-y-auto max-h-[35vh] custom-scrollbar pb-[12.4rem] sm:pb-0">
          {activeTab === "addons" && (
            <div>
              {addonsCount > 0 && (
                <div className="py-[0.8rem]">
                  <Text
                    size="xs"
                    weight="bold"
                    className="text-text-primary uppercase items-center flex gap-[1rem]"
                  >
                    <div className="bg-destructive rounded-full w-[.6rem] h-[.6rem]"></div>{" "}
                    ADD-ONS ({previewData.summary.addonsRefunded}/
                    {previewData.summary.addonsRefunded} SELECTED)
                  </Text>
                </div>
              )}

              {/* {hasSeats && (
                <WarningBanner message="Team members will lose access to their accounts immediately" />
              )} */}

              {groupedAddons.map((group) => (
                <AddonGroupItem
                  key={group.addonType}
                  group={group}
                  isSelected={selectedAddonTypes.has(group.addonType)}
                  isExpanded={isGroupExpanded(group.addonType)}
                  onToggle={() => handleToggleAddon(group.addonType)}
                  onToggleExpand={() => handleToggleGroup(group.addonType)}
                />
              ))}

              {addonsCount === 0 && (
                <div className="py-[3rem] text-center">
                  <Text className="text-text-primary">
                    No add-ons affected by this plan change
                  </Text>
                </div>
              )}
            </div>
          )}

          {activeTab === "channels" && (
            <div>
              {channelsCount > 0 && (
                <div className="py-[0.8rem]">
                  <Text
                    size="xs"
                    weight="bold"
                    className="text-text-primary uppercase flex items-center gap-[1rem]"
                  >
                    <div className="bg-destructive rounded-full w-[.6rem] h-[.6rem]"></div>{" "}
                    CHANNELS ({selectedChannelIds.size}/{channelsCount}{" "}
                    SELECTED)
                  </Text>
                </div>
              )}

              {blockedChannels.map((channel) => (
                <ChannelItem
                  key={channel.channelId}
                  channel={channel}
                  isSelected={selectedChannelIds.has(channel.channelId)}
                  onToggle={() => handleToggleChannel(channel.channelId)}
                />
              ))}

              {channelsCount === 0 && (
                <div className="py-[3rem] text-center">
                  <Text className="text-text-primary">
                    No channels affected by this plan change
                  </Text>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <DowngradeWarningFooter
        selectedCount={selectedCount}
        totalSavings={totalSavings}
        onCancel={onClose}
        onProceed={onProceed}
        isLoading={isProceedLoading}
        disabled={isProceedDisabled}
      />
    </Modal>
  );
}

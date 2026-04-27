import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";
// import ChannelItem from "./ChannelItem";

import Button from "../../../components/ui/Button";
import { useChannelConnectionContext } from "../context/ChannelConnectionContext";
import ChannelPreview from "../ChannelPreview";
import { getChannelAccountsMetadata } from "../../../utils/channels/getSelectedChannelAccountsMetadata";
import ChannelConfigWrapper from "../config/ChannelConfigWrapper";
interface MobileChannelConnectionProps {
  onBack?: () => void;
  hideHeader?: boolean;
}

export default function MobileChannelConnection({
  onBack,
  hideHeader = false,
}: MobileChannelConnectionProps) {
  const {
    selectedChannels,
    activeChannel,
    handleSelectChannel,
    handleEditAccount,
    editingAccount,
    handleClose,
  } = useChannelConnectionContext();

  return (
    <div>
      <div className="flex flex-col gap-4">
        {!hideHeader && (
          <div className="">
            <Heading size="lg" className="text-[1.8rem] sm:text-center">
              Connect selected channels
            </Heading>
            <Text size="sm" className="sm:text-center">
              Connect as many channels as you like
            </Text>
          </div>
        )}
        {onBack && (
          <Button variant="secondary" onClick={onBack} className="w-full">
            Go Back
          </Button>
        )}
      </div>

      <div className="bg-primary rounded-[1.4rem] mt-[1.7rem]">
        <div className="p-[1.6rem] border-b border-border">
          <Text className="font-[700]">Selected Channels</Text>
        </div>

        <div>
          {selectedChannels?.channels?.map((channel) => {
            const isActive = activeChannel?.id === channel.id;
            const { accounts } = getChannelAccountsMetadata(channel);
            return (
              <>
                <ChannelPreview
                  channel={channel}
                  accounts={accounts}
                  isExpanded={isActive}
                  onToggle={() => handleSelectChannel(channel.id)}
                  onEdit={handleEditAccount}
                  editingAccountId={editingAccount?.id}
                />

                {isActive && (
                  <ChannelConfigWrapper
                    channel={channel}
                    onClose={handleClose}
                    onEditAccount={handleEditAccount}
                    editingAccountId={editingAccount?.id || null}
                  />
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useMediaQuery } from "../../hooks/useMediaQuery";
import ChannelConnectionEmptyState from "./components/ChannelConnectionEmptyState";
import DesktopChannelConnection from "./components/DesktopChannelConnection";
import { useChannelConnectionToast } from "./hooks/useChannelConnectionToast";
import { ChannelConnectionProvider, useChannelConnectionContext } from "./context/ChannelConnectionContext";
import MobileChannelConnection from "./components/MobileChannelConnection";

interface ChannelConnectionProps {
  onBack?: () => void;
  hideHeader?: boolean;
}

export default function ChannelConnection(props: ChannelConnectionProps) {
  return (
    <ChannelConnectionProvider>
      <ChannelConnectionContent {...props} />
    </ChannelConnectionProvider>
  );
}

function ChannelConnectionContent({
  onBack,
  hideHeader = false,
}: ChannelConnectionProps) {
  useChannelConnectionToast();
  const { selectedChannels } = useChannelConnectionContext();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (selectedChannels?.channels.length === 0) {
    return (
      <ChannelConnectionEmptyState onBack={onBack} hideHeader={hideHeader} />
    );
  }

  return isDesktop ? (
    <DesktopChannelConnection
      onBack={onBack}
      hideHeader={hideHeader}
    />
  ) : (
    <MobileChannelConnection
      onBack={onBack}
      hideHeader={hideHeader}
    />
  );
}

import Text from "../../../components/ui/Text";
import DesktopSidebar from "./DesktopSidebar";
import ChannelConnectionHeader from "./ChannelConnectionHeader";
import DesktopSettingsPanel from "./DesktopSettingsPanel";

interface ChildProps {
  onBack?: () => void;
  hideHeader?: boolean;
}

export default function DesktopChannelConnection({
  onBack,
  hideHeader,
}: ChildProps) {
  return (
    <div>
      <ChannelConnectionHeader onBack={onBack} hideHeader={hideHeader} />

      <div className="grid grid-cols-10 bg-primary rounded-[.8rem] mt-[2.4rem] h-[calc(100vh-10rem)]">
        <div className="col-span-3 border-r border-border flex flex-col overflow-hidden">
          <div className="p-[1.6rem] py-[2.15rem] border-b border-border flex-shrink-0">
            <Text className="font-[700]">Selected Channels</Text>
          </div>

          <DesktopSidebar />
        </div>

        <div className="col-span-7 flex flex-col overflow-hidden">
          <DesktopSettingsPanel/>
        </div>
      </div>
    </div>
  );
}

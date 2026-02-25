import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import ImageComponent from "../../ui/ImageComponent";
import Text from "../../ui/Text";
import ToggleSwitch from "../../ui/ToggleSwitch";

interface Props {
  isDarkMode: boolean;
  onToggle: () => void;
}

export default function PreviewHeader({ isDarkMode, onToggle }: Props) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex items-center gap-[15px] pl-[20px] border-b border-border py-[12px] bg-primary sticky top-0 z-10">
      <Button variant="secondary" className="p-[10px] rounded-[10px]">
        <ImageComponent
          alt="palette"
          src={icons.palette}
          width={25}
          height={25}
        />
      </Button>
      <div className="flex-1">
        <Heading>Preview</Heading>
        <Text size="sm">See how your email will look with your brand kit.</Text>
      </div>
      <div className="flex items-center gap-3">
        <Text size="sm" className="text-text-secondary">
          {isDarkMode ? "Dark" : "Light"} Mode
        </Text>

        <ToggleSwitch isActive={isDarkMode} onToggle={onToggle}/>
      </div>
    </div>
  );
}

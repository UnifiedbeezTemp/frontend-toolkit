import Input from "../../../forms/Input";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";

interface UrlInputSectionProps {
  url: string;
  onUrlChange: (url: string) => void;
  urlError: string;
}

export default function UrlInputSection({
  url,
  onUrlChange,
  urlError,
}: UrlInputSectionProps) {
  return (
    <div>
      <Heading size="sm" className="text-[1.4rem] lg:text-[1.6rem]">Website URL</Heading>
      <Input
        value={url}
        placeholder="www.unifiedbeez.com"
        onChange={(e) => onUrlChange(e.target.value)}
        className="mt-[0.6rem] placeholder:text-inactive-color"
      />

      {urlError && (
        <Text size="sm" className="text-destructive mt-2">
          {urlError}
        </Text>
      )}
    </div>
  );
}

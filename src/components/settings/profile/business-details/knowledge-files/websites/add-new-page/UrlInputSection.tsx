import Heading from "@/shared/src/components/ui/Heading";
import Input from "@/shared/src/components/ui/Input";
import Text from "@/shared/src/components/ui/Text";

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
      <Heading size="sm">Website URL</Heading>
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

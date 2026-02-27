import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import Text from "@/shared/src/components/ui/Text";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";

interface Props {
  title: string;
  text: string;
  right?: boolean;
}

export default function FeatureItem({ title, text, right }: Props) {
  const icons = useSupabaseIcons();
  const icon = icons.check;
  return (
    <div
      className={`flex items-center gap-3 ${
        right ? "lg:flex-row-reverse text-right" : ""
      }`}
    >
      <ImageComponent
        src={icon}
        alt=""
        width={25}
        height={25}
        className="shrink-0 flex-1 w-[1.8rem] lg:w-[2.5rem]"
      />
      <Text
      size="xs"
        className={`${
          right ? "lg:text-right" : "text-left"
        }  text-text-primary flex-1 leading-[1.7rem]`}
      >
        <span className="font-[700]">{title}</span>: {text}
      </Text>
    </div>
  );
}

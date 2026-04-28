import Heading from "../ui/Heading";

import { ChannelCategory as ChannelCategoryTypes } from "../../types/channelApiTypes";
import { cn } from "../../lib/utils";
import { convertToReadable } from "./utils/formatChannelCategoryTitle";
import ChannelCardV2 from "./ChannelCardV2";

interface ChannelCategoryProps {
  title: string;
  data: ChannelCategoryTypes;
  canEdit?: boolean;
  className: string;
}
export default function ChannelCategory({
  title,
  data,
  canEdit,
  className,
}: ChannelCategoryProps) {
  return (
    <div className={cn("", className)}>
      <Heading size="md" className="mb-[1.4rem] text-[1.8rem]">
        {convertToReadable(title)}
      </Heading>

      <div className="mt-[10px] grid grid-cols-2 md:grid-cols-3 gap-[.5rem] lg:gap-[1.6rem]">
        {data?.channels?.map((channel, idx) => {
          return <ChannelCardV2 key={idx} channel={channel} canEdit={canEdit}/>;
        })}
      </div>
    </div>
  );
}

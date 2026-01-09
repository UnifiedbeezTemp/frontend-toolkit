import { Addon } from "../types";

interface AddonInfoProps {
  addon: Addon;
}

export const AddonInfo: React.FC<AddonInfoProps> = ({ addon }) => {
  return (
    <div className="mt-[1.6rem] gap-[.7rem] flex flex-col items-start md:flex-row">
      <div className="border border-border text-[1.4rem] text-text-primary px-[0.61rem] py-[0.31rem] rounded-[0.4rem] inline-block">
        {addon.priceText}
      </div>
      <div className="border border-border text-[1.4rem] text-text-primary px-[0.61rem] py-[0.31rem] rounded-[0.4rem] inline-block">
        {addon.limitText}
      </div>
    </div>
  );
};

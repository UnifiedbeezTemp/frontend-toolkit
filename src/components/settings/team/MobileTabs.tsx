interface MobileTabsProps {
  activeTab: "invited" | "members";
  onTabClick: (tab: "invited" | "members") => void;
}

export const MobileTabs = ({ activeTab, onTabClick }: MobileTabsProps) => {
  return (
    <div className="lg:hidden py-[.8rem] mb-[2.4rem] px-[0.8rem] flex items-center gap-[.8rem] mt-[2rem] sm:mt-[0] bg-input-filled rounded-[0.8rem] border border-border">
      <button
        className={`text-[1.6rem] p-[.8rem] rounded-[0.8rem] transition-colors ${
          activeTab === "invited"
            ? "bg-primary"
            : "border-border text-input-stroke"
        }`}
        onClick={() => onTabClick("invited")}
      >
        Invited Users
      </button>
      <button
        className={`text-[1.6rem] p-[.8rem] rounded-[0.8rem] transition-colors ${
          activeTab === "members"
            ? "bg-primary"
            : "border-border text-input-stroke"
        }`}
        onClick={() => onTabClick("members")}
      >
        Team Members
      </button>
    </div>
  );
};

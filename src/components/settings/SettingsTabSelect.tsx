import { getTabsList } from "./utils/tabsList";
import RegularTabItem from "./components/RegularTabItem";
import BillingTabSelect from "./components/BillingTabSelect";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";

interface Props {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export default function SettingsTabSelect({ activeTab, setActiveTab }: Props) {
  const icons = useSupabaseIcons();
  const tabs = getTabsList(icons);

  return (
    <div className="bg-primary border border-border justify-between flex items-center gap-[1.6rem] p-[0.8rem] lg:rounded-[0.9rem] lg:max-w-[86%] overflow-x-scroll w-screen sm:w-full no-scrollbar">
      {tabs.map((tab, idx) => {
        if (tab.name === "Plans & billings") {
          return (
            <BillingTabSelect
              key={idx}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          );
        }

        return (
          <RegularTabItem
            key={idx}
            tab={tab}
            isActive={tab.name === activeTab}
            onClick={() => setActiveTab(tab.name)}
          />
        );
      })}
    </div>
  );
}

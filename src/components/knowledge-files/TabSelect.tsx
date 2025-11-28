import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";

interface Props {
  activeTab: "files" | "website";
  setActiveTab: (value: "files" | "website") => void;
}

export default function TabsSelect({ activeTab, setActiveTab }: Props) {
  const icons = useSupabaseIcons();

  return (
    <>
      <div className="p-[.8rem] bg-input-filled rounded-[0.8rem] border border-border flex items-center gap-[1.6rem] border border-input-stroke">
        <button
          onClick={() => setActiveTab("files")}
          className={`text-[1.6rem] p-[0.8rem] rounded-[0.8rem] border flex items-center gap-[0.8rem] transition-colors ${
            activeTab === "files"
              ? "border-border bg-primary text-text-primary"
              : "border-transparent text-text-primary/60"
          }`}
        >
          <ImageComponent
            src={activeTab === "files" ? icons.fileActive : icons.fileInactive}
            alt=""
            width={30}
            height={30}
            className="w-[2.5rem] lg:w-[3rem]"
          />
          Files
        </button>
        <button
          onClick={() => setActiveTab("website")}
          className={`text-[1.6rem] p-[0.8rem] rounded-[0.8rem] border flex items-center gap-[0.8rem] transition-colors ${
            activeTab === "website"
              ? "border-border bg-primary text-text-primary"
              : "border-transparent text-text-primary/60"
          }`}
        >
          <ImageComponent
            src={
              activeTab === "website"
                ? icons.websiteActive
                : icons.websiteInactive
            }
            alt=""
            width={30}
            height={30}
            className="w-[2.5rem] lg:w-[3rem]"
          />
          Website
        </button>
      </div>
    </>
  );
}

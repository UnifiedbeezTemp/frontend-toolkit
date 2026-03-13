import { TemplateFormData, HandleChange } from "../types";
import BasicTemplateInfo from "./form-sections/BasicTemplateInfo";
import AttachmentHeadingSection from "./form-sections/AttachmentHeadingSection";
import FooterButtonsSection from "./form-sections/FooterButtonsSection";
import FolderSection from "./form-sections/FolderSection";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";

interface TemplateCreationFormProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
  setActiveDropdown: (name: string | null) => void;
  onTogglePreview?: () => void;
}

export default function TemplateCreationForm({
  formData,
  handleChange,
  activeDropdown,
  toggleDropdown,
  setActiveDropdown,
  onTogglePreview,
}: TemplateCreationFormProps) {
  return (
    <div className="flex flex-col gap-[2.4rem]">
      <BasicTemplateInfo
        formData={formData}
        handleChange={handleChange}
        activeDropdown={activeDropdown}
        toggleDropdown={toggleDropdown}
        setActiveDropdown={setActiveDropdown}
      />

      <div className="w-full h-[0.1rem] bg-border" />

      <AttachmentHeadingSection
        formData={formData}
        handleChange={handleChange}
      />

      <FooterButtonsSection
        formData={formData}
        handleChange={handleChange}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />

      <div className="w-full h-[0.1rem] bg-border" />

      <FolderSection
        formData={formData}
        handleChange={handleChange}
        activeDropdown={activeDropdown}
        toggleDropdown={toggleDropdown}
        setActiveDropdown={setActiveDropdown}
      />

      <button
        type="button"
        onClick={onTogglePreview}
        className="lg:hidden w-full h-[5.6rem] mt-[0.8rem] rounded-[1.2rem] flex items-center justify-between px-[2rem] text-white font-bold text-[1.6rem] hover:opacity-90 transition-opacity"
        style={{
          background: "linear-gradient(90deg, var(--brand-secondary) 0%, var(--brand-primary) 100%)",
        }}
      >
        <span>WhatsApp templates preview</span>
        <ChevronDownIcon size={14} color="white" />
      </button>
    </div>
  );
}

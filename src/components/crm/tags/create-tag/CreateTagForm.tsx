import Input from "../../../forms/Input";
import Textarea from "../../../forms/Textarea";
import { SmartDropdown, DropdownItem } from "../../../smart-dropdown";
import { useCreateTag } from "./useCreateTag";
import { CRMTag } from "../types";
import ChevronDownIcon from "../../../../assets/icons/ChevronDownIcon";
import Button from "../../../ui/Button";
import { TagCategory } from "../../../../store/slices/tagSlice";

interface CreateTagFormProps {
  onClose: () => void;
  addTag: (tag: CRMTag) => void;
}

export default function CreateTagForm({ onClose, addTag }: CreateTagFormProps) {
  const {
    formData,
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
    categoryTriggerRef,
    handleInputChange,
    handleSelectCategory,
    handleSubmit,
    getCategoryLabel,
    getCategoryEmoji,
    categories,
  } = useCreateTag(onClose, addTag);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[2rem] pt-[1.6rem]"
    >
      <Input
        label="Tag Name"
        placeholder="e.g Lifestyle stage"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        showRequired
        required
      />

      <div className="flex flex-col gap-[0.8rem] relative">
        <label className="text-text-secondary text-[1.6rem] font-[700]">
          Category
        </label>
        <button
          type="button"
          ref={categoryTriggerRef}
          onClick={() => setIsCategoryDropdownOpen(true)}
          className="w-full flex items-center justify-between px-[1.4rem] py-[1rem] border border-border rounded-[0.8rem] bg-primary text-[1.4rem] hover:border-brand-primary transition-colors h-[4.4rem]"
        >
          <div className="flex items-center gap-[0.8rem]">
            <span>{getCategoryEmoji(formData.category)}</span>
            <span className="text-text-primary">
              {getCategoryLabel(formData.category)}
            </span>
          </div>
          <ChevronDownIcon size={16} color="var(--text-primary-2)" />
        </button>
        <SmartDropdown
          isOpen={isCategoryDropdownOpen}
          onClose={() => setIsCategoryDropdownOpen(false)}
          triggerRef={categoryTriggerRef}
          className="lg:w-[55.2rem]"
          maxHeight="none"
        >
          <div className="p-2">
            {categories.map((cat) => (
              <DropdownItem
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id as TagCategory)}
                className={formData.category === cat.id ? "bg-accent" : ""}
              >
                <div className="flex items-center gap-[0.8rem] text-[1.4rem]">
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </div>
              </DropdownItem>
            ))}
          </div>
        </SmartDropdown>
      </div>

      <Textarea
        label="Tag Description"
        placeholder="Describe the purpose of this tag"
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />

      <Textarea
        label="Use Case"
        placeholder="e.g Used to track product order life cycle"
        value={formData.useCase}
        onChange={(e) => handleInputChange("useCase", e.target.value)}
      />

      <div className="flex items-center gap-[1.2rem] mt-[1rem]">
        <Button
          variant="secondary"
          type="button"
          onClick={onClose}
          className="w-full h-[4.4rem]"
        >
          Cancel
        </Button>
        <Button type="submit" className="w-full h-[4.4rem] grad-btn">
          Save
        </Button>
      </div>
    </form>
  );
}

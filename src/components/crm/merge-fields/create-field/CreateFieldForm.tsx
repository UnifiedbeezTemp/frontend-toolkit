import Input from "../../../forms/Input";
import { SmartDropdown, DropdownItem } from "../../../smart-dropdown";
import { useCreateField } from "./useCreateField";
import { MergeField, MergeFieldCategory } from "../types";
import ChevronDownIcon from "../../../../assets/icons/ChevronDownIcon";
import Button from "../../../ui/Button";
import CheckBox from "../../../ui/CheckBox";

interface CreateFieldFormProps {
  onClose: () => void;
  addField: (field: MergeField) => void;
}

export default function CreateFieldForm({
  onClose,
  addField,
}: CreateFieldFormProps) {
  const {
    formData,
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
    categoryTriggerRef,
    handleInputChange,
    handleSelectCategory,
    handleSubmit,
    getCategoryLabel,
    categories,
  } = useCreateField(onClose, addField);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[2rem] pt-[1.6rem]"
    >
      <Input
        label="Field name"
        placeholder="e.g Lifestyle stage"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        showRequired
        required
      />

      <div className="flex flex-col gap-[0.8rem] relative">
        <label className="text-text-secondary text-[1.6rem] font-[700]">
          Field Type
        </label>
        <button
          type="button"
          ref={categoryTriggerRef}
          onClick={() => setIsCategoryDropdownOpen(true)}
          className="w-full flex items-center justify-between px-[1.4rem] py-[1rem] border border-border rounded-[0.8rem] bg-primary text-[1.4rem] hover:border-brand-primary transition-colors h-[4.4rem]"
        >
          <span className="text-text-primary">
            {getCategoryLabel(formData.category)}
          </span>
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
                key={cat.value}
                onClick={() =>
                  handleSelectCategory(cat.value as MergeFieldCategory)
                }
                className={formData.category === cat.value ? "bg-accent" : ""}
              >
                <span className="text-[1.4rem]">{cat.label}</span>
              </DropdownItem>
            ))}
          </div>
        </SmartDropdown>
      </div>

      <div className="flex items-start gap-[1.2rem]">
        <CheckBox
          checked={false}
          onChange={() => {}}
          className="w-[1.8rem] h-[1.8rem] rounded-[0.4rem] shrink-0 mt-[0.2rem]"
        />
        <p className="text-[1.4rem] text-text-primary leading-[2rem]">
          Create this as a field if it&apos;s unique contact information (like a
          name, date, or phone number) you may need to update, or if you want it
          to appear in emails for personalization. For details tied to actions,
          interests, or behaviors (like purchases or web visits), consider using
          a tag instead.
        </p>
      </div>

      <div className="flex items-center gap-[1.2rem] mt-[1rem]">
        <Button
          variant="secondary"
          type="button"
          onClick={onClose}
          className="w-full h-[4.4rem]"
        >
          Cancel
        </Button>
        <Button type="submit" className="w-full h-[4.4rem]">
          Save
        </Button>
      </div>
    </form>
  );
}

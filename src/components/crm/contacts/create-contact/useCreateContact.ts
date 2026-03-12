import { useState, useRef } from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../store/hooks/useRedux";
import { useTags } from "../../../tags/hooks/useTags";
import {
  toggleTagSelection,
  clearSelection,
} from "../../../../store/slices/tagSlice";
import { addContact } from "../../../../store/slices/contactSlice";
import { AUTOMATION_TYPES } from "../../../../constants/automations";
import { RootState } from "../../../../store";

export interface CreateContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  list: string;
}

export function useCreateContact(onClose: () => void) {
  const dispatch = useAppDispatch();

  // Initialize tags
  useTags();

  const allTags = useAppSelector((state: RootState) => state.tag.tags);
  const selectedTagIds = useAppSelector(
    (state: RootState) => state.tag.selectedTags,
  );

  const selectedTags = allTags.filter((tag) => selectedTagIds.includes(tag.id));

  const [formState, setFormState] = useState<CreateContactFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    countryCode: "US", // Default
    list: AUTOMATION_TYPES[0],
  });

  const [isListDropdownOpen, setIsListDropdownOpen] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  const listTriggerRef = useRef<HTMLButtonElement>(null);
  const tagTriggerRef = useRef<HTMLButtonElement>(null);

  const handleInputChange = (
    field: keyof CreateContactFormState,
    value: string,
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleTag = (tagId: string) => {
    dispatch(toggleTagSelection(tagId));
  };

  const handleRemoveTag = (tagId: string) => {
    dispatch(toggleTagSelection(tagId));
  };

  const toggleListDropdown = () => setIsListDropdownOpen((prev) => !prev);
  const closeListDropdown = () => setIsListDropdownOpen(false);

  const toggleTagDropdown = () => setIsTagDropdownOpen((prev) => !prev);
  const closeTagDropdown = () => setIsTagDropdownOpen(false);

  const handleListSelect = (list: string) => {
    handleInputChange("list", list);
    closeListDropdown();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newContact = {
      id: Date.now().toString(),
      name: `${formState.firstName} ${formState.lastName}`,
      username: `@${formState.firstName.toLowerCase()}${Math.floor(Math.random() * 1000)}`,
      email: formState.email,
      phone: formState.phoneNumber,
      dateCreated: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
      status: "active" as const, // Default for new contacts
      list: formState.list,
    };

    dispatch(addContact(newContact));

    // Clear selection and close
    dispatch(clearSelection());
    onClose();
  };

  const handleCancel = () => {
    dispatch(clearSelection());
    onClose();
  };

  return {
    formState,
    allTags,
    selectedTags,
    selectedTagIds,
    automationTypes: AUTOMATION_TYPES,
    isListDropdownOpen,
    isTagDropdownOpen,
    listTriggerRef,
    tagTriggerRef,
    handleInputChange,
    handleToggleTag,
    handleRemoveTag,
    toggleListDropdown,
    closeListDropdown,
    toggleTagDropdown,
    closeTagDropdown,
    handleListSelect,
    handleSubmit,
    handleCancel,
  };
}

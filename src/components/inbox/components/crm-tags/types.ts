import { Tag, CategoryId } from "../../types";

export interface CategoryConfigItem {
  label: string; 
  icon: React.ElementType; 
  headerIconColor: string;
  pillColor: string;
  borderColor: string;
  textColor: string;
}

export interface CRMTagsProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  tags?: Tag[];
  className?: string;
}

export interface CRMTagSectionProps {
  categoryId: CategoryId;
  tags: Tag[];
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
  onAddTag: (label: string) => void;
  defaultOpen?: boolean;
}

export interface CRMTagItemProps {
  tag: Tag;
  isSelected: boolean;
  onToggle: (tagId: string) => void;
  config: CategoryConfigItem;
}

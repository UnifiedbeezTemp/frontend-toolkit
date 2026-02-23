import { TAG_CATEGORIES } from "../utils/tagConstants";
import { useTagsTableHeader } from "../hooks/useTagsTableHeader";
import { cn } from "../../../lib/utils";

export default function TagsCategoryTabs() {
  const { selectedCategory, handleCategoryChange } = useTagsTableHeader();

  return (
    <div className="flex items-center border-b border-input-stroke overflow-x-auto no-scrollbar">
      {TAG_CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={cn(
              "flex items-center gap-2 py-4 border-b-2 transition-all duration-300 whitespace-nowrap px-[1.4rem]",
              isActive
                ? "border-brand-primary text-brand-primary font-bold"
                : "border-transparent text-text-primary/50 hover:text-text-primary",
            )}
          >
            <span className="text-[1.6rem]">{cat.emoji}</span>
            <span className="text-[1.4rem]">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}

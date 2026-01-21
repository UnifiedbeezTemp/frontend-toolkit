import { useState, useMemo } from "react";
import { Tag, CategoryId } from "../../../types";
import { allTags } from "../../../temp/crmTags";
import { CATEGORY_CONFIG } from "../config";

export const useCRMTags = (initialTags: Tag[] = allTags) => {
  const [tags, setTags] = useState<Tag[]>(initialTags);

  const visibleSections = useMemo(() => {
    const groups = tags.reduce((acc, tag) => {
      const category = tag.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category]?.push(tag);
      return acc;
    }, {} as Partial<Record<CategoryId, Tag[]>>);

    return (Object.keys(CATEGORY_CONFIG) as CategoryId[]).reduce<{ id: CategoryId; tags: Tag[] }[]>((acc, catId) => {
      const categoryTags = groups[catId];
      if (categoryTags && categoryTags.length > 0) {
        acc.push({
          id: catId,
          tags: categoryTags
        });
      }
      return acc;
    }, []);
  }, [tags]);

  const addTag = (newTag: Tag) => {
    setTags(prev => [...prev, newTag]);
  };

  const deleteTag = (tagId: string) => {
    setTags(prev => prev.filter(t => t.id !== tagId));
  };

  return {
    tags,
    visibleSections,
    addTag,
    deleteTag
  };
};

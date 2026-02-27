import { useState, useMemo } from "react";
import { DISCOVER_TEMPLATES, Template } from "./discoverTemplatesData";

export const CATEGORIES = [
  { label: "All", value: "All" },
  { label: "General", value: "General" },
  { label: "E-commerce / Retail", value: "E-commerce / Retail" },
  { label: "Real Estate", value: "Real Estate" },
  { label: "Education / Online Courses", value: "Education / Online Courses" },
  { label: "Finance / Accounting", value: "Finance / Accounting" },
  { label: "Legal Services", value: "Legal Services" },
  { label: "Beauty & Wellness", value: "Beauty & Wellness" },
  { label: "Automative Services", value: "Automative Services" },
  { label: "Tech Support / Saas", value: "Tech Support / Saas" },
  { label: "Property Management", value: "Property Management" },
];

export const LANGUAGES = [
  { label: "English", value: "English", icon: "🇺🇸" },
  { label: "Spanish", value: "Spanish", icon: "🇪🇸" },
];

export function useDiscoverTemplates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (val: { label: string; value: string }) => {
    setSelectedCategory(val);
    setActiveDropdown(null);
  };

  const handleLanguageChange = (val: {
    label: string;
    value: string;
    icon: string;
  }) => {
    setSelectedLanguage(val);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const groupedTemplates = useMemo(() => {
    const filtered = DISCOVER_TEMPLATES.filter((template) => {
      const matchesSearch =
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory.value === "All" ||
        template.category === selectedCategory.value;

      return matchesSearch && matchesCategory;
    });

    return filtered.reduce(
      (acc, template) => {
        if (!acc[template.category]) {
          acc[template.category] = [];
        }
        acc[template.category].push(template);
        return acc;
      },
      {} as Record<string, Template[]>,
    );
  }, [searchQuery, selectedCategory]);

  return {
    searchQuery,
    selectedCategory,
    selectedLanguage,
    activeDropdown,
    groupedTemplates,
    handleSearchChange,
    handleCategoryChange,
    handleLanguageChange,
    toggleDropdown,
    setActiveDropdown,
  };
}

import React from "react";
import TemplateCard from "../TemplateCard";
import { TemplateFormData } from "../../types";
import { Template } from "../../hooks/discoverTemplatesData";

interface DiscoverGridProps {
  groupedTemplates: Record<string, Template[]>;
  onUseTemplate: (template: TemplateFormData) => void;
}

export function DiscoverGrid({
  groupedTemplates,
  onUseTemplate,
}: DiscoverGridProps) {
  return (
    <div className="flex flex-col gap-[3.2rem]">
      {Object.entries(groupedTemplates).map(([category, templates]) => (
        <div key={category}>
          <h3 className="text-[1.6rem] font-bold text-text-secondary mb-[1.6rem]">
            {category}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2rem] sm:gap-[1rem]">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                id={template.id}
                title={template.title}
                description={template.description}
                category={template.category}
                formData={template.formData}
                onUse={onUseTemplate}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

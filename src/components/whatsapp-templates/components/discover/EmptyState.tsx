import React from "react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-[8rem] text-center">
      <p className="text-[1.6rem] text-text-secondary font-bold mb-[0.8rem]">
        No templates found
      </p>
      <p className="text-[1.4rem] text-text-primary">
        Try adjusting your search or filters.
      </p>
    </div>
  );
}

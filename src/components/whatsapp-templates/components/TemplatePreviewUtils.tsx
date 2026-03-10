import React from "react";

export function renderMessageWithVariables(message: string): React.ReactNode {
  if (!message) return null;

  const parts = message.split(/(\{\{[^}]+\}\})/g);

  return parts.map((part, index) => {
    if (part.match(/^\{\{[^}]+\}\}$/)) {
      const variableName = part.slice(2, -2).trim();
      return (
        <span
          key={index}
          className="bg-text-secondary/10 text-text-secondary font-medium px-[0.4rem] py-[0.1rem] rounded-[0.3rem]"
        >
          {variableName}
        </span>
      );
    }
    return part;
  });
}

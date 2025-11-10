import React from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "div" | "section" | "article";
}

export default function Card({
  children,
  className = "",
  onClick,
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={cn(
        "border border-border rounded-[0.8rem] p-[1.6rem] shadow bg-primary cursor-pointer hover:shadow-md transition-shadow duration-300",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}

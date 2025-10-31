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
        "border border-border rounded-lg px-[10px] py-[15px] shadow bg-primary flex flex-col gap-[50px] cursor-pointer hover:shadow-md transition-shadow duration-300",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}

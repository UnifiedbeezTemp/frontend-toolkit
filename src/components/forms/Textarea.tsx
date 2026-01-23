import React, { TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[0.8rem] w-full">
        {label && (
          <label className="block text-text-secondary text-[1.6rem] font-[700] mb-2 flex">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[12rem] w-full rounded-[0.8rem] py-[0.8rem] px-[1rem] bg-primary",
            "border border-(--input-stroke)",
            "focus:border-(--primary-90) focus:ring-4 focus:ring-(--focus-ring) focus:outline-none",
            "shadow-xs",
            "placeholder:text-text-primary placeholder:text-[1.6rem]",
            "text-text-primary text-[1.6rem] transition-colors duration-200",
            "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
            error
              ? "border-destructive focus:border-destructive"
              : "border-border focus:border-brand-primary",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="mt-[0.6rem] text-[1.4rem] text-destructive">
            {error}
          </span>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export default Textarea;

import React from 'react';
import { cn } from '../../lib/utils';

/**
 * REUSABLE INPUT COMPONENT
 * 
 * USAGE:
 * <Input value={value} onChange={setValue} placeholder="Enter text" />
 * <Input type="email" leftIcon={<MailIcon />} placeholder="Email" />
 * <Input type="password" rightIcon={<EyeIcon />} placeholder="Password" />
 * <Input className="custom-styles" placeholder="Custom input" />
 * 
 * PROPS:
 * - value: Input value (required)
 * - onChange: Change handler (required)
 * - placeholder: Placeholder text (default: '')
 * - type: text | email | password | number (default: text)
 * - leftIcon: React node for left icon
 * - rightIcon: React node for right icon
 * - className: Add custom styles (overrides defaults)
 * - disabled: Boolean for when input can be used
 * 
 * DEFAULTS:
 * - Border focus states
 * - Automatic padding for icons
 * - Customizable placeholder
 * - Full width container
 */

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function Input({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  leftIcon,
  rightIcon,
  className = '',
  disabled = false,
}: InputProps) {
  return (
    <div className="relative w-full">
      {leftIcon && (
        <div className="absolute left-[1.4rem] top-1/2 transform -translate-y-1/2 flex items-center justify-center h-6">
          {leftIcon}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "w-full border border-input-stroke rounded-[0.8rem] px-[1.4rem] py-[1rem]",
          "focus:ring-0 focus:outline-0 focus:border-brand-primary focus:shadow-[0_0_0_5px_rgba(5,61,39,0.1)]",
          "placeholder:text-text-primary placeholder:text-[1.6rem]",
          "text-text-primary bg-transparent text-[1.6rem]",
          "leading-[1.6rem] transition-all duration-300",
          leftIcon && "pl-[4rem]",
          rightIcon && "pr-[4rem]",
          className
        )}
      />
      {rightIcon && (
        <div className="absolute right-[1.4rem] top-1/2 transform -translate-y-1/2 flex items-center justify-center h-6">
          {rightIcon}
        </div>
      )}
    </div>
  );
}
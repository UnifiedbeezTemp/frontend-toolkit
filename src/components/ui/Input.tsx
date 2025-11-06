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
}

export default function Input({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  leftIcon,
  rightIcon,
  className = ''
}: InputProps) {
  return (
    <div className="relative w-full">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {leftIcon}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full border border-border rounded-lg py-[6px] px-[10px]",
          "focus:ring-0 focus:outline-0 focus:border-brand-primary",
          "placeholder:text-text-primary placeholder:text-[16px]",
          "text-text-primary bg-transparent",
          leftIcon && "pl-10",
          rightIcon && "pr-10",
          className
        )}
      />
      {rightIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>
  );
}
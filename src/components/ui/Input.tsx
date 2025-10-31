import React from 'react';

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
        className={`
          w-full border border-border rounded-lg py-[6px] px-[10px] 
          focus:ring-0 focus:outline-0 placeholder:text-text-primary 
          placeholder:text-[16px] focus:border-brand-primary text-text-primary
          ${leftIcon ? 'pl-10' : ''}
          ${rightIcon ? 'pr-10' : ''}
          ${className}
        `}
      />
      {rightIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>
  );
}
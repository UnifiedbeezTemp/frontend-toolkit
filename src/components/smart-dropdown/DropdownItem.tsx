"use client";

/**
 * COMPONENT: DropdownItem
 * 
 * PURPOSE:
 * Individual item within a dropdown menu
 * Handles click events and disabled states
 * 
 * USAGE:
 * <DropdownItem onClick={() => console.log('Clicked')}>
 *   <EditIcon /> Edit Item
 * </DropdownItem>
 * 
 * <DropdownItem disabled className="text-red-600">
 *   <DeleteIcon /> Delete Item
 * </DropdownItem>
 * 
 * PROPS:
 * - onClick: () => void - Click handler
 * - className: string - Additional CSS classes
 * - disabled: boolean - Whether item is disabled
 * - children: React.ReactNode - Item content
 */

interface DropdownItemProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export function DropdownItem({
  onClick,
  className = "",
  disabled = false,
  children,
}: DropdownItemProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`
        w-full text-left px-3 py-2 rounded-md transition-colors
        flex items-center gap-2
        ${disabled
          ? "text-gray-400 cursor-not-allowed opacity-60"
          : "hover:bg-accent text-text-primary cursor-pointer"
        }
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </button>
  );
}
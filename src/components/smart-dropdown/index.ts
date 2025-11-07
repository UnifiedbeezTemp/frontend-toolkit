/**
 * DROPDOWN MODULE EXPORTS
 * 
 * PURPOSE:
 * Central export point for all dropdown components
 * Provides clean imports for consumers
 * 
 * USAGE:
 * import { SmartDropdown, DropdownItem } from '@/components/ui/Dropdown';
 * 
 * COMPONENTS:
 * - SmartDropdown: Main dropdown container with smart positioning
 * - DropdownItem: Individual dropdown menu item
 */

export { default as SmartDropdown } from './SmartDropdown';
export { DropdownItem } from './DropdownItem';
export type { DropdownPlacement } from './SmartDropdown';
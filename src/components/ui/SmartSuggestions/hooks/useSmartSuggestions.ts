export function useSmartSuggestions(isActive: boolean, onToggle: (value: boolean) => void) {
  const handleToggle = () => {
    onToggle(!isActive);
  };

  return {
    handleToggle,
  };
}

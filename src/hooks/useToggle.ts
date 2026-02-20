import { useCallback, useEffect, useState } from "react";
import { isBoolean } from "../utils";

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((newValue?: boolean) => {
    if(isBoolean(newValue))
      return setValue(newValue)
    return setValue((prev) => !prev);
  }, []);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse, initialValue };
}

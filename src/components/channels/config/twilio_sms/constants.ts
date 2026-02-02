import { NumberType } from "./types";

export const NUMBER_TYPE_OPTIONS: { value: NumberType; label: string }[] = [
  { value: "local", label: "Local" },
  { value: "mobile", label: "Mobile" },
  { value: "tollFree", label: "Toll-Free" },
  { value: "all", label: "All Types" },
];

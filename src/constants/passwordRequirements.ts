export const PASSWORD_REQUIREMENTS = [
  {
    key: "length",
    label: "At least 8 characters",
    test: (pwd: string) => pwd?.length >= 8,
  },
  {
    key: "uppercase",
    label: "At least one uppercase letter",
    test: (pwd: string) => /[A-Z]/.test(pwd || ""),
  },
  {
    key: "lowercase",
    label: "At least one lowercase letter",
    test: (pwd: string) => /[a-z]/.test(pwd || ""),
  },
  {
    key: "number",
    label: "At least one digit",
    test: (pwd: string) => /[0-9]/.test(pwd || ""),
  },
  {
    key: "special",
    label: "At least one special character",
    test: (pwd: string) => /[^A-Za-z0-9]/.test(pwd || ""),
  },
] as const;

# ThemeProvider Usage Guide

This guide explains how to use the shared `ThemeProvider` to manage dark/light mode across your application.

## 1. Setup

Wrap your application's root component (or providers wrapper) with the `ThemeProvider`.

```tsx
// app/Providers.tsx or app/layout.tsx
import { ThemeProvider } from "@/shared/src/providers/ThemeProvider";
// OR if using the index export
// import { ThemeProvider } from "@/shared/src/providers";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

The provider automatically:

- Checks `localStorage` for a saved theme ("light" | "dark" | "system").
- Checks system preference if "system" is selected.
- Applies the `dark` class to `document.documentElement` (`<html>` tag).
- Persists changes to `localStorage`.

## 2. Using the Theme Hook

Use the `useTheme` hook to access the current theme state and controls.

```tsx
import { useTheme } from "@/shared/src/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current Setting: {theme}</p>
      <p>Resolved Theme: {resolvedTheme} (Active visual mode)</p>

      <button onClick={() => toggleTheme()}>Toggle Theme</button>

      <div className="flex gap-2 mt-2">
        <button onClick={() => setTheme("light")}>Light</button>
        <button onClick={() => setTheme("dark")}>Dark</button>
        <button onClick={() => setTheme("system")}>System</button>
      </div>
    </div>
  );
}
```

## 3. API Reference

### `theme`

Type: `"light" | "dark" | "system"`
The current user preference. Defaults to `"system"`.

### `resolvedTheme`

Type: `"light" | "dark"`
The actual theme being applied. If `theme` is `"system"`, this will match the OS preference (media query).

### `setTheme(theme: Theme)`

Function to explicitly set the theme.

### `toggleTheme()`

Helper function to switch between "light" and "dark". Note: switching from "system" to toggle will default to the opposite of the current resolved theme.

## 4. Styling

The provider adds a `dark` class to the `<html>` element. You can style your components using Tailwind's `dark:` modifier.

```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  This box adapts to the theme.
</div>
```

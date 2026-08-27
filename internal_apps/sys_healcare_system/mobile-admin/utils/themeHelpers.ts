// Safe theme access helper to prevent runtime errors
export const safeThemeColor = (theme: any, path: string, fallback: string): string => {
  try {
    const keys = path.split('.');
    let current = theme;
    for (const key of keys) {
      current = current?.[key];
    }
    return current?.val || fallback;
  } catch {
    return fallback;
  }
};

// Common fallback colors
export const THEME_COLORS = {
  blue: '#007AFF',
  gray: '#8E8E93',
  lightGray: '#C7C7CC',
  green: '#34C759',
  red: '#FF3B30',
} as const;
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define theme and color options
type ThemeMode = "light" | "dark" | "system";

// Color scheme options with proper mapping for both light and dark modes
interface ColorScheme {
  name: string;
  value: string;
  lightModeText: string;
  darkModeText: string;
  lightModeBg: string;
  darkModeBg: string;
  hsl: string; // HSL value for CSS variables
}

interface ThemeState {
  theme: ThemeMode;
  selectedColorName: string;
  accentColor: string;
  fontFamily: string;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  setColorScheme: (colorName: string) => void;
  setAccentColor: (color: string) => void;
  setFontFamily: (font: string) => void;
  setDefaultTheme: () => void;
  getColorSchemes: () => ColorScheme[];
}

// Comprehensive color schemes with proper contrast values
const COLOR_SCHEMES: ColorScheme[] = [
  {
    name: "Purple",
    value: "#8B5CF6",
    lightModeText: "#5B21B6", // darker purple for better contrast on light backgrounds
    darkModeText: "#C4B5FD", // lighter purple for better contrast on dark backgrounds
    lightModeBg: "#F3F0FF", // very light purple background for light mode
    darkModeBg: "#5B21B6", // darker purple background for dark mode
    hsl: "268 94% 66%",
  },
  {
    name: "Blue",
    value: "#3B82F6",
    lightModeText: "#1E40AF", // darker blue for better contrast on light backgrounds
    darkModeText: "#93C5FD", // lighter blue for better contrast on dark backgrounds
    lightModeBg: "#EFF6FF", // very light blue background for light mode
    darkModeBg: "#1E40AF", // darker blue background for dark mode
    hsl: "217 91% 60%",
  },
  {
    name: "Green",
    value: "#10B981",
    lightModeText: "#047857", // darker green for better contrast on light backgrounds
    darkModeText: "#6EE7B7", // lighter green for better contrast on dark backgrounds
    lightModeBg: "#ECFDF5", // very light green background for light mode
    darkModeBg: "#047857", // darker green background for dark mode
    hsl: "152 60% 39%",
  },
  {
    name: "Orange",
    value: "#F97316",
    lightModeText: "#9A3412", // darker orange for better contrast on light backgrounds
    darkModeText: "#FDBA74", // lighter orange for better contrast on dark backgrounds
    lightModeBg: "#FFF7ED", // very light orange background for light mode
    darkModeBg: "#9A3412", // darker orange background for dark mode
    hsl: "24 95% 53%",
  },
  {
    name: "Pink",
    value: "#EC4899",
    lightModeText: "#BE185D", // darker pink for better contrast on light backgrounds
    darkModeText: "#F9A8D4", // lighter pink for better contrast on dark backgrounds
    lightModeBg: "#FDF2F8", // very light pink background for light mode
    darkModeBg: "#BE185D", // darker pink background for dark mode
    hsl: "330 81% 60%",
  },
];

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system", // Default to system preference
      selectedColorName: "Purple", // Default color scheme name
      accentColor: COLOR_SCHEMES[0].value, // Default accent color value
      fontFamily: "code", // Default to code font

      toggleTheme: () =>
        set((state) => ({
          theme:
            state.theme === "light"
              ? "dark"
              : state.theme === "dark"
              ? "system"
              : "light",
        })),

      setTheme: (theme) => set({ theme }),

      setColorScheme: (colorName) => {
        const scheme =
          COLOR_SCHEMES.find((s) => s.name === colorName) || COLOR_SCHEMES[0];
        set({
          selectedColorName: colorName,
          accentColor: scheme.value,
        });

        // Update CSS variables for the selected color scheme
        document.documentElement.style.setProperty("--scheme-hsl", scheme.hsl);

        // Update text/background colors based on current theme
        const isDark = document.documentElement.classList.contains("dark");

        document.documentElement.style.setProperty(
          "--accent-color-text",
          isDark ? scheme.darkModeText : scheme.lightModeText
        );

        document.documentElement.style.setProperty(
          "--accent-color-bg",
          isDark ? scheme.darkModeBg : scheme.lightModeBg
        );

        // Set a data attribute for additional CSS targeting
        document.documentElement.setAttribute(
          "data-color-scheme",
          colorName.toLowerCase()
        );
      },

      setAccentColor: (colorValue) => {
        // Find the scheme that matches this color value
        const scheme = COLOR_SCHEMES.find((s) => s.value === colorValue);
        if (scheme) {
          get().setColorScheme(scheme.name);
        } else {
          // If no match, just set the raw color
          set({ accentColor: colorValue });
          document.documentElement.style.setProperty(
            "--accent-color",
            colorValue
          );
        }
      },

      setFontFamily: (font) => set({ fontFamily: font }),

      setDefaultTheme: () => set({ theme: "system" }),

      getColorSchemes: () => COLOR_SCHEMES,
    }),
    {
      name: "theme-store",
    }
  )
);

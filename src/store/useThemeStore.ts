import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define theme and color options
type ThemeMode = "light" | "dark" | "system";

// Font family options
type FontOption = "sans" | "serif" | "mono" | "code";

// Color scheme options with proper mapping for both light and dark modes
interface ColorScheme {
  name: string;
  value: string;
  lightModeText: string;
  darkModeText: string;
  lightModeBg: string;
  darkModeBg: string;
  lightModeAccent: string;
  darkModeAccent: string;
  hoverLight: string;
  hoverDark: string;
  hsl: string;
}

interface ThemeState {
  theme: ThemeMode;
  selectedColorName: string;
  accentColor: string;
  fontFamily: FontOption;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  setColorScheme: (colorName: string) => void;
  setAccentColor: (color: string) => void;
  setFontFamily: (font: FontOption) => void;
  setDefaultTheme: () => void;
  getColorSchemes: () => ColorScheme[];
  getFontOptions: () => { name: string; value: FontOption }[];
}

// Comprehensive color schemes with proper contrast values
const COLOR_SCHEMES: ColorScheme[] = [
  {
    name: "Purple",
    value: "#8B5CF6",
    lightModeText: "#5B21B6", // darker purple for better contrast on light backgrounds
    darkModeText: "#C4B5FD", // lighter purple for better contrast on dark backgrounds
    lightModeBg: "#F5F3FF", // very light purple background for light mode
    darkModeBg: "#4C1D95", // darker purple background for dark mode
    lightModeAccent: "#7C3AED", // vibrant purple for light mode accents
    darkModeAccent: "#A78BFA", // lighter purple for dark mode accents
    hoverLight: "#6D28D9", // darker purple for hover on light mode
    hoverDark: "#DDD6FE", // very light purple for hover on dark mode
    hsl: "265 96% 66%",
  },
  {
    name: "Blue",
    value: "#3B82F6",
    lightModeText: "#1E40AF", // darker blue for better contrast on light backgrounds
    darkModeText: "#93C5FD", // lighter blue for better contrast on dark backgrounds
    lightModeBg: "#EFF6FF", // very light blue background for light mode
    darkModeBg: "#1E3A8A", // darker blue background for dark mode
    lightModeAccent: "#2563EB", // vibrant blue for light mode accents
    darkModeAccent: "#60A5FA", // lighter blue for dark mode accents
    hoverLight: "#1D4ED8", // darker blue for hover on light mode
    hoverDark: "#BFDBFE", // very light blue for hover on dark mode
    hsl: "221 83% 60%",
  },
  {
    name: "Green",
    value: "#10B981",
    lightModeText: "#047857", // darker green for better contrast on light backgrounds
    darkModeText: "#6EE7B7", // lighter green for better contrast on dark backgrounds
    lightModeBg: "#ECFDF5", // very light green background for light mode
    darkModeBg: "#065F46", // darker green background for dark mode
    lightModeAccent: "#059669", // vibrant green for light mode accents
    darkModeAccent: "#34D399", // lighter green for dark mode accents
    hoverLight: "#047857", // darker green for hover on light mode
    hoverDark: "#A7F3D0", // very light green for hover on dark mode
    hsl: "152 69% 40%",
  },
  {
    name: "Orange",
    value: "#F59E0B",
    lightModeText: "#B45309", // darker orange for better contrast on light backgrounds
    darkModeText: "#FBBF24", // lighter orange for better contrast on dark backgrounds
    lightModeBg: "#FFFBEB", // very light orange background for light mode
    darkModeBg: "#92400E", // darker orange background for dark mode
    lightModeAccent: "#D97706", // vibrant orange for light mode accents
    darkModeAccent: "#F59E0B", // lighter orange for dark mode accents
    hoverLight: "#B45309", // darker orange for hover on light mode
    hoverDark: "#FDE68A", // very light orange for hover on dark mode
    hsl: "38 97% 50%",
  },
  {
    name: "Red",
    value: "#EF4444",
    lightModeText: "#B91C1C", // darker red for better contrast on light backgrounds
    darkModeText: "#FCA5A5", // lighter red for better contrast on dark backgrounds
    lightModeBg: "#FEF2F2", // very light red background for light mode
    darkModeBg: "#991B1B", // darker red background for dark mode
    lightModeAccent: "#DC2626", // vibrant red for light mode accents
    darkModeAccent: "#F87171", // lighter red for dark mode accents
    hoverLight: "#B91C1C", // darker red for hover on light mode
    hoverDark: "#FECACA", // very light red for hover on dark mode
    hsl: "0 84% 60%",
  },
  {
    name: "Pink",
    value: "#EC4899",
    lightModeText: "#BE185D", // darker pink for better contrast on light backgrounds
    darkModeText: "#F9A8D4", // lighter pink for better contrast on dark backgrounds
    lightModeBg: "#FDF2F8", // very light pink background for light mode
    darkModeBg: "#9D174D", // darker pink background for dark mode
    lightModeAccent: "#DB2777", // vibrant pink for light mode accents
    darkModeAccent: "#F472B6", // lighter pink for dark mode accents
    hoverLight: "#BE185D", // darker pink for hover on light mode
    hoverDark: "#FBCFE8", // very light pink for hover on dark mode
    hsl: "330 81% 60%",
  },
  {
    name: "Teal",
    value: "#14B8A6",
    lightModeText: "#0F766E", // darker teal for better contrast on light backgrounds
    darkModeText: "#5EEAD4", // lighter teal for better contrast on dark backgrounds
    lightModeBg: "#F0FDFA", // very light teal background for light mode
    darkModeBg: "#115E59", // darker teal background for dark mode
    lightModeAccent: "#0D9488", // vibrant teal for light mode accents
    darkModeAccent: "#2DD4BF", // lighter teal for dark mode accents
    hoverLight: "#0F766E", // darker teal for hover on light mode
    hoverDark: "#99F6E4", // very light teal for hover on dark mode
    hsl: "173 80% 40%",
  },
];

// Font options
const FONT_OPTIONS = [
  { name: "Sans Serif", value: "sans" as FontOption },
  { name: "Serif", value: "serif" as FontOption },
  { name: "Monospace", value: "mono" as FontOption },
  { name: "Code", value: "code" as FontOption },
];

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "dark", // Default to system preference
      selectedColorName: "Purple", // Default color scheme name
      accentColor: COLOR_SCHEMES[0].value, // Default accent color value
      fontFamily: "sans", // Default font

      toggleTheme: () =>
        set((state) => ({
          theme:
            state.theme === "light"
              ? "dark"
              : state.theme === "dark"
              ? "system"
              : "light",
        })),

      setTheme: (theme) => {
        set({ theme });
        // Apply the current color scheme to ensure all variables are updated
        const colorName = get().selectedColorName;
        get().setColorScheme(colorName);
      },

      setColorScheme: (colorName) => {
        const scheme =
          COLOR_SCHEMES.find((s) => s.name === colorName) || COLOR_SCHEMES[0];
        set({
          selectedColorName: colorName,
          accentColor: scheme.value,
        });

        // Update CSS variables for the selected color scheme
        document.documentElement.style.setProperty("--scheme-hsl", scheme.hsl);
        document.documentElement.style.setProperty(
          "--accent-color",
          scheme.value
        );

        // Update text/background colors based on current theme
        const isDark = document.documentElement.classList.contains("dark");

        // Set text color for accent elements
        document.documentElement.style.setProperty(
          "--accent-color-text",
          isDark ? scheme.darkModeText : scheme.lightModeText
        );

        // Set background color for accent elements
        document.documentElement.style.setProperty(
          "--accent-color-bg",
          isDark ? scheme.darkModeBg : scheme.lightModeBg
        );

        // Set accent colors
        document.documentElement.style.setProperty(
          "--accent-color-bright",
          isDark ? scheme.darkModeAccent : scheme.lightModeAccent
        );

        // Set hover colors
        document.documentElement.style.setProperty(
          "--accent-hover",
          isDark ? scheme.hoverDark : scheme.hoverLight
        );

        // Set a data attribute for additional CSS targeting
        document.documentElement.setAttribute(
          "data-color-scheme",
          colorName.toLowerCase()
        );

        // Set a data attribute for font family
        document.documentElement.setAttribute(
          "data-font-family",
          get().fontFamily
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

      setFontFamily: (font) => {
        set({ fontFamily: font });
        document.documentElement.setAttribute("data-font-family", font);
      },

      setDefaultTheme: () => {
        set({
          theme: "system",
          selectedColorName: "Purple",
          accentColor: COLOR_SCHEMES[0].value,
          fontFamily: "sans",
        });
        get().setColorScheme("Purple");
      },

      getColorSchemes: () => COLOR_SCHEMES,
      getFontOptions: () => FONT_OPTIONS,
    }),
    {
      name: "theme-store",
    }
  )
);

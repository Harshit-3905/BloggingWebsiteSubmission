/**
 * Tailwind CSS utility classes for consistent styling across the application
 */

// Container class to replace container-custom
export const containerClass = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

// Gradient background classes to replace binary-gradient
export const gradientBgClass =
  "bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color-bright)]";

// Gradient text classes to replace gradient-text
export const gradientTextClass =
  "bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-color)] via-[var(--accent-color-bright)] to-[var(--accent-color)]";

// Glass morphism effect for cards and containers
export const glassMorphismClass =
  "backdrop-blur-md border rounded-xl shadow-lg dark:bg-black/20 dark:border-white/10 bg-white/60 border-black/5";

// Card hover effect classes
export const cardHoverClass =
  "transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] hover:border-[var(--accent-color)]/30";

// Button with accent color
export const accentButtonClass =
  "bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/90 text-white font-medium";

// Outline button with accent color
export const outlineButtonClass =
  "border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)]/60 hover:bg-[var(--accent-color)]/10";

// Input focus styles
export const inputFocusClass =
  "focus:ring-2 focus:ring-[var(--accent-color)]/30 focus:border-[var(--accent-color)]";

// Font family classes
export const fontFamilyClasses = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
  code: "font-mono tracking-tight",
};

// Section classes with proper spacing
export const sectionClass = "py-12 md:py-16 lg:py-24";

// Combine multiple classes conditionally
export const cx = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

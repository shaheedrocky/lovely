/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        // Primary
        primary: {
          50: "#FFF1F5",
          100: "#FFE4EC",
          200: "#FFC9D9",
          300: "#FF9FBA",
          400: "#FF6F95",
          500: "#FF477E",
          600: "#F52F68",
          700: "#D91F54",
          800: "#B51D48",
          900: "#961D41",
        },

        // Secondary / Purple
        secondary: {
          50: "#F7F3FF",
          100: "#EEE6FF",
          200: "#DDCEFF",
          300: "#C3A8FF",
          400: "#A77BFF",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },

        // Accent
        accent: {
          pink: "#FF477E",
          purple: "#8B5CF6",
          rose: "#FB7185",
          peach: "#FDBA74",
        },

        // Background
        background: {
          light: "#FFFFFF",
          soft: "#FFF7F9",
          muted: "#F9FAFB",
          dark: "#111827",
        },

        // Text
        text: {
          primary: "#1F2937",
          secondary: "#6B7280",
          muted: "#9CA3AF",
          light: "#FFFFFF",
        },

        // Status
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        online: "#22C55E",
      },
      fontFamily: {
        tangerine: ["Tangerine-Regular", "cursive"],
        "tangerine-bold": ["Tangerine-Bold", "cursive"],
      },
    },
  },

  plugins: [],
};
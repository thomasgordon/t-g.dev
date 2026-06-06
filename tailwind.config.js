/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "white": "#F7F6F2",
      "surface": "#FFFFFF",
      "off-white": "#F8F8F8",
      "light-gray": "#F2F2F2",
      "medium-gray": "#666666",
      "dark-gray": "#3D3D3D",
      "almost-black": "#20201D",
      "black": "#000000",
      "hairline": "#E7E5DD",
      "hairline-2": "#D9D7CD",
      
      // Design system colors
      "background-primary": "#F7F6F2",
      "background-secondary": "#20201D",
      "background-accent": "#F2F2F2",
      
      "text-light": "#F8F8F8",
      "text-dark": "#20201D",
      "text-muted": "#666666",
      
      "accent-primary": "#FFC2C6",
      "accent-secondary": "#3EF47B",
      "accent-tertiary": "#F3535E",
    },
    screens: {
      xs: "320px", // Extra small devices (phones)
      sm: "375px", // Small devices (larger phones)
      md: "768px", // Medium devices (tablets)
      lg: "1025px", // Large devices (laptops)
      xl: "1441px", // Extra large devices (desktops)
      "2xl": "1921px", // Large desktops or monitors
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
      "10xl": "16rem",
    },
    //fontFamily: {
    //  sans: ['Aileron', 'sans-serif'],
    //  monospace: ['JetBrainsMono', 'monospace-serif']
    //},
    extend: {
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        }
      },
      animation: {
        blink: "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite",
        breathe: "breathe 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',

  daisyui: {
    themes: [
      {
        light: {
          "primary": "#009dff",
          "secondary": "#9dff00",
          "accent": "#ff009d",
          "neutral": "#f0f0f0",
          "base-100": "#ffffff",
          "info": "#0000ff",
          "success": "#00ff00",
          "warning": "#00ff00",
          "error": "#ff0000",
        },
      },
    ],
  },

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        title: ["Montserrat", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'amd': '800px',
      },
    },
  },

  plugins: [
    require('daisyui'),
  ],
};

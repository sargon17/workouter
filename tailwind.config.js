/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },

      animation: {
        "timer-danger": "timer-danger 1s linear infinite",
        "timer-danger-fast": "timer-danger 0.5s linear infinite",
      },
      keyframes: {
        "timer-danger": {
          "0%, 100%": {
            backgroundColor: "rgb(244 63 94 / 0.1)", // red
            borderColor: "rgb(251 113 133 / 0.5)", // red
            color: "rgb(251 113 133 / var(--tw-text-opacity))", // red
          },
          "50%": {
            backgroundColor: "rgb(132 204 22 / 0.1)", // green
            borderColor: "rgb(190 242 100 / 0.5)", // green
            color: "rgb(190 242 100 / var(--tw-text-opacity))", // green
          },
        },
      },
    },
  },
  plugins: [],
};

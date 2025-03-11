/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

const tailwindConfig = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}", // Adjust content path to cover all folders
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#f4aa3a",
          secondary: "#f4f4a1",
          accent: "#1be885",
          neutral: "#272136",
          "base-100": "#ffffff",
          info: "#778ad4",
          success: "#23b893",
          warning: "#f79926",
          error: "#ea535a",
        },
      },
    ],
  },
};

export default tailwindConfig;

/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Declare plugins only once here
  daisyui: {
    themes: ["dark"], // This is the correct location for DaisyUI options
  },
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    daisyui: {
      themes: ["light", "dark", "bumblebee"],
    },
    extend: {
      colors: {
        n900: "#312E32",
        n800: "#3F3B40",
        n700: "#585159",
        n600: "#726B73",
        n500: "#928C93",
        n400: "ADA8AE",
        n300: "#C1BFC1",
        n200: "#DDD9DD",
        n100: "#F6F1F6",
        orange900: "#FFAA5A",
        orange500: "#FEC793",
        orange300: "#FFDDBD",
        red900: "#FF6262",
        red500: "#FF8D8D",
        red300: "#FFACAC",
        purple900: "#543763",
        purple500: "#806190",
        purple300: "#A788B7",
        green900: "#4CBF86",
        green500: "#75D7A6",
        green300: "#9DEAC3",
        blue900: "#3E80E3",
        blue500: "#90C0F9",
        blue300: "#C8E1FF",
      },
      boxShadow: {
      },
      backgroundImage: {
        purple9grad: "linear-gradient(0deg, rgba(84,55,99,1) 0%, rgba(110,78,125,1) 3%, rgba(84,55,99,1) 50%, rgba(84,55,99,1) 75%, rgba(110,78,125,1) 95%, rgba(84,55,99,1) 100%)",

      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;

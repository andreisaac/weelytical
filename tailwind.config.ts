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
      dropShadow: {
        'text': '1px 1px 2px rgba(0, 0, 0, 0.75)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
      boxShadow: {
        square: "0px 0px 10px 0px #928C93",
        squareXl: "0px 0px 20px 0px #928C93"
      },
      backgroundImage: {
        purpleBlack: "linear-gradient(90deg, rgba(167,136,183,1) 0%, rgba(84,55,99,1) 50%, rgba(63,59,64,1)  100%)",
        blueGreen: "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
        pinkPurple: "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
        greenYellow: "linear-gradient(159deg, rgba(44,101,57,1) 0%, rgba(130,185,36,1) 50%, rgba(239,255,144,1) 100%)",
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;

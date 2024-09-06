import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    screens: {
      'xxs': '375px',
      'xs': '420px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        app: {
          blue: {
            700: "#2b3a4d",
            800: "#1e2a39",
            900: "#002b49",
          },
          gray: {
            300: "#fafafa",
            900: "#868686"
          },
        },
      },
      fontFamily: {
        'nunito': ['"Nunito Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

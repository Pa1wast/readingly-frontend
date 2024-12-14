import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#FFF6E6',
          '100': '#FFE2B0',
          '200': '#FFD48A',
          '300': '#FFC054',
          '400': '#FFB433',
          '500': '#FFA100',
          '600': '#E89300',
          '700': '#B57200',
          '800': '#8C5900',
          '900': '#6B4400',
        },
        secondary: {
          '50': '#FFFAEF',
          '100': '#FFF0CC',
          '200': '#FFE8B4',
          '300': '#FFDE92',
          '400': '#FFD87D',
          '500': '#FFCE5C',
          '600': '#E8BB54',
          '700': '#B59241',
          '800': '#8C7133',
          '900': '#6B5727',
        },
        accent: {
          '50': '#FAFCFC',
          '100': '#F0F5F6',
          '200': '#E9F0F2',
          '300': '#DFE9EC',
          '400': '#D9E5E8',
          '500': '#CFDEE2',
          '600': '#BCCACE',
          '700': '#939EA0',
          '800': '#727A7C',
          '900': '#575D5F',
        },
        green: {
          '50': '#FAFCEE',
          '100': '#EEF6CC',
          '200': '#E6F2B3',
          '300': '#DBEC90',
          '400': '#D4E87A',
          '500': '#C9E259',
          '600': '#B7CE51',
          '700': '#8FA03F',
          '800': '#6F7C31',
          '900': '#545F25',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

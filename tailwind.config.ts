import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // scoped to primary buttons specifically — not the site's general brand accent
        'button-primary': {
          DEFAULT: '#1a1a1a',
          active: '#333333',
        },
      },
    },
  },
  plugins: [],
};

export default config;

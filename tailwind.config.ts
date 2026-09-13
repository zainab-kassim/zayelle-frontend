import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        // scoped to primary buttons specifically — not the site's general brand accent
        'button-primary': {
          DEFAULT: '#1a1a1a',
          active: '#0d0d0d',
        },
        ink: '#171310',
        muted: '#726B60',
        surface: '#F6F4F1',
        line: '#E7E3DC',
        paper: '#FCFBF9',
      },
    },
  },
  plugins: [],
};

export default config;

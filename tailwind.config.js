// @ts-check
const emojiFallbacks = ['Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', 'Arial']
const sansSerifFallbacks = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Noto Sans',
  'ui-sans-serif',
  'sans-serif',
]

// /** @type {Parameters<import('tailwindcss')>[0]} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './content/**/*.{md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      scale: {
        175: '175%',
      },
      rotate: {
        720: '720deg',
      },
      zIndex: {
        10: '10',
        20: '20',
        30: '30',
        '45-global-topbar': '45',
        40: '40',
        '50-global-nav': '50',
        50: '50',
        51: '51',
        60: '60',
      },
      fontSize: {
        /* FROM MEDIUM SIZE SCREENS */
        'h1-desktop': [
          // should be `font-black` (800)
          '3rem', // 48px
          { letterSpacing: '-0.08rem', lineHeight: '3.15rem' },
        ],
        'h2-desktop': [
          // should be `font-bold` (700)
          '1.65rem', // 30px
          { letterSpacing: '-0.05rem' },
        ],
        hero: ['66px', { lineHeight: '80px' }],
        'h3-desktop': [
          // should be `font-bold` (700)
          '1.5rem', // 24px
          { letterSpacing: '-0.03rem', lineHeight: '2rem' },
        ],
        'body-desktop': [
          // should be `font-bold` (500)
          '1rem', // 16px
          { letterSpacing: '-0rem', lineHeight: '1.55rem' },
        ],
        'h1-mobile': [
          // should be `font-black` (800)
          '3rem', // 48px
          { letterSpacing: '-0.08rem', lineHeight: '3.15rem' },
        ],
        'h2-mobile': [
          // should be `font-bold` (700)
          '1.875rem', // 30px
          { letterSpacing: '-0.05rem' },
        ],
        'h3-mobile': [
          // should be `font-bold` (700)
          '1.5rem', // 24px
          { letterSpacing: '-0.04rem', lineHeight: '1.7rem' },
        ],
        'body-mobile': [
          // should be `font-bold` (500)
          '1rem',
          { letterSpacing: '-0rem', lineHeight: '1.55rem' },
        ],
      },
      fontFamily: {
        handwritten: ['Virgil', ...sansSerifFallbacks, ...emojiFallbacks],
        // display: ['Manrope', ...sansSerifFallbacks, ...emojiFallbacks],
        // display: ['Forum', ...sansSerifFallbacks, ...emojiFallbacks],
        display: ['Inter', ...sansSerifFallbacks, ...emojiFallbacks],
        sans: ['Inter', ...sansSerifFallbacks, ...emojiFallbacks],
        serif: ['BaskervilleDisplayPT', 'ui-serif', 'serif', ...emojiFallbacks],
        mono: ['Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', 'monospace', ...emojiFallbacks],
        displayMono: ['Inconsolata', 'Inter', ...sansSerifFallbacks, ...emojiFallbacks],
      },
      aspectRatio: {
        anamorphic: '2.35 / 1',
      },
      colors: {
        headings: {
          dark: 'white',
          light: '#25282B', // text-gray-800
        },
        gray: {
          300: '#B4B5B6',
          400: '#838486',
          600: '#515355',
          800: '#25282B',
          850: '#1F2124',
          900: 'rgb(20 24 28)',
          950: '#070A0D',
        },
        teal: {
          200: '#81D0CB',
          500: '#2C7D78',
        },
        yellow: {
          300: '#F2CA5C',
        },
        glow: {
          100: 'rgb(63, 205, 238)',
          500: '#14414c',
          700: '#1e798e',
        },
      },
      screens: {
        '1.5xl': '1440px',
      },
      // @ts-ignore added by Tailwind extension, and it's TypeScript interface wasn't augmented
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {},
        },
        gray: {
          css: {
            '--tw-content': '" "',
            // '--tw-prose-body': theme('colors.white'),
            '--tw-prose-headings': theme('colors.white'),
            // '--tw-prose-lead': theme('colors.pink[700]'),
            '--tw-prose-links': theme('colors.teal[200]'),
            // '--tw-prose-bold': theme('colors.pink[900]'),
            // '--tw-prose-counters': theme('colors.pink[600]'),
            // '--tw-prose-bullets': theme('colors.pink[400]'),
            // '--tw-prose-hr': theme('colors.pink[300]'),
            // '--tw-prose-quotes': theme('colors.pink[900]'),
            // '--tw-prose-quote-borders': theme('colors.pink[300]'),
            // '--tw-prose-captions': theme('colors.pink[700]'),
            // '--tw-prose-code': theme('colors.pink[900]'),
            // '--tw-prose-pre-code': theme('colors.pink[100]'),
            // '--tw-prose-pre-bg': theme('colors.pink[900]'),
            // '--tw-prose-th-borders': theme('colors.pink[300]'),
            // '--tw-prose-td-borders': theme('colors.pink[200]'),
            // '--tw-prose-invert-body': theme('colors.pink[200]'),
            // '--tw-prose-invert-headings': theme('colors.teal[500]'),
            // '--tw-prose-invert-lead': theme('colors.pink[300]'),
            '--tw-prose-invert-links': theme('colors.teal[200]'),
            // '--tw-prose-invert-bold': theme('colors.white'),
            // '--tw-prose-invert-counters': theme('colors.pink[400]'),
            // '--tw-prose-invert-bullets': theme('colors.pink[600]'),
            // '--tw-prose-invert-hr': theme('colors.pink[700]'),
            // '--tw-prose-invert-quotes': theme('colors.pink[100]'),
            // '--tw-prose-invert-quote-borders': theme('colors.pink[700]'),
            // '--tw-prose-invert-captions': theme('colors.pink[400]'),
            // '--tw-prose-invert-code': theme('colors.white'),
            // '--tw-prose-invert-pre-code': theme('colors.pink[300]'),
            // '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            // '--tw-prose-invert-th-borders': theme('colors.pink[600]'),
            // '--tw-prose-invert-td-borders': theme('colors.pink[700]'),
          },
        },
      }),
    },
  },
  plugins: [require('tailwindcss-radix')(), require('@tailwindcss/typography')],
}

module.exports = {
  content: ['./example/**/*.html', './example/**/*.vue', './example/**/*.tsx'],
  darkMode: 'media',
  mode: 'jit',
  important: true, // important in prod is must be

  theme: {
    extend: {
      screens: {
        'light-mode': { raw: '(prefers-color-scheme: light)' },
        'dark-mode': { raw: '(prefers-color-scheme: dark)' },
        phone: { raw: '(max-width: 768px)' },
        desktop: { raw: '(min-width: 1024px)' },
        tablet: { raw: '(max-width: 1023px)' },
      },

      colors: {
        primary: {
          default: '#F4A8D7',
        },
        bg: {
          black: '#292625',
        },
        gray$: {
          dark: '#7E7E7E',
          light: '#989898',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
}

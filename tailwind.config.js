const colors = require('tailwindcss/colors')

module.exports = {
  important: true,
  purge: ['./components/**/*.{vue,js}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}'],
  darkMode: false,
  theme: {
    extend: {
      screens: {
        'xs': {'min': '320px', 'max': '639px'},
      },

      width: {
        '1/10': '10%',
      },

      margin: {
        '1/10': '10%'
      },

      borderRadius: {
        '5xl': '2rem',
        '12pc': '12%',
        '16pc': '16%',
      },

      transitionDuration: {
        '2500': '2500ms',
        '4000': '4000ms',
      },

      spacing: {
        '0.75': '0.1875rem',
      },

      fontSize: {
        '4-5xl': '2.5rem',
        '5-5xl': '3.5rem',
        '6-5xl': '4.5rem',
        '7-5xl': '5.5rem',
        'tiny': '0.6rem',
        'teeny': '0.5rem',
        'atomic': '0.4rem'
      },

      lineHeight: {
        '11': '2.75rem',
        '12': '3rem',
        '13': '3.25rem',
        '14': '3.5rem',
        '15': '3.75rem',
        '16': '4rem',
        '17': '4.25rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '20': '5rem',
        '21': '5.25rem',
        '22': '5.5rem',
        '23': '5.75rem',
        '24': '6rem'
      }
    },
  },
  plugins: [],
}

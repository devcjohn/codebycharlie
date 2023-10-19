module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      header: ['Raleway', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },

    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      animation: {
        spinPulsate: 'spinPulsate 4s linear infinite',
      },
      keyframes: {
        spinPulsate: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(-90deg) scale(0.85)' },
          '50%': { transform: 'rotate(-180deg) scale(1)' },
          '75%': { transform: 'rotate(-270deg) scale(0.85)' },
          '100%': { transform: 'rotate(-360deg) scale(1)' },
        },
      },
      backgroundImage: {
        laptop: "url('/img/laptop.webp')",
      },
      colors: {
        primary: '#264653',
        // secondary: '#2a9d8f',
        // tertiary: '#e9c46a',
        // quaternary: '#f4a261',
        // quinary: '#e76f51',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

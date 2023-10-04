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

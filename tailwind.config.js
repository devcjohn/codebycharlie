module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        laptop: "url('src/assets/img/laptop.webp')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

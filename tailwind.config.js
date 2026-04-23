module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'amber-flame': '#FBAF00',
        gold: '#FFD639',
        'cotton-candy': '#FFA3AF',
        'teal-blue': '#007CBE',
        jungle: '#00AF54',
        dark: '#0F0F0F',
        surface: '#161616',
        card: '#1E1E1E',
        muted: '#6B7280',
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        synthor: "#131929",

        keyframes: {
          neon: {
            '0%, 100%': { opacity: 1, boxShadow: '0 0 20px 5px rgba(0,255,255,0.6)' },
            '50%': { opacity: 0.7, boxShadow: '0 0 25px 8px rgba(0,255,255,1)' },
          },
        },
        animation: {
          neon: 'neon 1s infinite alternate',
        },
      },
    },
  },
  plugins: [],
};

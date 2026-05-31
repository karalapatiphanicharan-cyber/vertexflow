/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: '#FEF08A', // Vibrant Pastel Yellow
          blue: '#3B82F6',   // Electric Blue
        },
        brutal: {
          black: '#000000',
          white: '#FFFFFF',
        }
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
      },
      borderRadius: {
        'brutal': '0px',
      }
    },
  },
  plugins: [],
}

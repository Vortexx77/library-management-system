/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Enhanced color palette for light/dark mode
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#00B16A', // Light mode sidebar
          600: '#009955', // Active state in dark mode
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        gray: {
          700: '#1F2937', // Dark mode sidebar
          800: '#111827', // Dark mode main content
          900: '#0F172A', // Dark mode background
        },
        // School Library Color Palette (keeping for compatibility)
        navy: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#8191ff',
          500: '#5d6aff',
          600: '#4c51f5',
          700: '#3d3ee0',
          800: '#1E3A8A', // Primary Navy Blue
          900: '#1e2a5e',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e6e3',
          200: '#c7cdc8',
          300: '#A7B6A9', // Primary Sage Green
          400: '#8a9b8c',
          500: '#6f8071',
          600: '#5a675c',
          700: '#4a544b',
          800: '#3d453e',
          900: '#343a35',
        },
        soft: {
          white: '#F5F5F5', // Primary Soft White
          gray: '#FAFAFA',
          light: '#FCFCFC',
        },
        // Keep existing primary colors for compatibility
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          500: '#1E3A8A',
          600: '#1d3a87',
          700: '#1a3478',
          800: '#1E3A8A',
          900: '#1e2a5e',
        }
      },
      spacing: {
        '4': '1rem',
      }
    },
  },
  plugins: [],
}
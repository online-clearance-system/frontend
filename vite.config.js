import { defineConfig } from 'vite'
// https://vite.dev/config/
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
  },
  theme: {
    extend: {
      fontFamily: {
          "lato": ['Lato', 'sans-serif']
      }
  },
  }
})
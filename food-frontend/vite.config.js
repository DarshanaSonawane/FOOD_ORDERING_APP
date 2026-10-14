import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // any request starting with /api is passed on to Spring Boot
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
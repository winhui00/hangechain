import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5174,
    strictPort: true,
    proxy: {
      '/api': 'http://127.0.0.1:3088',
      '/uploads': 'http://127.0.0.1:3088',
      '/admin': 'http://127.0.0.1:3089',
    },
  },
})


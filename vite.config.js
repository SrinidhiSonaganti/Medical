import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v1beta': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/v1beta/, '/v1beta')
      }
    }
  },
  // Add headers to handle CORS
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  }
})
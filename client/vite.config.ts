import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Proxy for API requests
        secure: false,
        changeOrigin: true,
      },
      '/graphql': {
        target: 'http://localhost:3001/graphql', // Proxy for GraphQL requests
        secure: false,
        changeOrigin: true,
      },
    },
  },
})

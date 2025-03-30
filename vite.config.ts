import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // base: 'crud-table',
  plugins: [react()],
  resolve: {
    alias: {
      src: "./src",
      '@': path.resolve(__dirname, './src'),
    },
  },
})

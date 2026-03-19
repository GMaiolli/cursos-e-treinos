import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Define uma porta fixa para facilitar seu teste
    open: true  // Abre o navegador automaticamente ao dar 'npm run dev'
  },
  resolve: {
    alias: {
      // Isso ajuda se você quiser usar caminhos absolutos como '@/components/...'
      '@': '/src',
    },
  },
})
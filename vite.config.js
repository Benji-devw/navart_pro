import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  assetsInclude: ['**/*.avi', '**/*.glb', '**/*.gltf', '**/*.bin', '**/*.mkv'],
  // Servir le dossier src/assets directement
  server: { 
    fs: {
      // Permettre de servir des fichiers depuis le dossier src
      allow: ['..'],
    },
  },
  build: {
    // Copier les assets dans le build
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      external: ['react-google-recaptcha'],
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wasm(),
    topLevelAwait()
  ],
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor': ['react', 'react-dom']
        }
      },
      external: ['opencascade.js']
    },
    // Enable source maps for debugging
    sourcemap: true,
    // Optimize assets
    assetsInlineLimit: 4096,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Ensure WASM files are handled correctly
    target: 'esnext'
  },
  // Configure environment variables
  envPrefix: 'VITE_',
  // Optimize dev server
  server: {
    hmr: true,
    port: 3000
  },
  // Handle WASM imports
  optimizeDeps: {
    exclude: ['opencascade.js'],
    esbuildOptions: {
      supported: {
        'top-level-await': true
      }
    }
  }
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteGltfPlugin from 'vite-plugin-gltf';

export default defineConfig({
  plugins: [
    react(),
    ViteGltfPlugin({
      include: [/\.glb$/],
    }),
  ],
  base: "/uniBewerbung/",
  build: {
    cssCodeSplit: true,
    brotliSize: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Alle Abhängigkeiten in 'vendor' Chunk packen
            return 'vendor';
          }
          // Weitere Bedingung zum Trennen von größeren Bibliotheken
          if (id.includes('three')) {
            return 'three'; // Separater Chunk für Three.js
          }
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'three'],
  },
});

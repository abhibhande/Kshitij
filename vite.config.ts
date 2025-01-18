import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
        }
      ],
    }),
  ],
  build: {
    chunkSizeWarningLimit:1500,
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  resolve: {
    alias: {
<<<<<<< HEAD
      '@': path.resolve(__dirname, './src'), // Map "@" to "src"
    },
=======
      '@': path.resolve(__dirname, './src'),},
>>>>>>> 2c3837984a941366cf7701c6510c227ac2328fd5
  },
});
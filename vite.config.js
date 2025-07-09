import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
// vite.config.js
export default defineConfig({
  base: './', // ← 相対パスに変更！
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Workout Timer',
        short_name: 'Workout',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        display: 'standalone',
        theme_color: '#4f46e5',
        background_color: '#ffffff',
      },
    }),
  ],
});

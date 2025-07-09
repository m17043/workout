// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: './', // ← Netlifyなどにdistごと上げるときは相対パスで！

  plugins: [
    react(),

    /** PWA + Workbox 設定 */
    VitePWA({
      registerType: 'autoUpdate',

      /** PWA マニフェスト定義 */
      manifest: {
        name: 'Workout Timer',
        short_name: 'Workout',
        description: 'Plank / Squat / Push-up timer & tracker',
        start_url: './',            // ← baseと同様に './' に変更
        display: 'standalone',
        theme_color: '#4f46e5',
        background_color: '#ffffff',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },

      /** Workbox 設定 */
      workbox: {
        runtimeCaching: [
          // Google AdSense をキャッシュさせない
          {
            urlPattern: /^https:\/\/pagead2\.googlesyndication\.com\//,
            handler: 'NetworkOnly',
            options: {
              cacheName: 'google-ads'
            }
          },
          // HTMLは Network First
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache'
            }
          },
          // JS / CSS / Worker は Cache First（30日）
          {
            urlPattern: ({ request }) =>
              ['script', 'style', 'worker'].includes(request.destination),
            handler: 'CacheFirst',
            options: {
              cacheName: 'asset-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30日
              }
            }
          }
        ]
      }
    })
  ],

  /** ビルド出力フォルダと SourceMap 設定（省略可） */
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});

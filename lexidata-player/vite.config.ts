import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['fonts/*.woff2', 'lexidata-icon.svg'],
      manifest: {
        name: 'Lexidata Player',
        short_name: 'Lexidata',
        description: 'Boîtier de réponses Lexidata utilisable hors ligne',
        theme_color: '#f2c900',
        background_color: '#f6f1df',
        display: 'standalone',
        orientation: 'any',
        start_url: './',
        icons: [
          {
            src: 'lexidata-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{html,js,css,svg,woff2}'],
        cleanupOutdatedCaches: true,
      },
      devOptions: { enabled: true },
    }),
  ],
})
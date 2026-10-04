import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const PORT = env.PORT || 3002
  const APP_VERSION = env.VITE_APP_VERSION || env.APP_VERSION || '1.0.0'

  return {
    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(APP_VERSION)
    },
    plugins: [
      react(),
      tsconfigPaths()
    ],
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: undefined,
          entryFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]'
        }
      }
    },
    server: {
      port: Number(PORT),
      host: 'localhost',
    },
  }
})

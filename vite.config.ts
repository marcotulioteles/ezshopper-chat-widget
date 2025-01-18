import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [react(), tsConfigPaths(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: './src/main.tsx',
      name: 'Ezshopper Chat',
      fileName: (format) => {
        return format === 'es' ? 'ezshopper-chat.es.js' : 'ezshopper-chat.umd.js'
      },
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  define: {
    'process.env': {}
  }
})

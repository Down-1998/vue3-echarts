import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '*': path.resolve('')
    }
  },
  base:'./',
  server:{
    port:3001,
    proxy:{
      '/api':{
        target:'http://119.45.221.185:5000',
        changeOrigin:true,
        // rewrite:(path) => path.replace(/^\/api/,'')
      }
    }
  },
})

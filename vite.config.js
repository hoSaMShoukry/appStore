import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		vue(),
		vuetify({ autoImport: true }),
	],
  resolve:{
    alias:{
      '@':path.resolve(__dirname, './src')
    }
  }
})

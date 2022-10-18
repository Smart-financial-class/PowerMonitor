import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// mock服务
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        viteMockServe({
            mockPath: "mock",
            supportTs: false
        })
    ],

})
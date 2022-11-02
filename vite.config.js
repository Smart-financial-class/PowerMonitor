import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// tsx插件
import vueJsx from '@vitejs/plugin-vue-jsx'

// mock服务
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),vueJsx(),
        viteMockServe({
            mockPath: "./mock/",
            supportTs: false,
            localEnabled: true
        })
    ],

})
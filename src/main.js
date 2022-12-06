import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入vue-router
import router from './router/index.js'
import axios from 'axios'

const app = createApp(App)
// 全局引入axios
app.config.globalProperties.axios = axios

app.use(ElementPlus)
app.use(router)
app.mount('#app')

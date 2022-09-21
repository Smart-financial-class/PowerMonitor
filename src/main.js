import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入vue-router
import router from './router/index.js'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')

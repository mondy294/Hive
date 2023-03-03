import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/font/iconfont.css'
import 'reset-css'
import './assets/global.css'

import ElementPlus from 'element-plus'
import 'animate.css'

const app = createApp(App)

app.use(router).use(ElementPlus)
app.mount('#app')

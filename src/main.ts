import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/font/iconfont.css'
import 'reset-css'
import './assets/global.css'

import ElementPlus from 'element-plus'
import 'animate.css'

import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';

const app = createApp(App)

app.use(router).use(ElementPlus)
app.mount('#app')

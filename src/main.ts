import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import * as echarts from 'echarts';
import './assets/css/global.scss';
//字体图标库
import './assets/font/iconfont.css'
import './assets/font/iconfont'

import {setToken} from '@/api/request'
// 判断是否需要更新token
if(sessionStorage.getItem('token')){
  setToken(sessionStorage.getItem('token'))
}

let app = createApp(App)
app.config.globalProperties.$charts = echarts;
app.use(router).mount('#app')

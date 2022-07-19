import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './icons'; // icon
import "./permission"

import 'normalize.css/normalize.css'; // css resets 初始化css样式
import '@/styles/index.scss';
import { SvgIcon } from '@/components/svgIcon/index'
import {
  setupAntd,
} from '@/plugins/antd';

// app.config.productionTip = false;
const app = createApp(App);
setupAntd(app)
app.component('svg-icon', SvgIcon).use(store).use(router).mount('#app');

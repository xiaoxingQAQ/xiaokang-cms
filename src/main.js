import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 引入element-ui
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
// 引入ant-design
import './plugins/ant-design.js'
import 'ant-design-vue/dist/antd.css'
// 引入normalize
import './assets/css/normalize.css'
// 公共css文件
import './assets/css/common.css'
// 字体图标
import './assets/css/iconfont.css'
// 引入 ECharts
import echarts from '@/plugins/echarts'
// 引入lodash
import _ from 'lodash'
Vue.prototype._ = _


Vue.prototype.$echarts = echarts

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

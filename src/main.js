import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

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
// 时间总线
Vue.prototype.$bus = new Vue()
// 全局的点击事件
Vue.prototype.globalClick = function (callback) {
  document.getElementById('app').onclick = function () {
    callback();
  };
};

// 将cancel,挂载到vue原型上
Vue.prototype.cancel = function () {
  // 获取缓存的 请求取消标识 数组，取消所有关联的请求
  let cancelArr = window.axiosCancel;
  cancelArr = cancelArr || [];
  cancelArr.forEach((ele, index) => {
    ele.cancel("取消了请求")  // 在失败函数中返回这里自定义的错误信息
    delete window.axiosCancel[index]
  })
}


Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import axios from 'axios';
// 导入 NProgress 包对应的js 和 css
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

window.axiosCancel = []  // 全局定义一个存放取消请求的标识

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: '',
    headers: { //请求头
      'Content-Type': 'application/json',
    },
    // timeout: 15000,
  })
  
  // 2.axios的拦截器 
  // 请求拦截
  instance.interceptors.request.use(config => {
    NProgress.start();
    config.cancelToken = new axios.CancelToken(cancel => {
      window.axiosCancel.push({
        cancel
      })
    })
    return config
  }, err => {
    console.log(err);
  });



  // 响应拦截
  instance.interceptors.response.use(res => {
    NProgress.done();
    return res.data
  }, err => {
    console.log(err);
  })

  //3. 发送真正的网络请求
  return instance(config)
}

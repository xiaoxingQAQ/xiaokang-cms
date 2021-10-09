import axios from 'axios';
// 导入 NProgress 包对应的js 和 css
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://health.hxwch.com:8600',
    headers: { //比如token登录鉴权，请求的时候携带token，让后端识别登录人的信息
      token: JSON.parse(sessionStorage.getItem('token'))
    },   //请求头
    // timeout: 15000,
  })

  // 2.axios的拦截器 
  // 请求拦截
  instance.interceptors.request.use(config => {
    NProgress.start();
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

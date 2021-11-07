import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入 NProgress 包对应的js 和 css
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Home from '@/views/home/Home'

const Login = () => import('@/views/login/Login')

const HomeMain = () => import('@/views/home/childComps/HomeMain')

const Allocation = () => import('@/views/home/childComps/allocation/Allocation')
const Skill = () => import('@/views/home/childComps/allocation/Skill')
const Repository = () => import('@/views/home/childComps/allocation/Repository')
const Radio = () => import('@/views/home/childComps/allocation/Radio')
const GoodHealth = () => import('@/views/home/childComps/allocation/GoodHealth')
const Counselor = () => import('@/views/home/childComps/allocation/Counselor')

const DataCenter = () => import('@/views/home/childComps/dataCenter/DataCenter')
const SkillCenter = () => import('@/views/home/childComps/dataCenter/SkillCenter')

const Operation = () => import('@/views/home/childComps/operation/Operation')
const UserControl = () => import('@/views/home/childComps/operation/UserControl')
const OperationControl = () => import('@/views/home/childComps/operation/OperationControl')

const Service = () => import('@/views/home/childComps/manage/Service')
const Edition = () => import('@/views/home/childComps/manage/Edition')

const routes = [
  // { path: '', redirect: '/', },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '',
    name: 'Home',
    component: Home,
    redirect: '/main',
    children: [
      { path: '/main', name: HomeMain, component: HomeMain },

      { path: '/allocation', name: Allocation, component: Allocation, },
      { path: '/skill', name: Skill, component: Skill },
      { path: '/repository', name: Repository, component: Repository },
      { path: '/radio', name: Radio, component: Radio },
      { path: '/goodHealth', name: GoodHealth, component: GoodHealth },
      { path: '/counselor', name: Counselor, component: Counselor },

      { path: '/dataCenter', name: DataCenter, component: DataCenter },
      { path: '/skillCenter', name: SkillCenter, component: SkillCenter },

      { path: '/operation', name: Operation, component: Operation },
      { path: '/userControl', name: UserControl, component: UserControl },
      { path: '/operationControl', name: OperationControl, component: OperationControl },

      { path: '/service', name: Service, component: Service },
      { path: '/edition', name: Edition, component: Edition },
    ]
  },

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  // 如果访问登录页直接放行
  if (to.path === '/login') return next()
  /* 如果访问的不是 login 页面 */
  // 从sessionStorage 中获取保存的 token
  const tokenStr = JSON.parse(sessionStorage.getItem('token'));
  // 如果没有token,就强制跳转到 登录页面
  if (!tokenStr) {
    NProgress.done()
    return next('/login')
  }
  next()

  // 获取缓存的 请求取消标识 数组，取消所有关联的请求
  let cancelArr = window.axiosCancel;
  cancelArr = cancelArr || [];
  cancelArr.forEach((ele, index) => {
    ele.cancel("取消了请求")  // 在失败函数中返回这里自定义的错误信息
    delete window.axiosCancel[index]
  })
  next()
})
router.afterEach(() => {
  NProgress.done()
})


export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '@/views/home/Home'

const Login = () => import('@/views/login/Login')

const HomeMain = () => import('@/views/home/childComps/HomeMain')

const Allocation = () => import('@/views/home/childComps/allocation/Allocation')
const Skill = () => import('@/views/home/childComps/allocation/Skill')
const Repository = () => import('@/views/home/childComps/allocation/Repository')
const Edition = () => import('@/views/home/childComps/allocation/Edition')
const Radio =() => import('@/views/home/childComps/allocation/Radio')
const GoodHealth =() => import('@/views/home/childComps/allocation/GoodHealth')

const DataCenter = () => import('@/views/home/childComps/dataCenter/DataCenter')
const SkillCenter = () => import('@/views/home/childComps/dataCenter/SkillCenter')

const Operation = () => import('@/views/home/childComps/operation/Operation')
const UserControl = () => import('@/views/home/childComps/operation/UserControl')
const OperationControl = () => import('@/views/home/childComps/operation/OperationControl')

const Service = () => import('@/views/home/childComps/manage/Service')
const CallSettings = () => import('@/views/home/childComps/manage/CallSettings')
const RestSettings = () => import('@/views/home/childComps/manage/RestSettings')

const routes = [
  { path: '', redirect: '/login', },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/home',
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
      { path: '/edition', name: Edition, component: Edition },

      { path: '/dataCenter', name: DataCenter, component: DataCenter },
      { path: '/skillCenter', name: SkillCenter, component: SkillCenter },

      { path: '/operation', name: Operation, component: Operation },
      { path: '/userControl', name: UserControl, component: UserControl },
      { path: '/operationControl', name: OperationControl, component: OperationControl },

      { path: '/service', name: Service, component: Service },
      { path: '/callSettings', name: CallSettings, component: CallSettings },
      { path: '/restSettings', name: RestSettings, component: RestSettings },
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
  // 如果访问登录页直接放行
  if (to.path === '/login') return next()
  /* 如果访问的不是 login 页面 */
  // 从sessionStorage 中获取保存的 token
  const tokenStr = JSON.parse(sessionStorage.getItem('token'));
  // 如果没有token,就强制跳转到 登录页面
  if (!tokenStr) return next('/login')
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

export default router

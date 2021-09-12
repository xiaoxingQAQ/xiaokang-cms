import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/home/Home')
const HomeMain = () => import('@/views/home/childComps/HomeMain')
const Allocation = () => import('@/views/home/childComps/Allocation')
const DataCenter = () => import('@/views/home/childComps/DataCenter')
const Operation = () => import('@/views/home/childComps/Operation')
const Manage = () => import('@/views/home/childComps/Manage')

const routes = [
  { path: '', redirect: '/home', },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/main',
    children: [
      { path: 'main', name: HomeMain, component: HomeMain },
      { path: 'allocation', name: Allocation, component: Allocation },
      { path: 'dataCenter', name: DataCenter, component: DataCenter },
      { path: 'operation', name: Operation, component: Operation },
      { path: 'manage', name: Manage, component: Manage }
    ]
  },

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

import { User_Login, Init_User } from './mutations-types'

export default {
  namespaced: true,
  state: {
    memberID: null,
  },
  getters: {

  },
  mutations: {
    // 初次登录 设置
    [User_Login](state, userInfo) {
      state.memberID = userInfo.memberID
      console.log(userInfo);
    },
    // 下次页面刷新 数据初始化 读取本地存储 设置vuex
    [Init_User](state) {
      let memberID = JSON.parse(sessionStorage.getItem('memberID'))
      if (memberID) {
        state.memberID = memberID
      }
    },
  },
  actions: {

  }
}
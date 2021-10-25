import { User_Login, Init_User, User_ID } from './mutations-types'

export default {
  namespaced: true,
  state: {
    memberID: null,
    userInfo: {},

    equipmentID_user: null,
    memberID_user: null,
    counts_user: null,
    pubDate_user: null
  },
  getters: {},
  mutations: {
    // 初次登录 设置
    [User_Login](state, userInfo) {
      state.memberID = userInfo.memberID
      state.userInfo = userInfo
      console.log('state.userInfo: ', state.userInfo);
    },
    [User_ID](state, payload) {
      state.counts_user = payload.counts_user
      state.pubDate_user = payload.pubDate_user
      state.equipmentID_user = payload.equipmentID;
      state.memberID_user = payload.memberID
    },
    // 下次页面刷新 数据初始化 读取本地存储 设置vuex
    [Init_User](state) {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      let User = JSON.parse(sessionStorage.getItem('User'));

      if (userInfo instanceof Object) {
        state.memberID = userInfo.memberID
        state.userInfo = userInfo
      }

      if (User instanceof Object) {
        state.equipmentID_user = User.equipmentID_user
        state.memberID_user = User.memberID_user
        state.counts_user = User.counts_user
        state.pubDate_user = User.pubDate_user
      }
    },
  },
  actions: {

  }
}
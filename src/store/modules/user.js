import { User_Login, Init_User, User_ID } from './mutations-types'

export default {
  namespaced: true,
  state: {
    memberID: null,
    username: null,
    systemIcon: null,
    systemName: null,

    equipmentID_user: null,
    memberID_user: null,
  },
  getters: {

  },
  mutations: {
    // 初次登录 设置
    [User_Login](state, userInfo) {
      state.memberID = userInfo.memberID
      state.username = userInfo.username
      state.systemIcon = userInfo.systemIcon
      state.systemName = userInfo.systemName
    },
    [User_ID](state, payload) {
      state.equipmentID_user = payload.equipmentID;
      state.memberID_user = payload.memberID
    },
    // 下次页面刷新 数据初始化 读取本地存储 设置vuex
    [Init_User](state) {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      let equipmentID_user = JSON.parse(sessionStorage.getItem('equipmentID_user'));
      let memberID_user = JSON.parse(sessionStorage.getItem('memberID_user'));
      if (JSON.stringify(userInfo) !== '{}') {
        state.memberID = userInfo.memberID
        state.username = userInfo.username
        state.systemIcon = userInfo.systemIcon
        state.systemName = userInfo.systemName
      }
      if (equipmentID_user) {
        state.equipmentID_user = equipmentID_user
      }
      if (memberID_user) {
        state.memberID_user = memberID_user
      }
    },
  },
  actions: {

  }
}
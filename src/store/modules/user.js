import { User_Login, Init_User, User_EquipmentID } from './mutations-types'

export default {
  namespaced: true,
  state: {
    memberID: null,
    equipmentID: null,
  },
  getters: {

  },
  mutations: {
    // 初次登录 设置
    [User_Login](state, userInfo) {
      state.memberID = userInfo.memberID
    },
    [User_EquipmentID](state, id) {
      state.equipmentID = id;
    },
    // 下次页面刷新 数据初始化 读取本地存储 设置vuex
    [Init_User](state) {
      let memberID = JSON.parse(sessionStorage.getItem('memberID'));
      let equipmentID = JSON.parse(sessionStorage.getItem('equipmentID'));
      if (memberID) {
        state.memberID = memberID
      }
      if (equipmentID) {
        state.equipmentID = equipmentID
      }
    },
  },
  actions: {

  }
}
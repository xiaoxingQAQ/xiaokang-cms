import { Edition_Info, Init_Edition_Info } from './mutations-types';

export default {
  namespaced: true,
  state: {
    edition_ID: null,
  },
  getters: {},
  mutations: {
    [Edition_Info](state, payload) {
      console.log('payload: ', payload);
      state.edition_ID = payload.id;

    },
    [Init_Edition_Info](state) {
      let Edition = JSON.parse(sessionStorage.getItem('Edition'));
      console.log('Edition: ', Edition);
      
      if (Edition instanceof Object) {
        state.edition_ID = Edition.id;
      }
    },
  },
  actions: {},
}
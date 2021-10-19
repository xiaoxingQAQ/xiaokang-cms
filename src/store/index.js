import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user' ;
import edition from './modules/edition';

export default new Vuex.Store({
  state: {
  },  
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    edition
  }
})

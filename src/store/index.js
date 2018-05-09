import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import ws from './modules/ws'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    ws,
    user
  },
  getters
})

export default store

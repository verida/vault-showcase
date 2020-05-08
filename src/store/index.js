import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import system from './system'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({ system: state.system }),
  filter: (mutation) => mutation.type === 'system/initRecipient'
})

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    system
  }
})

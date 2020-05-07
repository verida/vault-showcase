const state = {
  schema: false,
  user: null
}

const mutations = {
  setSchema (state, payload) {
    state.schema = payload
  },
  initUser (state, payload) {
    state.user = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

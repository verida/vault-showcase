const state = {
  info: null,
  category: null,
  buttons: [],
  sidebar: false,
  mobile: false
}

const mutations = {
  init (state, payload) {
    Object.assign(state, payload)
  },
  setActions (state, payload) {
    state.buttons = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

const state = {
  schema: false
}

const mutations = {
  setSchema (state, payload) {
    state.schema = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

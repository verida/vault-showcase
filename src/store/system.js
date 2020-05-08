const state = {
  schema: false,
  user: null,
  recipient: null,
  list: null,
  processing: false
}

const mutations = {
  setSchema (state, payload) {
    state.schema = payload
  },
  initUser (state, payload) {
    state.user = payload
  },
  initRecipient (state, payload) {
    state.recipient = payload
  },
  setList (state, payload) {
    state.list = payload
  },
  setProcessing (state, payload) {
    state.processing = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

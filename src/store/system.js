const state = {
  user: null,
  recipient: null,
  list: null,
  processing: false,
  reconnecting: false
}

const mutations = {
  initUser(state, payload) {
    state.user = payload
  },
  initRecipient(state, payload) {
    state.recipient = payload
  },
  setList(state, payload) {
    state.list = payload
  },
  setProcessing(state, payload) {
    state.processing = payload
  },
  setReconnecting(state, payload) {
    state.reconnecting = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

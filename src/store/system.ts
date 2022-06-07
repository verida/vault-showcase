
const state = {
	user: null,
	recipient: null,
	list: null,
	processing: false,
	reconnecting: false,
	connected: false,
};

const mutations = {
	initUser(state: any, payload: any) {
		state.user = payload;
	},
	initRecipient(state: any, payload: any) {
		state.recipient = payload;
	},
	setList(state: any, payload: any) {
		state.list = payload;
	},
	setConnection(state: any, payload: any) {
		state.connected = payload;
	},
	setProcessing(state: any, payload: any) {
		state.processing = payload;
	},
	setReconnecting(state: any, payload: any) {
		state.reconnecting = payload;
	},
};


export default {
	namespaced: true,
	state,
	mutations,
};

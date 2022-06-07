import { createStore } from "vuex";
import VuexPersistence from 'vuex-persist';

import system from "./system";

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	reducer: (state: any) => ({ system: state.system }),
	filter: (mutation: { type: string }) => mutation.type === 'system/initRecipient',
});


export default createStore({
	modules: { system },
	plugins: [vuexLocal.plugin]
});

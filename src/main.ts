import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as _ from "underscore";
import Clipboard from "vue-clipboard2";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import { VueSpinners } from "@saeris/vue-spinners";
import { defineRule } from "vee-validate";

import Account from "@verida/vue-account/";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "@/assets/scss/index.scss";

defineRule("did", (value: string) => {
	if (/^did:(vda):[a-zA-Z0-9]*$/.test(value)) {
		return true;
	}

	return "The entered value doesn't match the expected format";
});

(window as any)._ = _;

const app = createApp(App);


app.use(Account)
	.use(store)
	.use(router)
	.use(Clipboard)
	.use(BootstrapVue)
	.use(BootstrapVueIcons)
	.use(VueSpinners)
	.mount("#app");

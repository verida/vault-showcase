import { createApp } from "vue";
import VueToast from "vue-toast-notification";
import { defineRule } from "vee-validate";
import * as _ from "underscore";
import Clipboard from "vue-clipboard2";
import Account from "@verida/vue-account";
import Datepicker from '@vuepic/vue-datepicker';




import App from "./App.vue";
import router from "./router";
import store from "./store";

// import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";


import "bootstrap";
import "vue-toast-notification/dist/theme-sugar.css";
import '@vuepic/vue-datepicker/dist/main.css'
import "./assets/scss/index.scss";


defineRule("did", (value: string) => {
	if (/^did:(vda):[a-zA-Z0-9]*$/.test(value)) {
		return true;
	}

	return "The entered value doesn't match the expected format";
});

(window as any)._ = _;

const app = createApp(App);

app.component('date-picker', Datepicker);

app.use(Account)
	.use(store)
	.use(router)
	.use(Clipboard)
	.use(VueToast, {
		position: "top",
	})
	.mount("#app");

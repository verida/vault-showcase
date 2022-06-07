import { createNamespacedHelpers } from "vuex";
import { DATA_SEND } from "../constants/inbox";
import veridaHelper from "../helpers/VeridaHelper";

const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");

export default {
	computed: {},
	methods: {
		...mapSystemMutations(["initUser", "setList", "setProcessing"]),
	},
	created() {
		veridaHelper.on("messageNotification", (inbox) => {
			const { data, type } = inbox;
			if (type === DATA_SEND) {
				const { data: records } = data;
				const response = _.isArray(records[0]) ? records[0] : records;
				this.setProcessing(false);
				this.setList(response);
			}
			this.$toast.success(`New message Inbox sent`, {
				duration: 3000,
			});
		});
	},
};

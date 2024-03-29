import { createNamespacedHelpers } from "vuex";
import veridaHelper from "@/helpers/VeridaHelper";
import {
  veridaMessagingTypes,
  NOTIFICATION_DURATION_TIMEOUT,
} from "@/constants";

const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");

export default {
  computed: {},
  methods: {
    ...mapSystemMutations(["initUser", "setList", "setProcessing"]),
  },
  created() {
    veridaHelper.on("messageNotification", (inbox) => {
      const { data, type } = inbox;
      if (type === veridaMessagingTypes.dataSend) {
        const { data: records } = data;
        const response = _.isArray(records[0]) ? records[0] : records;
        this.setProcessing(false);
        this.setList(response);
      }
      this.$toast.success(`New message Inbox sent`, {
        duration: NOTIFICATION_DURATION_TIMEOUT,
      });
    });
  },
};

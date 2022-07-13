<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-demo">
    <a href="/">
      <img src="@/assets/img/verida-logo-title.svg" />
    </a>
    <vda-account
      :logo="logo"
      :openUrl="openUrl"
      :contextName="contextName"
      @onError="onError"
      @onLogout="disconnect"
      @onConnected="onSuccess"
    />
  </nav>
</template>

<script>
import { defineComponent } from "vue";
import { createNamespacedHelpers } from "vuex";
import DidStatistics from "../cards/DidStatistics";
import VeridaHelper from "../../helpers/VeridaHelper";
import { envKeys } from "@/config/env.config";
const { mapState: mapSystemState, mapMutations: mapSystemMutations } =
  createNamespacedHelpers("system");

export default defineComponent({
  name: "UserMenu",
  components: {
    DidStatistics,
  },
  data() {
    return {
      contextName: envKeys.VUE_APP_CONTEXT_NAME,
      logo: envKeys.VUE_APP_LOGO_URL,
      openUrl: window.origin,
    };
  },
  computed: {
    ...mapSystemState(["processing", "user"]),
  },
  methods: {
    ...mapSystemMutations([
      "setConnection",
      "setReconnecting",
      "setConnection",
    ]),
    ...mapSystemMutations(["initUser", "setConnection", "setReconnecting"]),

    async onSuccess(context) {
      this.setReconnecting(true);
      VeridaHelper.connectVault(context);
      this.setReconnecting(false);
      this.$router.push({ name: "home" });
    },
    onError(error) {
      this.error = error;
    },
    go(mode) {
      this.$router.push({
        name: "dashboard",
        params: { mode },
      });
    },
    async disconnect() {
      this.setConnection(false);
      await VeridaHelper.logout();
      this.$router.push({ name: "connect" });
    },
  },
});
</script>

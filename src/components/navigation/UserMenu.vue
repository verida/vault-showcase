<template>
  <b-navbar toggleable="lg" type="dark" class="navbar-demo">
    <b-navbar-brand href="/">
      <img src="@/assets/img/verida-logo-title.svg" />
    </b-navbar-brand>
    <vda-account
      :logo="logo"
      @onError="onError"
      :contextName="contextName"
      @onLogout="disconnect"
      @onConnected="onSuccess"
    />
  </b-navbar>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { BarLoader } from "@saeris/vue-spinners";
import DidStatistics from "../cards/DidStatistics";
import VeridaHelper from "../../helpers/VeridaHelper";
const { mapState: mapSystemState, mapMutations: mapSystemMutation } =
  createNamespacedHelpers("system");

export default {
  name: "UserMenu",
  components: {
    DidStatistics,
    BarLoader,
  },
  data() {
    return {
      isOpened: false,
      connected: true,
      contextName: "Verida: New Account Component",
      logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
    };
  },
  computed: {
    ...mapSystemState(["processing", "user"]),
  },
  methods: {
    ...mapSystemMutation(["initRecipient", "initUser", "setConnection"]),
    onSuccess(response) {
      console.log(response);
    },
    onError() {},
    go(mode) {
      this.$router.push({
        name: "dashboard",
        params: { mode },
      });
    },
    async disconnect() {
      this.initUser(null);
      this.initRecipient(null);
      this.setConnection(false);
      await VeridaHelper.logout();
      this.$router.push({ name: "connect" });
    },
  },
};
</script>

<template>
  <div>
    <video autoplay muted class="landing" loop>
      <source src="@/assets/video/landing.mp4" type="video/mp4" />
    </video>
    <div>
      <vda-login
        @onError="onError"
        @onConnected="onSuccess"
        :contextName="contextName"
        :logo="logo"
        loginText="loginText"
      />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { CircleLoader } from "@saeris/vue-spinners";
import VeridaHelper from "../helpers/VeridaHelper";

const { mapMutations: mapSystemMutations } = createNamespacedHelpers("system");

export default {
  name: "Landing",
  components: {
    CircleLoader,
  },
  data() {
    return {
      processing: false,
      error: null,
      contextName: "VUE_APP_CONTEXT_NAME",
      logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
    };
  },
  methods: {
    ...mapSystemMutations(["initUser", "setConnection"]),
    async onSuccess(context) {
      // this.setStatus(true);
      // await VeridaHelper.connect(context);
    },
    onError(error) {
      this.error = error;
    },
    async connect() {
      this.processing = true;
      try {
        await VeridaHelper.connectVault();
        const profile = VeridaHelper.profile;
        if (VeridaHelper.connected) {
          // console.log("login in");
          // this.setConnection(true);
          // this.initUser({
          //   address: VeridaHelper.did,
          //   name: profile.name,
          //   avatar: profile.avatar,
          // });
          this.$router.push({ name: "home" });
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.processing = false;
      }
    },
  },
};
</script>

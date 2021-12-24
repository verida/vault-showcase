<template>
  <div>
    <video autoplay muted class="landing" loop>
      <source src="@/assets/video/landing.mp4" type="video/mp4" />
    </video>
    <div class="mt-5 landing__connect p-5">
      <img src="@/assets/img/verida_logo.svg" alt="verida-logo" />
      <h3>Connect Now</h3>
      <p>Use the button below to connect with Verida Vault</p>
      <button class="landing__btn" @click="connect" :disabled="processing">
        <img
          src="@/assets/img/connect_with_verida_dark.png"
          v-if="!processing"
        />
        <CircleLoader color="#fff" :size="100" v-else />
      </button>
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
    };
  },
  methods: {
    ...mapSystemMutations(["initUser"]),
    async connect() {
      this.processing = true;
      try {
        await VeridaHelper.connectVault();
        await VeridaHelper.messageListener();
        const profile = VeridaHelper.profile;
        if (VeridaHelper.connected) {
          this.initUser({ address: VeridaHelper.did, name: profile.name });
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

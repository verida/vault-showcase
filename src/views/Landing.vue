<template>
  <div>
    <video autoplay muted class="landing" loop>
      <source src="@/assets/video/landing.mp4" type="video/mp4" />
    </video>
    <button class="landing__btn" @click="connect" :disabled="processing">
      <img src="@/assets/img/verida-logo.svg" v-if="!processing" />
      <CircleLoader color="#fff" :size="100" v-else />
    </button>
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
        const profile = VeridaHelper.profile;
        this.initUser({ address: profile.did, name: profile.name });
        this.$router.push({ name: "home" });
      } catch (error) {
        this.error = error;
      } finally {
        this.processing = false;
      }
    },
  },
};
</script>

<template>
  <b-navbar toggleable="lg" type="dark" class="navbar-demo">
    <b-navbar-brand href="/">
      <img src="@/assets/img/verida-logo-title.svg" />
    </b-navbar-brand>
    <div v-if="connected" class="user-menu-widget">
      <span class="mx-2">{{ user.name }}</span>
      <div class="m-dropdown">
        <div
          @click="toggleDropdown"
          :class="['m-dropdown-top', isOpened && 'show']"
        >
          <img
            height="40"
            v-if="user.avatar"
            alt="user-avatar"
            :src="user.avatar"
          />
          <img v-else height="40" src="@/assets/img/avatar.svg" alt="i" />
        </div>
        <div v-show="isOpened" class="m-dropdown-logout">
          <p>{{ truncateDID(user.address) }}</p>
          <button @click="disconnect">
            <img height="20" src="@/assets/img/logout.svg" alt="icon" />
            <span> Log out</span>
          </button>
        </div>
      </div>
    </div>
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
      // connected: false,
    };
  },
  computed: {
    ...mapSystemState(["processing", "user", "connected"]),
  },
  methods: {
    ...mapSystemMutation(["initRecipient", "initUser", "setConnection"]),
    go(mode) {
      this.$router.push({
        name: "dashboard",
        params: { mode },
      });
    },
    toggleDropdown() {
      this.isOpened = !this.isOpened;
    },
    async disconnect() {
      this.initUser(null);
      this.initRecipient(null);
      this.setConnection(false);
      await VeridaHelper.logout();
      this.$router.push({ name: "connect" });
    },
    truncateDID(did) {
      return did.slice(0, 14);
    },
  },
};
</script>

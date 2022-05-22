<template>
  <div class="main-layout">
    <user-menu />
    <div class="container">
      <div>
        <div class="dashboard-card">
          <div v-if="reconnecting" class="d-flex justify-content-center">
            <pulse-loader
              color="#2263c3"
              :loading="reconnecting"
              class="card-spinner"
            />
            <span>Reconnecting....</span>
          </div>
          <router-view v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import UserMenu from "./components/navigation/UserMenu.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import ConnectionMixin from "@/mixins/connection";
import { createNamespacedHelpers } from "vuex";
const { mapState: mapSystemState, mapMutations: mapSystemMutations } =
  createNamespacedHelpers("system");

export default defineComponent({
  name: "App",
  mixins: [ConnectionMixin],
  computed: {
    ...mapSystemState(["reconnecting", "count"]),
  },
  components: {
    UserMenu,
    PulseLoader,
  },
});
</script>

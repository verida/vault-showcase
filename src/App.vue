<template>
  <div id="app" class="main-layout">
    <navbar />
    <b-container>
      <b-row align-h="center">
        <div class="dashboard-card">
          <div v-if="reconnecting">
            <CircleLoader color="#2263c3" :size="100" class="card-spinner" />
            <span>Reconnecting....</span>
          </div>

          <router-view v-else />
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from "./components/navigation/Navbar";
import { CircleLoader } from "@saeris/vue-spinners";
import ConnectionMixin from "@/mixins/connection";
import { createNamespacedHelpers } from "vuex";

const { mapState: mapSystemState } = createNamespacedHelpers("system");

export default {
  name: "App",
  mixins: [ConnectionMixin],
  computed: {
    ...mapSystemState(["reconnecting"]),
  },
  components: {
    Navbar,
    CircleLoader,
  },
};
</script>

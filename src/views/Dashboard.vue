<template>
  <div>
    <router-link to="/" class="small"> &#60; Back </router-link>
    <component :is="mode" />
  </div>
</template>

<script>
import Send from "../components/modes/Send";
import Request from "../components/modes/Request";
import Message from "../components/modes/Message.vue";

export default {
  name: "Dashboard",
  components: {
    Send,
    Request,
    Message,
  },
  computed: {
    mode() {
      const { mode } = this.$route.params;
      return mode;
    },
  },
  beforeMount() {
    const { mode } = this.$route.params;
    if (mode !== "request" || mode !== "send") {
      // this.$router.push({ name: 'home' })
    }
  },
};
</script>

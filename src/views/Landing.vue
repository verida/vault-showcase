<template>
  <div>
    <video autoplay muted class="landing" loop>
      <source src="@/assets/video/landing.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Landing",
  components: {},
  data() {
    return {};
  },
  methods: {},
});
</script>

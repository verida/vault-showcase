<template>
  <did-card class="mt-4" />
</template>
<script>
import { defineComponent } from "vue";
import DidCard from "@/components/cards/DidCard";

export default defineComponent({
  name: "Home",
  components: {
    DidCard,
  },
});
</script>

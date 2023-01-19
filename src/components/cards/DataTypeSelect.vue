<template>
  <div class="form-group">
    <label class="my-1">Type of data to {{ mode }}</label>
    <select
      class="form-control my-2"
      id="data-type-id"
      v-model="selected"
      @change="handleSelected()"
    >
      <option v-for="(option, idx) in options" :key="idx" :value="option">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { allSchemasForMessaging } from "@/config";
import veridaHelper from "@/helpers/VeridaHelper";

export default defineComponent({
  name: "DataTypeSelect",
  data() {
    return {
      selected: null,
      options: null,
    };
  },
  async beforeMount() {
    await this.init();
  },
  computed: {
    mode() {
      return this.$route.params.mode;
    },
  },
  methods: {
    handleSelected() {
      this.$emit("change", this.selected);
    },
    async init() {
      this.options = [];
      for (const i in allSchemasForMessaging) {
        const document = await veridaHelper.retrieveSchema(allSchemasForMessaging[i]);
        this.options.push({
          text: document.title,
          path: allSchemasForMessaging[i],
          schema: document.$id,
          properties: document.properties,
        });
      }
    },
  },
});
</script>

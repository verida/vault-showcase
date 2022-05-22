<template>
  <div class="form-group">
    <label>Type of data to {{ mode }}</label>
    <select
      class="form-control"
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
import { SCHEMAS } from "../../config/schemas";
import veridaHelper from "../../helpers/VeridaHelper";

export default defineComponent({
  name: "DataTypeSelect",
  props: ["emitted"],
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
      for (const i in SCHEMAS) {
        const document = await veridaHelper.retrieveSchema(SCHEMAS[i]);
        this.options.push({
          text: document.title,
          path: SCHEMAS[i],
          schema: document.$id,
          properties: document.properties,
        });
      }
    },
  },
});
</script>

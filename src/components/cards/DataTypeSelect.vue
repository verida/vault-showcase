<template>
  <div>
    <label>Type of data to {{ mode }}</label>
    <b-form-select v-model="selected" @change="(obj) => $emit('change', obj)">
      <option v-for="(option, idx) in options" :key="idx" :value="option">
        {{ option.text }}
      </option>
    </b-form-select>
  </div>
</template>

<script>
import { SCHEMAS } from "../../config/schemas";
import veridaHelper from "../../helpers/VeridaHelper";

export default {
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
};
</script>

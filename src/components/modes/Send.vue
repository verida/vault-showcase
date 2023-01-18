<template>
  <div class="mt-3 card p-2" style="width: 20rem">
    <data-type-select @change="select" />
    <div v-if="entity">
      <SchemaFields
        ref="schema-fields"
        :entity="entity"
        :data="data"
        :attributes="attributes"
      />
    </div>
    <div v-if="processing" class="card-shadow">
      <pulse-loader
        color="#2263c3"
        :loading="processing"
        class="card-spinner"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import DataTypeSelect from "@/components/cards/DataTypeSelect";
import SchemaFields from "@/components/forms/SchemaFields";
import { createNamespacedHelpers } from "vuex";
import VeridaHelper from "@/helpers/VeridaHelper";
import { allSchemasForMessaging } from "@/config";
const { mapState: mapSystemState } = createNamespacedHelpers("system");

export default defineComponent({
  name: "Request",
  components: {
    SchemaFields,
    DataTypeSelect,
    PulseLoader,
  },
  data() {
    return {
      entity: null,
      data: {},
      attributes: {},
    };
  },
  computed: {
    ...mapSystemState(["processing"]),
  },
  methods: {
    async select({ schema }) {
      if (!schema) {
        return;
      }
      this.entity = await VeridaHelper.retrieveSchema(schema);
      if (this.entity.$id == allSchemasForMessaging[3]) {
        this.entity = {
          ...this.entity,
          layouts: {
            create: ["message", "subject"],
          },
        };
      }
      this.init();
    },
    setFields(key, requiredFields, getProps) {
      this.data[key] = "";
      this.attributes[key] = getProps[key];
      this.attributes[key]["required"] = requiredFields.indexOf(key) !== -1;
    },
    init() {
      this.data = {};
      this.attributes = {};
      this.entity.layouts.create.forEach((key) => {
        this.setFields(key, this.entity.required, this.entity.properties);
      });
    },
  },
});
</script>

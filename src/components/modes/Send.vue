<template>
  <b-card class="mt-3">
    <DataTypeSelect @change="select" />
    <div v-if="entity" class="mt-4">
      <hr />
      <SchemaFields
        @reset="init"
        ref="schema-fields"
        :entity="entity"
        :data="data"
        :attributes="attributes"
      />
    </div>
    <div v-if="processing" class="card-shadow">
      <CircleLoader color="#2263c3" :size="100" class="card-spinner" />
    </div>
  </b-card>
</template>

<script>
import { CircleLoader } from "@saeris/vue-spinners";
import DataTypeSelect from "../cards/DataTypeSelect";
import SchemaFields from "../forms/SchemaFields";

import { createNamespacedHelpers } from "vuex";
import VeridaHelper from "../../helpers/VeridaHelper";
import { getSchemaProperties } from "../../helpers/NameModifier";
const { mapState: mapSystemState } = createNamespacedHelpers("system");

export default {
  name: "Request",
  components: {
    SchemaFields,
    DataTypeSelect,
    CircleLoader,
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
      this.entity = await VeridaHelper.retrieveSchema(schema);
      await this.$nextTick();
      this.init();
    },
    init() {
      this.data = {};
      this.attributes = {};
      const requiredFields =
        this.entity.allOf.find((item) => item["properties"])?.required || [];
      const getProps = getSchemaProperties(this.entity);

      this.entity.layouts.create.forEach((key) => {
        this.$set(this.data, key, "");
        this.$set(this.attributes, key, getProps[key]);
        this.$set(
          this.attributes[key],
          "required",
          requiredFields.indexOf(key) !== -1
        );
      });
      this.$refs["schema-fields"].$refs.validator.reset();
    },
  },
};
</script>

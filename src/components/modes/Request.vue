<template>
  <div class="card mt-3 p-3 d-flex justify-content-center">
    <div class="mt-3">
      <data-type-select @change="select" v-model="entity" />
      <div class="mt-3">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            v-model="params.userSelect"
            :value="false"
          />
          <label class="form-check-label" for="inlineRadio1"> All data</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            v-model="params.userSelect"
            :value="true"
          />
          <label class="form-check-label" for="inlineRadio2">
            User select data</label
          >
        </div>
      </div>

      <button class="mt-3 btn btn-success" @click="request">Request</button>
      <div v-if="processing" class="card-shadow">
        <pulse-loader
          color="#2263c3"
          :loading="processing"
          class="card-spinner"
        />
        <button class="btn" @click="cancel">Cancel</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table mt-4 table-striped">
        <thead class="table-info">
          <tr>
            <th v-for="title in tableHeader" :key="title">{{ title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="item in records" :key="item">{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import DataTypeSelect from "../cards/DataTypeSelect";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { createNamespacedHelpers } from "vuex";
import veridaHelper from "../../helpers/VeridaHelper";
const { mapState: mapSystemState, mapMutations: mapSystemMutations } =
  createNamespacedHelpers("system");

export default defineComponent({
  name: "Send",
  components: {
    DataTypeSelect,
    PulseLoader,
  },
  data() {
    return {
      entity: null,
      properties: null,
      tableHeader: [],
      records: [],
      schema: null,
      params: {
        requestSchema: null,
        userSelect: null,
      },
    };
  },
  computed: {
    ...mapSystemState(["recipient", "list", "processing"]),
  },
  methods: {
    ...mapSystemMutations(["setProcessing"]),
    async select({ schema }) {
      if (schema) {
        this.schema = await veridaHelper.retrieveSchema(schema);
        this.records = null;
        this.entity = this.schema.title;
        this.properties = this.schema.properties;
        this.params.requestSchema = this.schema["$id"];
      }
    },
    async request() {
      this.setProcessing(true);
      try {
        const message = `Verida: Generic Demo is requesting access to "${this.entity}" records`;

        const data = {
          ...this.params,
          filter: {},
        };

        await veridaHelper.requestData({
          did: this.recipient,
          message,
          data,
        });

        this.$toast.success(
          `data requested from ${this.recipient} Inbox sent`,
          {
            duration: 3000,
          }
        );
      } catch (error) {
        this.$toast.error(
          `An error occurred, when requesting ${this.entity} Inbox hasn't been sent`,
          {
            duration: 3000,
          }
        );
      } finally {
        this.setProcessing(false);
      }
    },
    cancel() {
      this.setProcessing(false);
    },
  },
  watch: {
    list() {
      if (this.list) {
        const keys = this.schema.layouts.view;
        const tableData = this.list.map((obj) => _.pick(obj, keys));
        this.records = _.values(_.pick(tableData[0], keys));
        this.tableHeader = _.keys(_.pick(this.list[0], keys));      }
    },
  },
});
</script>

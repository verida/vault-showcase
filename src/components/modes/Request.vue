<template>
  <div class="card mt-3 p-3 d-flex justify-content-center">
    <h4>Choose type of Request Data</h4>
    <hr />
    <div>
      <div class="form-check form-check-inline">
        <input type="radio" v-model="dataType" value="user-data" />
        <label class="form-check-label mx-1" for="user-data"> User data</label>
      </div>
      <div class="form-check form-check-inline">
        <input type="radio" v-model="dataType" value="social-data" />
        <label class="form-check-label mx-1" for="social-data">
          Social Media Data</label
        >
      </div>
    </div>
    <hr />
    <div class="mt-3">
      <div v-if="dataType === `social-data`">
        <div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              v-model="selectedSocial"
              value="https://facebook.com/"
            />
            <label class="form-check-label" for="social-facebook">
              Facebook</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              v-model="selectedSocial"
              value="https://twitter.com/"
            />
            <label class="form-check-label" for="social-twitter">
              Twitter</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              v-model="selectedSocial"
              value="all"
            />
            <label class="form-check-label" for="social-all"> All</label>
          </div>
        </div>
        <div class="mt-3">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              v-model="socialDataSchema"
              :value="schemaType.posts"
            />
            <label class="form-check-label" for="inlineRadio1"> Posts</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              v-model="socialDataSchema"
              :value="schemaType.following"
            />
            <label class="form-check-label" for="inlineRadio2">
              Following</label
            >
          </div>
        </div>
      </div>
      <div v-else>
        <data-type-select @change="select" v-model="entity" />
        <div class="mt-3">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              checked
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
      </div>
      <button class="mt-3 btn btn-success" @click="request">Request</button>
      <div v-if="processing" class="card-shadow">
        <pulse-loader
          color="#2263c3"
          :loading="processing"
          class="card-spinner"
        />
        <button class="btn" :disabled="processing" @click="cancel">
          Cancel
        </button>
      </div>
    </div>
    <ag-grid-vue
      style="height: 200px"
      class="ag-theme-alpine mt-3"
      :columnDefs="tableHeader"
      :rowData="records"
    >
    </ag-grid-vue>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import DataTypeSelect from "../cards/DataTypeSelect";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { createNamespacedHelpers } from "vuex";
import veridaHelper from "../../helpers/VeridaHelper";
import { socialDataSchema } from "@/config/schemas";
const { mapState: mapSystemState, mapMutations: mapSystemMutations } =
  createNamespacedHelpers("system");

const { VUE_APP_CONTEXT_NAME } = process.env;

export default defineComponent({
  name: "Send",
  components: {
    DataTypeSelect,
    PulseLoader,
    AgGridVue,
  },
  data() {
    return {
      entity: null,
      properties: null,
      tableHeader: [],
      records: [],
      dataType: "social-data",
      schema: null,
      socialDataSchema: socialDataSchema.posts,
      params: {
        requestSchema: null,
        userSelect: null,
      },
      schemaType: socialDataSchema,
      selectedSocial: "all",
      isLoading: false,
    };
  },
  mounted() {
    this.socialDataSchema = this.schemaType.post;
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
      let data;
      let message;

      if (this.dataType === "user-data") {
        message = `${VUE_APP_CONTEXT_NAME} is requesting access to "${this.entity}" records`;
        data = {
          ...this.params,
          filter: {},
        };
      } else {
        message = `${VUE_APP_CONTEXT_NAME} is requesting access to "${this.selectedSocial}" social media records`;
        this.schema = await veridaHelper.retrieveSchema(this.socialDataSchema);
        data = {
          requestSchema: this.socialDataSchema,
          filter: {},
          userSelect: false,
        };
        if (this.selectedSocial !== "all") {
          data.filter.sourceApplication = this.selectedSocial;
        }
      }
      try {
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

        this.records = _.without(this.list, keys);

        const testHeader = _.keys(_.pick(this.list[0], keys));

        const columHeader = testHeader.map((item) => ({
          headerName: item,
          field: item,
        }));

        this.tableHeader = columHeader;
      }
    },
  },
});
</script>

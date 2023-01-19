<template>
  <div>
    <VeeForm v-slot="{ handleSubmit }" :validation-schema="schema" as="div">
      <form @submit="handleSubmit($event, onSubmit)">
        <div v-for="(item, key) in data" :key="key">
          <div class="form-group">
            <label>{{ attributes[key].title }}</label>
            <div v-if="attributes[key].enum">
              <div>
                <Field :name="key" as="select" class="form-control">
                  <option value="">Select type</option>
                  <option
                    v-for="type in ['Positive', 'Negative']"
                    :key="type"
                    :value="type"
                  >
                    {{ type }}
                  </option>
                </Field>
                <ErrorMessage class="danger-text" :name="key" />
              </div>
            </div>
            <div
              v-if="
                attributes[key].format &&
                attributes[key].format.includes('date')
              "
            >
              <Field
                type="date"
                v-model="data[key]"
                class="form-control"
                :name="key"
                :max="maxDate"
              />
              <ErrorMessage :name="key" class="danger-text" />
            </div>

            <div
              v-else-if="
                attributes[key].inputType === 'textarea' ||
                attributes[key].title === 'Message'
              "
            >
              <Field
                class="form-control word-break"
                spellcheck="false"
                v-model="data[key]"
                :name="key"
                rows="3"
                type="radio"
              />
              <ErrorMessage :name="key" class="danger-text" />
            </div>
            <div v-else>
              <div v-if="!attributes[key].enum">
                <Field
                  class="form-control"
                  :type="attributes[key].type"
                  v-model="data[key]"
                  :name="key"
                />
                <ErrorMessage :name="key" class="danger-text" />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Send</button>
      </form>
    </VeeForm>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { extract } from "@/helpers/NameModifier";
import { createNamespacedHelpers } from "vuex";
import veridaHelper from "@/helpers/VeridaHelper";
import { buildSchema } from "@/helpers/FormValidators";
import { NOTIFICARTION_DURATION_TIMEOUT, veridaMessagingTypes } from "@/constants";
const { mapState: mapSystemState, mapMutations: mapSystemMutations } =
  createNamespacedHelpers("system");

export default defineComponent({
  name: "SchemaFields",
  props: ["data", "attributes", "entity"],
  components: { VeeForm, Field, ErrorMessage },
  computed: {
    typed(str) {
      if (str === "string") return "text";
      if (str === "number") return "number";
      return "text";
    },
    ...mapSystemState(["recipient"]),
  },
  mounted() {
    this.schema = yup.object(buildSchema(this.attributes));
  },
  data() {
    return {
      maxDate: "",
      schema: {},
    };
  },
  watch: {
    attributes(attr, _) {
      this.schema = yup.object(buildSchema(attr));
    },
  },
  methods: {
    ...mapSystemMutations(["setProcessing"]),
    async onSubmit(values) {
      const payload = {
        name: extract(values, this.entity.$id),
        ...values,
      };
      if (this.entity.properties.didJwtVc) {
        payload.didJwtVc = await this.createCredential(payload);
        payload.testTimestamp = new Date().toISOString();
      }

      const store = await veridaHelper.context.openDatastore(this.entity.$id);

      this.setProcessing(true);

      // quick hack to format dates as expected for JSON validation
      for (const key in this.attributes) {
        if (this.attributes[key].format === "date") {
          payload[key] = payload[key].substr(0, 10);
        }
      }

      // quick hack to set meaningful names
      switch (this.entity.$id) {
        case "https://common.schemas.verida.io/social/contact/v0.1.0/schema.json":
          payload.name = `${payload.firstName} ${payload.lastName} KYC`;
          break;
        case "https://common.schemas.verida.io/health/pathology/tests/covid19/pcr/v0.1.0/schema.json":
          payload.name = `${payload.fullName} COVID Result`;
      }
      const saved = await store.save(payload);

      if (!saved) {
        this.$toast.error(`${store.errors && store.errors[0].message}`, {
          duration: NOTIFICARTION_DURATION_TIMEOUT,
        });
        this.setProcessing(false);
        return false;
      }

      const result = await store.get(saved.id);

      await this.sendMessage(result);
    },
    format(key, value) {
      values[key] =
        this.attributes[key].type === "number" ? Number(value) : value;
    },
    async sendMessage(message) {
      const messageSubject = `Sending you ${this.entity.title}`;

      try {
        await veridaHelper.messaging({
          data: message,
          did: this.recipient,
          subject: messageSubject,
          type: veridaMessagingTypes.dataSend,
        });

        this.setProcessing(false);
        veridaHelper.did = this.recipient;
        this.$toast.success(
          `Created ${this.entity.title} is sent to ${this.recipient} Inbox sent`,
          {
            duration: NOTIFICARTION_DURATION_TIMEOUT,
          }
        );
      } catch (e) {
        this.setProcessing(false);
        this.$toast.error(
          `An error occurred, when sending ${this.entity.title} Inbox hasn't been sent`,
          {
            duration: NOTIFICARTION_DURATION_TIMEOUT,
          }
        );
      }
    },
    async createCredential(data) {
      return await veridaHelper.createDIDJWT(data);
    },
  },
});
</script>

<style scoped>
.date-input {
  width: 100%;
}

.danger-text {
  color: red;
}
</style>

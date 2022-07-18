<template>
  <div>
    <!-- <Form @submit.prevent="onSubmit">
      <Field name="password" type="password" :rules="passwordRules" />
      <ErrorMessage name="password" />
      <button type="submit">Submit</button>
    </Form> -->
    <VeeForm v-slot="{ handleSubmit }" :validation-schema="schema" as="div">
      <form @submit="handleSubmit($event, onSubmit)">
        <!-- <div class="form-group">
          <label>Email</label>
          <div>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="danger-text" />
          </div>
          <label for="">Password</label>
          <div>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" />
          </div>
        </div> -->
        <div v-for="(item, key) in data" :key="key">
          <div class="form-group">
            <label>{{ attributes[key].title }}</label>
            <!-- <div v-if="attributes[key].enum">
              <div
                class="form-check form-check-inline"
                v-for="item in attributes[key].enum"
                :key="item"
              >
                <label class="form-check-label" :for="data[item]">
                  {{ item }}</label
                >
                <Field :name="key" type="radio" class="form-check-input" />
                <ErrorMessage :name="key" class="danger-text" />
              </div>
            </div> -->
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
                max="9999-12-31"
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
        <button type="submit">Submit</button>
      </form>
    </VeeForm>
    <!-- <form @submit.prevent="submit">
      <div v-for="(item, key) in data" :key="key">
        <div class="form-group">
          <label>{{ attributes[key].title }}</label>
          <div v-if="attributes[key].enum">
            <div
              class="form-check form-check-inline"
              v-for="item in attributes[key].enum"
              :key="item"
            >
              <input
                class="form-check-input"
                type="radio"
                :value="item"
                v-model="data[key]"
                :id="data[key]"
              />
              <label class="form-check-label" :for="data[item]">
                {{ item }}</label
              >
            </div>
          </div>
          <input
            v-else-if="
              attributes[key].format && attributes[key].format.includes('date')
            "
            type="date"
            v-model="data[key]"
            class="form-control"
            max="9999-12-31"
          />
          <div
            v-else-if="
              attributes[key].inputType === 'textarea' ||
              attributes[key].title === 'Message'
            "
          >
            <textarea
              class="form-control word-break"
              spellcheck="false"
              v-model="data[key]"
              :name="attributes[key].title"
              rows="3"
              required
            />
          </div>
          <div v-else>
            <input
              class="form-control"
              :type="attributes[key].type"
              v-model="data[key]"
              required
              :name="attributes[key].title"
            />
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Send</button>
    </form> -->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Form as VeeForm, Field, ErrorMessage, useField } from "vee-validate";
import * as yup from "yup";
import DateFormatMixin from "@/mixins/date-format";
import { extract } from "@/helpers/NameModifier";
import { createNamespacedHelpers } from "vuex";
import veridaHelper from "../../helpers/VeridaHelper";
import { DATA_SEND } from "@/constants/inbox";
const { mapState: mapSystemState, mapMutations: mapSystemMutations } =
  createNamespacedHelpers("system");

export default defineComponent({
  name: "SchemaFields",
  props: ["data", "attributes", "entity"],
  mixins: [DateFormatMixin],
  components: { VeeForm, Field, ErrorMessage },
  computed: {
    typed(str) {
      if (str === "string") return "text";
      if (str === "number") return "number";
      return "text";
    },
    ...mapSystemState(["recipient"]),
  },
  setup() {
    const { errorMessage, meta, value } = useField("fieldName");

    return { errorMessage };
  },
  mounted() {
    let schemaObject = {};
    console.log(this.attributes);
    for (const prop in this.attributes) {
      if (
        this.attributes[prop].format === "date" ||
        this.attributes[prop].format === "date-time"
      ) {
        console.log("is date", this.attributes[prop].type);
        const schema = {
          [prop]: yup.date().required(),
        };
        obj = {
          ...obj,
          ...schema,
        };
      } else if (this.attributes[prop].enum) {
        const schema = {
          [prop]: yup[this.attributes[prop].type]().required(),
        };
        obj = {
          ...obj,
          ...schema,
        };
      } else if (this.attributes[prop].format === "email") {
        const schema = {
          [prop]: yup[this.attributes[prop].type]().email().required(),
        };
        obj = {
          ...obj,
          ...schema,
        };
      } else {
        const schema = {
          [prop]: yup[this.attributes[prop].type]().required(),
        };
        obj = {
          ...obj,
          ...schema,
        };
      }
    }
    this.schema = yup.object(obj);
  },
  data() {
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    });
    return {
      passwordRules: yup.string().required().min(8),
      schema,
    };
  },
  watch: {
    errors(err) {
      console.log(err);
    },
    errorMessage(err) {
      console.log(err);
    },
  },
  methods: {
    ...mapSystemMutations(["setProcessing"]),
    onSubmit(values) {
      // Submit values to API...
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
    async submit() {
      if (
        this.attributes?.result?.title === "Result" &&
        this.data.result === ""
      ) {
        this.$toast.error(`Please choose result`, {
          duration: 3000,
        });
        return;
      }
      // if (!this.data.dateOfBirth) {
      //   this.$toast.error(`Please enter date of birth`, {
      //     duration: 3000,
      //   });
      //   return;
      // }
      const payload = {
        name: extract(this.data, this.entity.$id),
        ...this.data,
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
          duration: 3000,
        });
        this.setProcessing(false);
        return false;
      }

      const result = await store.get(saved.id);

      await this.sendInbox(result);
    },
    format(key, value) {
      this.data[key] =
        this.attributes[key].type === "number" ? Number(value) : value;
    },
    async sendInbox(message) {
      const text = `Sending you ${this.entity.title}`;

      console.log(text);
      console.log(message);

      try {
        await veridaHelper.sendInboxData({
          message: message,
          did: this.recipient,
          subject: text,
          type: DATA_SEND,
        });

        this.setProcessing(false);
        veridaHelper.did = this.recipient;
        this.$toast.success(
          `Created ${this.entity.title} is sent to ${this.recipient} Inbox sent`,
          {
            duration: 3000,
          }
        );
      } catch (e) {
        this.setProcessing(false);
        console.info(e);
        this.$toast.error(
          `An error occurred, when sending ${this.entity.title} Inbox hasn't been sent`,
          {
            duration: 3000,
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

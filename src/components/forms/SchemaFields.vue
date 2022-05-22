<template>
  <!-- <ValidationObserver ref="validator" mode="eager" v-slot="{ invalid }">
    <ValidationProvider
      v-slot="{ errors }"
      v-for="(item, key) in data"
      :key="key"
      :rules="{ required: attributes[key].required }"
      :name="attributes[key].title"
    >
      <label>{{ attributes[key].title }}</label>
      <div class="my-1" v-if="attributes[key].enum">
        <b-form-radio-group v-model="data[key]">
          <b-form-radio
            v-for="item in attributes[key].enum"
            :key="item"
            :value="item"
          >
            {{ item }}
          </b-form-radio>
        </b-form-radio-group>
      </div>
      <datetime
        v-else-if="
          attributes[key].format && attributes[key].format.includes('date')
        "
        :auto="true"
        :type="attributes[key].format.replace('-', '')"
        input-class="form-control"
        v-model="data[key]"
      />
      <b-form-textarea
        v-else-if="
          attributes[key].inputType === 'textarea' ||
          attributes[key].title === 'Message'
        "
        class="form-control word-break"
        spellcheck="false"
        v-model="data[key]"
        :name="attributes[key].title"
        :state="!data[key] ? null : !errors[0]"
        size="sm"
        rows="3"
      />
      <b-form-input
        v-else
        class="form-control"
        size="sm"
        :type="attributes[key].type"
        :value="data[key]"
        @input="(value) => format(key, value)"
        :name="attributes[key].title"
        :state="!data[key] ? null : !errors[0]"
      />
      <b-form-invalid-feedback>
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </ValidationProvider>
    <b-button @click="submit" :disabled="invalid" variant="primary">
      Send
    </b-button>
  </ValidationObserver> -->
  <form @submit.prevent="submit">
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
              :value="item"
              class="form-check-input"
              type="radio"
              v-model="data[key]"
            />
            <label class="form-check-label" for="inlineRadio1">
              {{ item }}</label
            >
          </div>
        </div>
        <date-picker
          v-else-if="
            attributes[key].format && attributes[key].format.includes('date')
          "
          :auto="true"
          :type="attributes[key].format.replace('-', '')"
          input-class="form-control"
          v-model="data[key]"
          :format="formatDateTime"
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
          />
        </div>
        <div v-else>
          <input
            class="form-control"
            :type="attributes[key].type"
            v-model="data[key]"
            :name="attributes[key].title"
          />
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Send</button>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import DateFormatMixin from "@/mixins/date-format";
import { extract } from "@/helpers/NameModifier";
import { createNamespacedHelpers } from "vuex";
import veridaHelper from "../../helpers/VeridaHelper";
const { mapState: mapSystemState, mapMutations: mapSystemMutations } =
  createNamespacedHelpers("system");

export default defineComponent({
  name: "SchemaFields",
  props: ["data", "attributes", "entity"],
  mixins: [DateFormatMixin],
  computed: {
    typed(str) {
      if (str === "string") return "text";
      if (str === "number") return "number";
      return "text";
    },
    ...mapSystemState(["recipient"]),
  },
  methods: {
    ...mapSystemMutations(["setProcessing"]),
    async submit() {
      if (this.data.dateOfBirth) {
        this.data.dateOfBirth = this.formatDateTime(this.data);
        const date = new Date(this.data.dateOfBirth);
        console.log(date);
      }

      console.log(this.data);
      const me = true;
      if (me) {
        return "hello";
      }
      const payload = {
        name: extract(this.data, this.entity.$id),
        ...this.data,
      };
      if (this.entity.properties.didJwtVc) {
        payload.didJwtVc = await this.createCredential(payload);
        payload.testTimestamp = new Date().toISOString();
      }

      const store = await veridaHelper.context.openDatastore(this.entity.$id);

      // validate schema

      const { isValid, errors } = await veridaHelper.validateSchema(
        payload,
        this.entity.$id
      );
      console.log(isValid, errors);
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
        console.error(store.errors);
        this.$toast.success(
          `An error occurred, when saving ${this.entity.title}. See console.`,
          {
            duration: 3000,
          }
        );

        this.setProcessing(false);
        return false;
      }

      const result = await store.get(saved.id);

      await this.sendInbox(result, payload.name);
    },
    format(key, value) {
      this.data[key] =
        this.attributes[key].type === "number" ? Number(value) : value;
    },
    async sendInbox(message, name) {
      const text = `Sending you ${this.entity.title} called "${name}"`;

      try {
        await veridaHelper.sendInbox({
          message: message,
          did: this.recipient,
          subject: text,
        });

        // this.$emit("reset");
        this.setProcessing(false);
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

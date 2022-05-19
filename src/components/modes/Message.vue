<template>
  <b-card class="mt-3">
    <h4 class="my-2">Generic Message</h4>
    <form @submit.prevent="submit">
      <div class="my-2">
        <label>Subject</label>
        <input required class="form-control my-1" size="sm" v-model="title" />
      </div>
      <div class="my-2">
        <label>Message</label>
        <textarea
          class="form-control my-1 word-break"
          v-model="message"
          size="sm"
          required
          rows="3"
        />
      </div>

      <b-button
        class="my-3"
        type="submit"
        :disabled="processing"
        variant="primary"
      >
        Send
      </b-button>
    </form>
    <div v-if="processing" class="card-shadow">
      <circle-loader color="#2263c3" :size="100" class="card-spinner" />
    </div>
  </b-card>
</template>

<script>
import { extract } from "@/helpers/NameModifier";
import { CircleLoader } from "@saeris/vue-spinners";

import { createNamespacedHelpers } from "vuex";
import veridaHelper from "../../helpers/VeridaHelper";
const { mapState: mapSystemState, mapMutations: mapSystemMutations } =
  createNamespacedHelpers("system");
const coreMessageSchema =
  "https://core.schemas.verida.io/inbox/type/message/v0.1.0/schema.json";
export default {
  name: "Message",
  data() {
    return {
      title: "",
      message: "",
      entity: {},
      schema: coreMessageSchema,
    };
  },
  components: {
    CircleLoader,
  },
  computed: {
    ...mapSystemState(["recipient", "processing"]),
  },
  async beforeMount() {
    this.entity = await veridaHelper.retrieveSchema(this.schema);
  },
  methods: {
    ...mapSystemMutations(["setProcessing"]),
    async submit() {
      const form = {
        subject: this.title,
        message: this.message,
      };

      const payload = {
        name: extract(form, this.schema),
        schema: this.schema,
        ...form,
      };
      this.setProcessing(true);
      await this.sendInbox(payload, payload.name);
    },

    async sendInbox(message, name) {
      const text = `Sending you ${this.entity.title} called "${name}"`;

      try {
        await veridaHelper.sendInboxMessage({
          message: message,
          did: this.recipient,
          subject: text,
        });

        this.setProcessing(false);

        this.$bvToast.toast(
          `Created ${this.entity.title} is sent to ${this.recipient}`,
          {
            title: "Inbox sent",
            autoHideDelay: 3000,
            variant: "success",
          }
        );
      } catch (e) {
        this.setProcessing(false);
        console.info(e);
        this.$bvToast.toast(
          `An error occurred, when sending ${this.entity.title}`,
          {
            title: "Inbox hasn't been sent",
            autoHideDelay: 3000,
            variant: "danger",
          }
        );
      }
    },
  },
};
</script>

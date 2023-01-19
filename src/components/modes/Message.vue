<template>
  <div class="card mt-3 p-3 d-flex justify-content-center">
    <h4 class="my-2">Generic Message</h4>
    <form @submit.prevent="submit">
      <div class="my-2">
        <label>Subject</label>
        <input required class="form-control my-1" v-model="title" />
      </div>
      <div class="my-2">
        <label>Message</label>
        <textarea
          class="form-control my-1 word-break"
          v-model="message"
          required
          rows="3"
        />
      </div>

      <button class="my-3 btn btn-primary" type="submit" :disabled="processing">
        Send
      </button>
    </form>
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
import { extract } from "@/helpers/NameModifier";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { createNamespacedHelpers } from "vuex";
import veridaHelper from "@/helpers/VeridaHelper";
import { NOTIFICARTION_DURATION_TIMEOUT, veridaMessagingTypes } from "@/constants";
const { mapState: mapSystemState, mapMutations: mapSystemMutations } =
  createNamespacedHelpers("system");
const coreMessageSchema =
  "https://core.schemas.verida.io/inbox/type/message/v0.1.0/schema.json";
export default defineComponent({
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
    PulseLoader,
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
      await this.sendMessage(payload, payload.name);
    },

    async sendMessage(message, name) {
      const messageSubject = `Sending you ${this.entity.title} called "${name}"`;

      try {
        await veridaHelper.messaging({
          data: message,
          did: this.recipient,
          subject: messageSubject,
          type: veridaMessagingTypes.messaging,
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
  },
});
</script>

<template>
  <b-card>
    <b-card-text>
      <b-form-textarea
        v-model="did"
        placeholder="Please, Enter the User DID"
        spellcheck="false"
        size="sm"
        rows="1"
        no-resize
        aria-describedby="did-error"
      />
      <b-form-invalid-feedback id="did-error">
        <!-- {{ errors[0] }} -->
      </b-form-invalid-feedback>
      <b-row align-h="center">
        <b-col sm="auto">
          <b-button variant="primary" class="mr-3" @click="() => click('send')">
            Send Data
          </b-button>
          <b-button
            variant="secondary"
            class="mr-3"
            @click="() => click('message')"
          >
            Send Message
          </b-button>
          <b-button variant="success" @click="() => click('request')">
            Request Data
          </b-button>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
import { defineComponent } from "vue";
import { createNamespacedHelpers } from "vuex";
import veridaHelper from "../../helpers/VeridaHelper";
const { mapState: mapSystemState, mapMutations: mapSystemMutations } =
  createNamespacedHelpers("system");

export default defineComponent({
  name: "DidCard",
  data() {
    return {
      did: null,
    };
  },
  computed: {
    ...mapSystemState(["recipient"]),
  },
  beforeMount() {
    this.did = veridaHelper.did;
  },
  methods: {
    ...mapSystemMutations(["initRecipient"]),
    click(mode) {
      this.initRecipient(this.did);
      this.$router.push({
        name: "dashboard",
        params: { mode },
      });
    },
  },
});
</script>

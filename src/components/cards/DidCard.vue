<template>
  <div class="d-flex justify-content-center">
    <div>
      <textarea
        v-model="did"
        placeholder="Please, Enter the User DID"
        spellcheck="false"
        class="form-control"
        aria-describedby="did-error"
        rows="3"
      ></textarea>
      <p class="text-danger mt-2" id="did-error" role="alert">
        {{ !did ? "No Did" : "" }}
      </p>
      <div class="">
        <div class="m-1">
          <button
            style="width: 100%"
            class="btn btn-primary"
            @click="() => click('send')"
          >
            Send Data
          </button>
        </div>
        <div class="m-1">
          <button
            style="width: 100%"
            class="btn btn-secondary"
            @click="() => click('message')"
          >
            Send Message
          </button>
        </div>
        <div class="m-1">
          <button
            style="width: 100%"
            class="btn btn-success"
            @click="() => click('request')"
          >
            Request Data
          </button>
        </div>
      </div>
    </div>
  </div>
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

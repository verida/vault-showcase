<template>
  <b-card>
    <b-card-text>
      <ValidationObserver ref="validator" mode="eager" v-slot="{ invalid }">
        <ValidationProvider v-slot="{ errors }" rules="required|did" name="User DID">
          <b-form-textarea
            v-model="did"
            placeholder="Please, Enter the User DID"
            spellcheck="false"
            size="sm" rows="1" no-resize
            aria-describedby="did-error" />
          <b-form-invalid-feedback id="did-error">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </ValidationProvider>
        <b-row align-h="around" class="mt-3">
          <b-button variant="primary" :disabled="invalid"
            @click="() => click('send')">
            Send Data
          </b-button>
          <b-button variant="success" :disabled="invalid"
            @click="() => click('request')">
            Request Data
          </b-button>
        </b-row>
      </ValidationObserver>
    </b-card-text>
  </b-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations: mapSystemMutations } = createNamespacedHelpers('system')

export default {
  name: 'DidCard',
  data () {
    return {
      did: null
    }
  },
  beforeMount () {
    this.did = 'did:ethr:0xBFC6D08958617B25fD8a49a83721674744334091'
    this.initRecipient(this.did)
  },
  methods: {
    ...mapSystemMutations([
      'initRecipient'
    ]),
    click (mode) {
      this.initRecipient(this.did)
      this.$router.push({
        name: 'dashboard',
        params: { mode }
      })
    }
  }
}
</script>

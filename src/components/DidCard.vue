<template>
  <b-card class="did-card">
    <b-card-text>
      <b-form-input v-model="did" placeholder="Enter DID" />
      <b-row align-h="around" class="mt-3">
        <b-button href="#" variant="primary" @click="() => click('send')">
          Send Data
        </b-button>
        <b-button href="#" variant="success" @click="() => click('request')">
          Request Data
        </b-button>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: 'DidCard',
  data () {
    return {
      did: null
    }
  },
  methods: {
    click (mode) {
      this.$router.push({
        name: 'dashboard',
        params: { mode }
      })
    }
  }
}
</script>

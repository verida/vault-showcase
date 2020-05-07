<template>
  <div>
    <b-card class="mt-4">
      <div v-if="processing" class="card-shadow">
        <CircleLoader color="#2263c3" :size="100" class="card-spinner"/>
      </div>
      <DataTypeSelect @change="select"/>
      <b-form-radio-group class="mt-3" :disabled="processing">
        <b-form-radio v-model="params.userSelect" :value="false">
          All data
        </b-form-radio>
        <b-form-radio v-model="params.userSelect" :value="true">
          User select data
        </b-form-radio>
      </b-form-radio-group>
      <b-button variant="success" @click="request" class="mt-3">
        Request
      </b-button>
    </b-card>
    <b-card v-if="received"></b-card>
  </div>
</template>

<script>
// import Verida from '@verida/datastore/src/app'
import DataTypeSelect from './DataTypeSelect'
import { CircleLoader } from '@saeris/vue-spinners'

export default {
  name: 'Send',
  components: {
    DataTypeSelect,
    CircleLoader
  },
  data () {
    return {
      entity: null,
      params: {
        schema: null,
        userSelect: null
      },
      processing: false,
      received: null
    }
  },
  methods: {
    select ({ schema, text }) {
      this.entity = text
      this.params.requestSchema = schema
    },
    request () {
      this.processing = true

      const did = 'did:ethr:0x33b92b41b775Ce6ebc0C8bcBdEf19B1e1d8bFd82'
      const { outbox } = window.veridaApp
      const message = `The ${this.entity} records have been requested by Generic Demo App`
      const data = {
        subject: 'Generic Demo Request',
        ...this.params
      }

      outbox.send(did, 'inbox/type/dataRequest', data, message, {})
    }
  }
}
</script>

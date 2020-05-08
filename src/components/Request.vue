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
    <b-table class="records mt-4"
      responsive
      striped
      hover
      :items="records" />
  </div>
</template>

<script>
// import Verida from '@verida/datastore/src/app'
import { schemas } from '@/config/map'
import DataTypeSelect from './DataTypeSelect'
import { CircleLoader } from '@saeris/vue-spinners'

import { createNamespacedHelpers } from 'vuex'
import { DATA_REQUEST } from '../constants/inbox'
const {
  mapState: mapSystemState,
  mapMutations: mapSystemMutations
} = createNamespacedHelpers('system')

export default {
  name: 'Send',
  components: {
    DataTypeSelect,
    CircleLoader
  },
  data () {
    return {
      entity: null,
      properties: null,
      records: null,
      params: {
        requestSchema: null,
        userSelect: null
      }
    }
  },
  computed: {
    ...mapSystemState([
      'recipient',
      'list',
      'processing'
    ])
  },
  methods: {
    ...mapSystemMutations([
      'setProcessing'
    ]),
    select ({ schema, text, properties }) {
      this.records = null
      this.entity = text
      this.properties = properties
      this.params.requestSchema = schema
    },
    request () {
      this.setProcessing(true)

      const { outbox } = window.veridaApp
      const message = `The ${this.entity} records have been requested by Generic Demo App`
      const data = {
        subject: 'Generic Demo Request',
        ...this.params
      }

      outbox.send(this.recipient, DATA_REQUEST, data, message, {})
    }
  },
  watch: {
    list () {
      if (this.list) {
        const keys = schemas[this.params.requestSchema].view
        this.records = this.list.map(obj => _.pick(obj, keys))
      }
    }
  }
}
</script>

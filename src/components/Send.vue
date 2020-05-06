<template>
  <b-card>
    <DataTypeSelect @change="change"/>
    <b-form-radio-group>
      <b-form-radio v-model="records" :value="false">
        All data
      </b-form-radio>
      <b-form-radio v-model="records" :value="true">
        User select data
      </b-form-radio>
    </b-form-radio-group>
    <b-button variant="success">Request</b-button>
  </b-card>
</template>

<script>
// import Verida from '@verida/datastore/src/app'
import DataTypeSelect from './DataTypeSelect'

export default {
  name: 'Send',
  components: { DataTypeSelect },
  data () {
    return {
      records: null
    }
  },
  methods: {
    change (path) {
      // const schema = Verida.getSchema(path, true)
    }
  }
}
</script>

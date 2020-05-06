<template>
  <div>
    <label>Type of data</label>
    <b-form-select
      v-model="selected"
      :options="options"
      @change="value => $emit('change', value)"/>
  </div>
</template>

<script>
import Verida from '@verida/datastore/src/app'
import { SCHEMAS } from '../config/schemas'

export default {
  name: 'DataTypeSelect',
  props: [
    'emitted'
  ],
  data () {
    return {
      selected: null,
      options: null
    }
  },
  async beforeMount () {
    await this.init()
  },
  methods: {
    async init () {
      this.options = []

      for (const i in SCHEMAS) {
        const schema = await Verida.getSchema(SCHEMAS[i], true)
        this.options.push({
          text: schema.title,
          value: SCHEMAS[i]
        })
      }
    }
  }
}
</script>

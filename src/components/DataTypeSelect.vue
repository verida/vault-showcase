<template>
  <div>
    <label>Type of data</label>
    <b-form-select
      v-model="selected"
      @change="obj => $emit('change', obj)">
      <option v-for="(option, idx) in options" :key="idx" :value="option">
        {{ option.text }}
      </option>
    </b-form-select>
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
        const document = await Verida.getSchema(SCHEMAS[i], true)
        this.options.push({
          text: document.title,
          path: SCHEMAS[i],
          schema: document.name.replace('/basic', ''),
          properties: document.properties
        })
      }
    }
  }
}
</script>

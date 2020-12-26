<template>
  <div>
    <label>Type of data to {{mode}}</label>
    <b-form-select
      v-model="selected"
      @change="obj => $emit('change', obj)">
      <option v-for="(option, idx) in options" :key="idx" :value="option">
        {{ option.schema.title }}
      </option>
    </b-form-select>
  </div>
</template>

<script>
import { getVerida } from '../../helpers/VeridaTransmitter'
import { SCHEMAS } from '../../config/schemas'

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
  computed: {
    mode () {
      return this.$route.params.mode
    }
  },
  methods: {
    async init () {
      this.options = []
      const verida = getVerida()

      for (const i in SCHEMAS) {
        const document = await verida.getSchema(SCHEMAS[i], true)
        this.options.push({
          schema: document
        })
      }
    }
  }
}
</script>

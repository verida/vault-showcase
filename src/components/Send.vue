<template>
  <div>
    <b-card class="mt-4">
      <DataTypeSelect @change="select"/>
      <div v-if="entity" class="mt-4">
        <hr />
        <SchemaFields
          ref="schema-fields"
          :entity="entity"
          :data="data"
          :attributes="attributes" />
      </div>
    </b-card>
  </div>
</template>

<script>
import { schemas } from '@/config/map'
import DataTypeSelect from './DataTypeSelect'
import SchemaFields from './SchemaFields'

export default {
  name: 'Request',
  components: {
    SchemaFields,
    DataTypeSelect
  },
  data () {
    return {
      entity: null,
      processing: false,
      data: {},
      attributes: {}
    }
  },
  methods: {
    async select ({ text, path, schema, properties }) {
      this.entity = { schema, title: text, path }

      this.data = {}
      this.attributes = {}

      schemas[schema].forEach(key => {
        this.$set(this.data, key)
        this.$set(this.attributes, key, properties[key])
      })

      await this.$nextTick()
      this.$refs['schema-fields'].$refs.validator.reset()
    }
  }
}
</script>

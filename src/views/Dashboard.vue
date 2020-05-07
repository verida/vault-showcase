<template>
  <b-container>
    <b-row>
      <b-col sm="12" md="8">
        <component :is="mode" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Send from '../components/Send'
import Request from '../components/Request'

export default {
  name: 'Dashboard',
  components: {
    Send,
    Request
  },
  computed: {
    mode () {
      const { mode } = this.$route.params
      return mode
    }
  }
}
</script>

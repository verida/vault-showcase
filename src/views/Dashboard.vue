<template>
  <component :is="mode" />
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

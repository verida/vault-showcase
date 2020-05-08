<template>
  <component :is="mode" />
</template>

<script>
import Send from '../components/modes/Send'
import Request from '../components/modes/Request'

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

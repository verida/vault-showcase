<template>
  <div>
    <router-link to="/" class="small"> &#60; Back </router-link>
    <component :is="mode" />
  </div>
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

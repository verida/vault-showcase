<template>
  <div>
    <video autoplay muted class="landing" loop>
      <source src="@/assets/video/landing.mp4" type="video/mp4">
    </video>
    <button class="landing__btn" @click="connect" :disabled="processing">
      <img src="@/assets/img/verida-logo.svg" v-if="!processing"/>
      <CircleLoader color="#fff" :size="100" v-else />
    </button>
  </div>
</template>

<script>
import { CircleLoader } from '@saeris/vue-spinners'
import { bind, connectVerida, logout } from '@/helpers/VeridaTransmitter'

export default {
  name: 'Landing',
  components: {
    CircleLoader
  },
  data () {
    return {
      processing: false
    }
  },
  methods: {
    async connect () {
      const login = () => this.$router.push({ name: 'home' })
      await bind(login, logout)
      this.processing = true
      await connectVerida(true, () => { this.processing = false })
    }
  }
}
</script>

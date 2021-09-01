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

import { createNamespacedHelpers } from 'vuex'
import { CircleLoader } from '@saeris/vue-spinners'
import { connectVerida, getAddress } from '@/helpers/VeridaTransmitter'

const {
  mapMutations: mapSystemMutations
} = createNamespacedHelpers('system')

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
    ...mapSystemMutations([
      'initUser'
    ]),
    connect () {
      const login = () => {
        this.loadUser()
        this.processing = false
        this.$router.push({ name: 'home' })
      }
      this.processing = true
      connectVerida(login)
    },
    async loadUser () {
      const address = await getAddress()
      const name = await window.profileManager.get('name')
      this.initUser({ address, name })
    },
    onClose (event) {
      const modal = document.getElementById('verida-modal')
      const closeModal = document.getElementById('verida-modal-close')

      if ((event.target === modal && modal !== null) ||
      (event.target === closeModal && closeModal !== null)) {
        this.processing = false
        modal.style.display = 'none'
      }
    }

  },
  created () {
    window.addEventListener('click', this.onClose)
  },
  destroyed () {
    window.removeEventListener('click', this.onClose)
  }

}
</script>

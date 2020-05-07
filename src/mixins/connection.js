import {
  connectVerida,
  bind,
  bindInbox,
  getAddress,
  logout
} from '@/helpers/VeridaTransmitter'

import { createNamespacedHelpers } from 'vuex'
const { mapMutations: mapSystemMutations } = createNamespacedHelpers('system')

export default {
  methods: {
    ...mapSystemMutations([
      'initUser'
    ]),
    async init () {
      await bind(this.connect, this.disconnect)
      await connectVerida()
      await this.loadUser()
    },
    async disconnect () {
      await logout()
      await this.$router.push({ name: 'connect' })
    },
    async loadUser () {
      const address = await getAddress()
      const name = await window.profileManager.get('name')

      this.initUser({ address, name })
    },
    connect () {
      bindInbox(this.handleInbox)
    },
    handleInbox () {

    }
  },
  async beforeMount () {
    await this.init()
  }
}

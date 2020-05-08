import {
  connectVerida,
  bind,
  bindInbox,
  getAddress,
  logout
} from '@/helpers/VeridaTransmitter'

import { createNamespacedHelpers } from 'vuex'
import { DATA_SEND } from '../constants/inbox'
const { mapMutations: mapSystemMutations } = createNamespacedHelpers('system')

export default {
  methods: {
    ...mapSystemMutations([
      'initUser',
      'setList',
      'setProcessing'
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
    async handleInbox (msg) {
      const { data, type } = msg
      if (type === DATA_SEND) {
        this.setProcessing(false)
        this.setList(data.data[0])
      }
    }
  },
  async beforeMount () {
    await this.init()
  }
}

import {
  connectVerida,
  bind,
  bindInbox,
  getAddress,
  logout
} from '@/helpers/VeridaTransmitter'

import { createNamespacedHelpers } from 'vuex'
import { DATA_SEND } from '../constants/inbox'
const {
  mapState: mapSystemState,
  mapMutations: mapSystemMutations
} = createNamespacedHelpers('system')

export default {
  computed: {
    ...mapSystemState([
      'processing'
    ])
  },
  methods: {
    ...mapSystemMutations([
      'initUser',
      'setList',
      'setProcessing',
      'initRecipient',
      'setReconnecting'
    ]),
    async init () {
      this.setReconnecting(true)
      await bind(this.connect, this.disconnect)
      await connectVerida(this.loadUser)
    },
    async disconnect () {
      this.initRecipient(null)
      await logout()
      await this.$router.push({ name: 'connect' })
    },
    async loadUser () {
      const address = await getAddress()
      const name = await window.profileManager.get('name')
      this.initUser({ address, name })
      this.setReconnecting(false)
    },
    connect () {
      bindInbox(this.handleInbox)
    },
    async handleInbox (msg) {
      const { data, type } = msg
      if (type === DATA_SEND && this.processing) {
        const { data: records } = data
        const response = _.isArray(records[0]) ? records[0] : records
        this.setProcessing(false)
        this.setList(response)
      }
    }
  },
  async beforeMount () {
    // await this.init()
  }
}

import {
  bindInbox,
} from '@/helpers/VeridaTransmitter'
import { createNamespacedHelpers } from 'vuex'
import { DATA_SEND } from '../constants/inbox'
import store from 'store'
import VeridaHelper from '../helpers/VeridaHelper'
import veridaHelper from '../helpers/VeridaHelper'

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
    async init() {
      this.setReconnecting(true)
      try {
        await VeridaHelper.connectVault();
        const profile = VeridaHelper.profile;
        this.initUser({ address: VeridaHelper.did, name: profile.name });
      } catch (error) {
        this.error = error;
      } finally {
        this.setReconnecting(false)
      }
    },
    async disconnect() {
      this.initRecipient(null)
      await VeridaHelper.logout()
      this.$router.push({ name: 'connect' })
    },
    connect() {
      bindInbox(this.handleInbox)
    },
    async handleInbox(msg) {
      const { data, type } = msg
      if (type === DATA_SEND) {
        const { data: records } = data
        const response = _.isArray(records[0]) ? records[0] : records
        this.setProcessing(false)
        this.setList(response)
      }
    }
  },
  async beforeMount() {
    const activePath = this.$router.currentRoute.path
    const userLoginSession = VeridaHelper.hasSession();
    if (activePath !== '/connect') {
      if (userLoginSession) {
        await this.init()
      }
    }
  },
  created() {
    veridaHelper.on("messageNotification", (inbox) => {
      const { data, type } = inbox
      if (type === DATA_SEND) {
        const { data: records } = data
        const response = _.isArray(records[0]) ? records[0] : records
        this.setProcessing(false)
        this.setList(response)
      }
      this.$bvToast.toast(`New message`, {
        title: "Inbox sent",
        autoHideDelay: 3000,
        variant: "success",
      });
    });
  },
}

<template>
    <b-navbar toggleable="lg" type="dark" class="navbar-demo">
        <b-navbar-brand href='/'>
          <img src="@/assets/img/verida-logo-title.svg" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id='nav-collapse' is-nav>
          <b-navbar-nav v-if="recipient">
            <b-nav-item
              v-for="item in buttons"
              :disabled="processing"
              :key="item.title" @click="item.click">
              {{ item.title }}
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <b-button variant="primary" @click="disconnect">
                Disconnect
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { logout } from '@/helpers/VeridaTransmitter'
import { createNamespacedHelpers } from 'vuex'
const {
  mapState: mapSystemState,
  mapMutations: mapSystemMutation
} = createNamespacedHelpers('system')

export default {
  name: 'Navbar',
  data () {
    return {
      buttons: [
        {
          title: 'User DID',
          click: () => {
            this.initRecipient(null)
            this.$router.push('/')
          }
        },
        {
          title: 'Request Data',
          click: () => this.go('request')
        },
        {
          title: 'Send Data',
          click: () => this.go('send')
        }
      ]
    }
  },
  computed: {
    ...mapSystemState([
      'processing',
      'recipient'
    ])
  },
  methods: {
    ...mapSystemMutation([
      'initRecipient'
    ]),
    go (mode) {
      this.$router.push({
        name: 'dashboard',
        params: { mode }
      })
    },
    async disconnect () {
      this.initRecipient(null)
      await logout()
      await this.$router.push({ name: 'connect' })
    }
  }
}
</script>

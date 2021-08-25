<template>
    <b-navbar toggleable="lg" type="dark" class="navbar-demo">
      <b-navbar-brand href='/'>
        <img src="@/assets/img/verida-logo-title.svg" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id='nav-collapse' is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item active>
            <did-statistics v-if="user"
              :img="true" :title="user.name"
              :text="`${user.address}`" />
            <div v-else>
              <BarLoader class="loader" color="#fff" :width="100" :height="4" />
            </div>
          </b-nav-item>
          <b-nav-item>
            <b-button v-if="user" variant="primary" @click="disconnect">
              Disconnect
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
import { BarLoader } from '@saeris/vue-spinners'
import DidStatistics from '../cards/DidStatistics'
import { logout } from '@/helpers/VeridaTransmitter'
import { createNamespacedHelpers } from 'vuex'
const {
  mapState: mapSystemState,
  mapMutations: mapSystemMutation
} = createNamespacedHelpers('system')

export default {
  name: 'Navbar',
  components: {
    DidStatistics,
    BarLoader
  },
  computed: {
    ...mapSystemState([
      'processing',
      'user'
    ])
  },
  methods: {
    ...mapSystemMutation([
      'initRecipient',
      'initUser'
    ]),
    go (mode) {
      this.$router.push({
        name: 'dashboard',
        params: { mode }
      })
    },
    async disconnect () {
      this.initRecipient(null)
      this.initUser(null)
      const redirect = () => {
        this.$router.push({ name: 'connect' })
      }
      await logout(redirect)
    }
  }
}
</script>

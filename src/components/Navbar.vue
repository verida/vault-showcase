<template>
    <b-navbar toggleable="lg" type="dark" class="navbar-demo">
        <b-navbar-brand href='/'>
            <img src="@/assets/img/verida-logo-title.svg" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id='nav-collapse' is-nav>
            <b-navbar-nav>
                <b-nav-item v-for="item in buttons"
                            :key="item.title" @click="item.click">
                    {{ item.title }}
                </b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item active>

                </b-nav-item>
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
const { mapState: mapSystemState } = createNamespacedHelpers('system')

export default {
  name: 'Navbar',
  methods: {
    async disconnect () {
      await logout()
      await this.$router.push({ name: 'connect' })
    }
  },
  computed: {
    ...mapSystemState([
      'buttons',
      'user',
      'spinner'
    ])
  }
}
</script>

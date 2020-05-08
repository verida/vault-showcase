<template>
  <div id="app" class="main-layout">
    <navbar />
    <b-container>
      <b-row align-h="center">
        <div class="dashboard-card">
          <router-view/>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import ConnectionMixin from '@/mixins/connection'

export default {
  name: 'App',
  mixins: [
    ConnectionMixin
  ],
  components: {
    Navbar
  }
}
</script>

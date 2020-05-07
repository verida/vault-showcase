<template>
  <div id="app" class="main-layout">
    <navbar />
    <b-container>
      <b-row>
        <b-col sm="12" md="8">
          <router-view/>
        </b-col>
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

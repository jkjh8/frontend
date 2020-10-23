<template>
  <v-app>
    <AppBar></AppBar>

    <v-main>
      <router-view class="pb-10 mb-12 px-6" align="center"></router-view>
    </v-main>

    <Footer></Footer>
  </v-app>
</template>

<script>
import AppBar from './components/Appbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  created () {
    this.$http.get('/playlistrefresh')
    this.$store.dispatch('getFileList')
    this.$store.dispatch('getPlayerSetup')
    this.$store.dispatch('getPlayList')
  },
  components: {
    AppBar,
    Footer
  },

  data: () => ({
    //
  })
}
</script>

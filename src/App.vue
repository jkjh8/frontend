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
    //
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

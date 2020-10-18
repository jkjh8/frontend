<template>
  <v-app>
    <AppBar></AppBar>

    <v-main>
      <router-view class="pb-10 mb-12 px-6"></router-view>
    </v-main>

    <Footer></Footer>
  </v-app>
</template>

<script>
import AppBar from './components/Appbar'
import Footer from './components/Footer'

export default {
  name: 'App',

  components: {
    AppBar,
    Footer
  },

  data: () => ({
    //
  })
}
</script>

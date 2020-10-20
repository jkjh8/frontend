<template>
  <v-container>
    {{ playerSetup }}
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
    //
  },
  created () {
    this.$store.dispatch('getPlayerSetup')
  },
  computed: {
    ...mapState(['playerSetup'])
  },
  data () {
    return {
      //
    }
  }
}
</script>

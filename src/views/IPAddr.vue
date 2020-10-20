<template>
  <v-container>
    <v-card class="ps=12" max-width="400" align="right">
      <v-card-title class="grey lighten-4">IP ADDRESS SETUP
        <v-spacer/>
        <v-switch v-model="dhcp" label="DHCP" hide-details></v-switch>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        {{ playerSetup }}
        <InputIpAddr :dhcp="dhcp"></InputIpAddr>
        <InputServerAddr></InputServerAddr>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import InputIpAddr from '../components/InputIpAddr'
import InputServerAddr from '../components/InputServerAddr'

export default {
  components: {
    InputIpAddr, InputServerAddr
  },
  mounted () {
    this.$store.dispatch('getPlayerSetup')
    this.dhcp = this.playerSetup.dhcp
  },
  computed: {
    ...mapState(['playerSetup'])
  },
  data () {
    return {
      dhcp: false
    }
  }
}
</script>

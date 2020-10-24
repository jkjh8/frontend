<template>
  <v-container>
    <v-card class="ps=12" max-width="400" align="right">
      <v-card-title class="grey lighten-4">IP ADDRESS SETUP
        <v-spacer/>
        <v-switch v-model="dhcp" label="DHCP" @change ="dhcpChange($event)" hide-details></v-switch>
      </v-card-title>
      <v-divider/>
      <v-card-text>
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
    this.$socket.on('playlist', (data) => { this.$store.commit('updatePlayList', data) })
    this.$socket.on('filelist', (data) => { this.$store.commit('updateFileList', data) })
    this.$socket.on('setup', (data) => { this.$store.commit('updatePlayerSetup', data) })
    this.$socket.emit('playlist')
    this.$socket.emit('filelist')
    this.$socket.emit('setup')
  },
  watch: {
    playerSetup () {
      this.dhcp = this.playerSetup.dhcp
    }
  },
  computed: {
    ...mapState(['playerSetup'])
  },
  data () {
    return {
      dhcp: false
    }
  },
  methods: {
    dhcpChange (value) {
      this.playerSetup.dhcp = value
      this.$http.post('/setup', this.playerSetup)
    }
  },
  beforeDestroy () {
    this.$store.dispatch('getPlayerSetup')
  }
}
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title class="grey lighten-4">PLAYER SETUP</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item>
            LOOP ONE
            <v-spacer/>
            <v-switch v-model="loop_one" @change="setupChange('loop_one', $event)"></v-switch>
          </v-list-item>
          <v-list-item>
            LOOP ALL
            <v-spacer/>
            <v-switch v-model="loop" @change="setupChange('loop', $event)"></v-switch>
          </v-list-item>
          <v-list-item>
            FULL SCREEN
            <v-spacer/>
            <v-switch v-model="fullscreen" @change="setupChange('fullscreen', $event)"></v-switch>
          </v-list-item>
          <v-list-item>
            DURATION TIME
            <v-spacer/>
            <v-switch v-model="progress" @change="setupChange('progress', $event)"></v-switch>
          </v-list-item>
          <v-list-item>
            CLOSE AT END OF PLAY
            <v-spacer/>
            <v-switch v-model="endclose" @change="setupChange('endclose', $event)"></v-switch>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
    //
  },
  created () {
    this.loop_one = this.playerSetup.loop_one
    this.loop = this.playerSetup.loop
    this.fullscreen = this.playerSetup.fullscreen
    this.progress = this.playerSetup.progress
    this.endclose = this.playerSetup.endclose
  },
  computed: {
    ...mapState(['playerSetup'])
  },
  data () {
    return {
      loop_one: false,
      loop: false,
      fullscreen: false,
      progress: false,
      endclose: false
    }
  },
  methods: {
    async setupChange (id, value) {
      if (value !== true) { value = false }
      this.playerSetup[id] = value
      await this.$http.post('/setSetup', this.playerSetup)
      this.$store.dispatch('getPlayerSetup')
    }
  }
}
</script>

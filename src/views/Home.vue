<template>
  <v-container>
    <v-card>
      <v-card-title>
        PLAY LIST
        <v-spacer/>
        <v-btn @click="openDialog">
          ADD
        </v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <draggable v-model="playList">
          <v-list-item v-for="(item, i) in playList" :key="i">
            <v-list-item-avatar :color="ramdomColor()" size="30px">
              <span>{{ i+1 }}</span>
            </v-list-item-avatar>
            {{ item }}
            <v-btn color="green darken-4" icon>
              <v-icon>mdi-play</v-icon>
            </v-btn>
            <v-btn color="blue-grey darken-4" icon>
              <v-icon>mdi-stop</v-icon>
            </v-btn>
            <v-btn  color="red darken-4" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item>
        </draggable>
      </v-card-text>
    </v-card>
    <addPlayList v-on:offDialog="closeDialog" :onDialog="this.dialog"></addPlayList>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import http from '../api/http'
import addPlayList from '../components/AddPlayList'
import draggable from 'vuedraggable'

export default {
  name: 'Home',
  components: {
    draggable,
    addPlayList
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapState(['playList', 'fileList']),
    playList: {
      get () {
        return this.$store.state.playList
      },
      set (value) {
        this.$store.commit('updatePlayList', value)
        http.post('/setPlayList', { playList: value })
      }
    }
  },
  created () {
    this.$store.dispatch('getFileList')
    this.getPlayList()
  },
  methods: {
    ramdomColor () {
      return ('#' + Math.random().toString(16).slice(2, 8))
    },
    getPlayList () {
      http.get('/getPlayList').then(res => {
        this.$store.commit('updatePlayList', res.data)
        console.log(res.data)
      })
    },
    openDialog () {
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
    }
  }
}
</script>

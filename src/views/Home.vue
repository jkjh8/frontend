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
            <v-spacer/>
            <v-btn color="green darken-4" icon>
              <v-icon>mdi-play</v-icon>
            </v-btn>
            <v-btn color="blue-grey darken-4" icon>
              <v-icon>mdi-stop</v-icon>
            </v-btn>
            <v-btn  color="red darken-4" icon @click="delPlayListItem(i)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item>
        </draggable>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="800px" persistent scrollable>
      <v-card>
        <v-card-title>
          <h3>ADD FILES</h3>
        </v-card-title>
        <v-card-text>
          <v-list-item-group v-model="checkList" multiple active-class="">
            <v-list-item v-for="(item, i) in fileList" :key="i">
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active"></v-checkbox>
                </v-list-item-action>
                {{ item }}
                <v-spacer/>
                <v-btn color="green darken-4" icon @click="player('file','play',i)">
                  <v-icon>mdi-play</v-icon>
                </v-btn>
                <v-btn color="blue-grey darken-4" icon @click="player('file','stop',i)">
                  <v-icon>mdi-stop</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="playListAddFile">
            <v-icon>mdi-check</v-icon>
            OK
          </v-btn>
          <v-btn text class="pa-3" @click="cancelPlayListAddFile">
            <v-icon>mdi-cancel</v-icon>
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import http from '../api/http'
import draggable from 'vuedraggable'

export default {
  name: 'Home',
  components: {
    draggable
  },
  data () {
    return {
      dialog: false,
      checkList: []
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
    async delPlayListItem (id) {
      console.log(id)
      await this.$store.commit('delPlayList', id)
      http.post('/setPlayList', { playList: this.playList })
    },
    ramdomColor () {
      return ('#' + Math.random().toString(16).slice(2, 8))
    },
    getPlayList () {
      http.get('/getPlayList').then(res => {
        this.$store.commit('updatePlayList', res.data)
      })
    },
    openDialog () {
      this.dialog = true
    },
    async playListAddFile () {
      await this.checkList.forEach((element) => {
        this.$store.commit('addPlayList', this.fileList[element])
        // this.$store.dispatch('addPlayList', this.fileList[element])
      })
      http.post('/setPlayList', { playList: this.playList })
      this.cancelPlayListAddFile()
    },
    cancelPlayListAddFile () {
      this.dialog = false
      this.checkList = []
    }
  }
}
</script>

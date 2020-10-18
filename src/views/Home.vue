<template>
  <v-container>
    <v-card>
      <v-card-title class="grey lighten-4">
        PLAY LIST
        <v-spacer/>
        <v-btn @click="openDialog">
          ADD
        </v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">Index</th>
                <th>Name</th>
                <th>Length</th>
                <th class="text-center" style="width:145px">Actions</th>
              </tr>
            </thead>
            <draggable v-model="playList" tag="tbody">
              <tr v-for="(item, i) in playList" :key="i">
                <td>
                  <v-avatar :color="item.color" size="30px" style="font-weight:bold; color:#383230" >{{ i + 1 }}</v-avatar>
                </td>
                <td>{{ item.name }}</td>
                <td>{{ formatTimes(item.duration) }}</td>
                <td>
                  <v-btn color="green darken-4" icon>
                    <v-icon>mdi-play</v-icon>
                  </v-btn>
                  <v-btn color="blue-grey darken-4" icon>
                    <v-icon>mdi-stop</v-icon>
                  </v-btn>
                  <v-btn  color="red darken-4" icon @click="delPlayListItem(i)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </draggable>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="800px" persistent scrollable>
      <v-card>
        <v-card-title class="grey lighten-4">
          <h3>ADD FILES</h3>
        </v-card-title>
        <v-card-text>
          <v-data-table
            v-model="checkList"
            :headers="fileListHeaders"
            :items="fileList"
            item-key="name"
            show-select
          >
            <template v-slot:item.duration="{ item }">
              {{ formatTimes(item.duration) }}
            </template>
            <template v-slot:item.size="{ item }">
              {{ formatBytes(item.size) }}
            </template>
            <template v-slot:item.preview="props">
              <v-btn color="red" icon @click=onPreview(props)>
                <v-icon>mdi-play</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions class="grey lighten-4">
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
import FormatUtil from '../api/FormatChange'
import draggable from 'vuedraggable'
// import io from '../api/socket.io'

let mountprocess = false

export default {
  name: 'Home',
  components: {
    draggable
  },
  data () {
    return {
      dialog: false,
      checkList: [],
      fileListHeaders: [
        { text: 'Name', value: 'name' },
        { text: 'Type', value: 'type' },
        { text: 'Length', value: 'duration' },
        { text: 'Size', value: 'size' },
        { text: 'Preview', value: 'preview' }
      ]
    }
  },
  computed: {
    ...mapState(['playList', 'fileList']),
    playList: {
      get () {
        return this.$store.state.playList
      },
      set (value) {
        if (mountprocess === true) {
          mountprocess = false
          return
        }
        this.$store.commit('updatePlayList', value)
        http.post('/setPlayList', value)
      }
    }
  },
  created () {
    mountprocess = true
    this.$store.dispatch('getFileList')
    this.getPlayList()
    this.$socket.on('playlist', (data) => {
      console.log('playlist!', data)
      this.$store.commit('updatePlayList', data)
    })
  },
  methods: {
    async delPlayListItem (id) {
      await this.$store.commit('delPlayList', id)
      http.post('/setPlayList', this.playList)
    },
    ramdomColor () {
      return ('#' + Math.random().toString(16).slice(2, 8))
    },
    getPlayList () {
      http.get('/getPlayList').then(res => {
        // console.log(res.data)
        this.$socket.emit('message', res.data)
        this.$store.commit('updatePlayList', res.data)
      })
    },
    openDialog () {
      this.dialog = true
    },
    async playListAddFile () {
      console.log(this.checkList)
      await this.checkList.forEach((element) => {
        element.color = this.ramdomColor()
        // console.log(element)
        this.$store.commit('addPlayList', element)
        // this.$store.dispatch('addPlayList', this.fileList[element])
      })
      http.post('/setPlayList', this.playList)
      this.cancelPlayListAddFile()
    },
    cancelPlayListAddFile () {
      this.dialog = false
      this.checkList = []
    },
    formatBytes (bytes, decimals = 2) {
      const listbytes = FormatUtil.formatBytes(bytes, decimals = 2)
      return listbytes
    },
    formatTimes (milliseconds) {
      const listtime = FormatUtil.formatTimes(milliseconds)
      return (listtime)
    },
    onPreview (id) {
      console.log(id)
    }
  }
}
</script>

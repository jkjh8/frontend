<template>
  <v-container>
    <v-card>
      <v-card-title class="grey lighten-4">PLAY LIST<v-spacer/><v-btn @click="OpenDialog">ADD</v-btn></v-card-title>
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
                  <v-btn color="green darken-4" icon @click="Player({ command: 'playid,'+ i })"><v-icon>mdi-play</v-icon></v-btn>
                  <v-btn color="blue-grey darken-4" icon @click="Player({ command: 'stop' })"><v-icon>mdi-stop</v-icon></v-btn>
                  <v-btn  color="red darken-4" icon @click="delPlayListItem(i)"><v-icon>mdi-delete</v-icon></v-btn>
                </td>
              </tr>
            </draggable>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <PlayListAdd :AddPlaylistDialog="AddPlaylistDialog" @CloseDialog="CloseDialog"></PlayListAdd>
    <v-dialog v-model="Processing" max-width="400px" persistent>
      <ProgressProcess></ProgressProcess>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import http from '../api/http'
import FormatUtil from '../api/FormatChange'
import draggable from 'vuedraggable'
import ProgressProcess from '../components/ProgressProcess'
import PlayListAdd from '../components/PlayListAdd'

export default {
  name: 'Home',
  components: { draggable, ProgressProcess, PlayListAdd },
  data () {
    return {
      AddPlaylistDialog: false,
      Processing: false
    }
  },
  computed: {
    ...mapState(['playList', 'fileList']),
    playList: {
      get () { return this.$store.state.playList },
      set (value) {
        this.$store.commit('updatePlayList', value)
        http.post('/setPlayList', value)
      }
    }
  },
  created () {
    // this.$store.dispatch('getFileList')
    http.get('/playlistrefresh')
    this.getPlayList()
    this.$socket.on('playlist', (data) => {
      this.$store.commit('updatePlayList', data)
    })
  },
  methods: {
    Player (command) {
      http.post('/player', command).then((res) => {
        console.log(res.data)
      })
    },
    async delPlayListItem (id) {
      await this.$store.commit('delPlayList', id)
      http.post('/setPlayList', this.playList)
    },
    async getPlayList () {
      this.Processing = true
      await http.get('/getPlayList').then(res => {
        this.$store.commit('updatePlayList', res.data)
      })
      this.Processing = false
    },
    OpenDialog () {
      this.$store.dispatch('getFileList')
      this.AddPlaylistDialog = true
    },
    CloseDialog () {
      this.AddPlaylistDialog = false
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

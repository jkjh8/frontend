<template>
  <v-dialog v-model="AddPlaylistDialog" max-width="800px" persistent scrollable>
    <v-card>
      <v-card-title class="grey lighten-4">
        <h3>ADD FILES</h3>
      </v-card-title>
      <v-card-text>
        <v-data-table v-model="checkList" :headers="Headers" :items="fileList" item-key="name" show-select>
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
        <v-btn text @click="confirm"><v-icon>mdi-check</v-icon>OK</v-btn>
        <v-btn text class="pa-3" @click="cancel"><v-icon>mdi-cancel</v-icon>Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import FormatUtil from '../api/FormatChange'
import http from '../api/http'

export default {
  props: ['AddPlaylistDialog'],
  data () {
    return {
      checkList: [],
      Headers: [
        { text: 'Name', value: 'name' },
        { text: 'Type', value: 'type' },
        { text: 'Length', value: 'duration' },
        { text: 'Size', value: 'size' },
        { text: 'Preview', value: 'preview' }
      ]
    }
  },
  computed: {
    ...mapState(['fileList', 'playList'])
  },
  methods: {
    async confirm () {
      await this.checkList.forEach((element) => {
        element.color = this.ramdomColor()
        this.$store.commit('addPlayList', element)
        console.log(element)
      })
      http.post('/setPlayList', this.playList)
      this.cancel()
    },
    cancel () {
      this.checkList = []
      this.$emit('CloseDialog')
    },
    formatBytes (bytes, decimals = 2) {
      const listbytes = FormatUtil.formatBytes(bytes, decimals = 2)
      return listbytes
    },
    formatTimes (milliseconds) {
      const listtime = FormatUtil.formatTimes(milliseconds)
      return (listtime)
    },
    ramdomColor () { return ('#' + Math.random().toString(16).slice(2, 8)) }
  }
}
</script>

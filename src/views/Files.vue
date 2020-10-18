<template>
  <v-container>
    <v-card>
        <v-card-title class="grey lighten-4">
            FILES
            <v-spacer/>
            <v-btn @click="openUploadfileDialog">
                UPLOAD
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-data-table
            :headers="fileListHeaders"
            :items="fileList"
            item-key="name"
            >
            <template v-slot:item.duration="{ item }">
              {{ formatTimes(item.duration) }}
            </template>
            <template v-slot:item.size="{ item }">
              {{ formatBytes(item.size) }}
            </template>
            <template v-slot:item.auctions="props">
              <v-btn color="green darken-4" icon @click=delFile(props)>
                <v-icon>mdi-play</v-icon>
              </v-btn>
              <v-btn  color="red darken-4" icon @click=delFile(props)>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            </v-data-table>
        </v-card-text>
    </v-card>

    <v-dialog v-model="fileUploadDialog" max-width="600px" height="300px">
      <v-card>
        <v-card-title class="grey lighten-4">
          <h3>FILE UPLOAD</h3>
        </v-card-title>
        <v-card-text>
          <v-file-input
            v-model="selectedFiles"
            placeholder="Upload your files"
            label="Select Files"
            multiple
            prepend-icon="mdi-paperclip"
          >
            <template v-slot:selection="{ text }">
            <v-chip small label color="primary">{{ text }}</v-chip>
            </template>
        </v-file-input>
        </v-card-text>
        <v-card-actions class="grey lighten-4">
          <v-spacer/>
          <v-btn text @click="uploadFiles"><v-icon>mdi-check</v-icon>OK</v-btn>
          <v-btn text class="pa-3" @click="closeFileUploadDialog"><v-icon>mdi-cancel</v-icon>Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="progress" max-width="600px" persistent>
      <ProgressPopup :uploadFileIndex = 'uploadFileIndex' :uploadFileName = 'uploadFileName' :progressValue = 'progressValue' />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import http from '../api/http'
import UploadService from '../api/UploadFilesService'
import FormatUtil from '../api/FormatChange'
import ProgressPopup from '../components/progressDialog'

export default {
  components: {
    ProgressPopup
  },
  data () {
    return {
      message: '',
      progressValue: 0,
      progress: false,
      uploadFileName: undefined,
      uploadFileIndex: undefined,
      progressInfos: [],
      selectedFiles: [],
      fileUploadDialog: false,
      fileListHeaders: [
        { text: 'Name', value: 'name' },
        { text: 'Type', value: 'type' },
        { text: 'Length', value: 'duration' },
        { text: 'Size', value: 'size' },
        { text: 'Auctions', value: 'auctions' }
      ]
    }
  },
  computed: {
    ...mapState(['playList', 'fileList'])
  },
  watch: {
    selectedFiles: (newval) => {
      console.log(newval)
    }
  },
  created () {
    this.$store.dispatch('getFileList')
  },
  methods: {
    async delFile (fileId) {
      const delfile = fileId.item.complete_name
      http.post('/removeFile', { file: delfile }).then(res => {
        this.$store.commit('updateFileList', res.data)
      })
    },
    openUploadfileDialog () { this.fileUploadDialog = true },
    closeFileUploadDialog () { this.fileUploadDialog = false },
    async uploadFiles () {
      this.closeFileUploadDialog()
      this.progress = true
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.uploadFileName = this.selectedFiles[i].name
        this.uploadFileIndex = (i + 1) + '/' + this.selectedFiles.length
        await this.upload(i, this.selectedFiles[i])
      }
      this.progress = false
    },
    async upload (idx, file) {
      this.progressInfos[idx] = { percentage: 0, fileName: file.name }
      await UploadService.upload(file, (event) => {
        this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total)
        this.progressValue = this.progressInfos[idx].percentage
      }).then((response) => {
        return response
      }).catch((e) => {
        console.log(e)
        this.progressInfos[idx].percentage = 0
        this.message = 'Could not upload the file:' + file.name
      })
    },
    formatBytes (bytes, decimals = 2) {
      const listbytes = FormatUtil.formatBytes(bytes, decimals = 2)
      return listbytes
    },
    formatTimes (milliseconds) {
      const listtime = FormatUtil.formatTimes(milliseconds)
      return (listtime)
    }
  }
}
</script>

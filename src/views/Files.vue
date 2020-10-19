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
            <v-data-table :headers="fileListHeaders" :items="fileList" item-key="name">
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
              <v-btn  color="red darken-4" icon @click=DelFileModalOpen(props)>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            </v-data-table>
        </v-card-text>
    </v-card>
    <FileUpload :FileUploadDialog='FileUploadDialog' @uploadFile="FileUploadProcess" @CloseDialog="closeFileUploadDialog"></FileUpload>
    <v-dialog v-model="ProgressDialog" max-width="600px" persistent>
      <ProgressPopup :uploadFileIndex = 'uploadFileIndex' :uploadFileName = 'uploadFileName' :progressValue = 'progressValue' />
    </v-dialog>
    <DeleteModal :DelModal="DelModal" :DelFileName="DelFileName" @CloseModal="DelFileModalClose" @FileDelete="DeleteFileProcess"></DeleteModal>
    <v-dialog v-model="Processing" max-width="400px" persistent>
      <ProgressProcess></ProgressProcess>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import http from '../api/http'
import UploadService from '../api/UploadFilesService'
import FormatUtil from '../api/FormatChange'
import ProgressPopup from '../components/progressDialog'
import FileUpload from '../components/FileUpload'
import DeleteModal from '../components/DeleteModal'
import ProgressProcess from '../components/ProgressProcess'

export default {
  components: {
    ProgressPopup, FileUpload, DeleteModal, ProgressProcess
  },
  data () {
    return {
      progressValue: 0,
      Processing: false,
      DelModal: false,
      ProgressDialog: false,
      FileUploadDialog: false,
      uploadFileName: undefined,
      uploadFileIndex: undefined,
      DelFileName: '',
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
  created () {
    this.$store.dispatch('getFileList')
    this.$socket.on('filelist', (data) => {
      this.$store.commit('updateFileList', data)
    })
  },
  methods: {
    openUploadfileDialog () { this.FileUploadDialog = true },
    closeFileUploadDialog () { this.FileUploadDialog = false },
    DelFileModalOpen (fileId) { this.DelFileName = fileId.item; this.DelModal = true },
    DelFileModalClose () { this.DelModal = false },
    async DeleteFileProcess (file) {
      this.DelModal = false
      this.Processing = true
      await http.post('/removeFile', { file: file.complete_name }).then(res => {
        this.$store.commit('updateFileList', res.data)
      })
      this.Processing = false
    },
    async FileUploadProcess (Files) {
      this.FileUploadDialog = false
      this.ProgressDialog = true
      for (let i = 0; i < Files.length; i++) {
        this.uploadFileName = Files[i].name
        this.uploadFileIndex = (i + 1) + '/' + Files.length
        await this.upload(i, Files[i])
      }
      this.ProgressDialog = false
      this.$socket.emit('filelist')
    },
    async upload (idx, file) {
      await UploadService.upload(file, (event) => {
        this.progressValue = Math.round(100 * event.loaded / event.total)
      }).then((response) => {
        return response
      }).catch((e) => {
        console.log(e)
      })
    },
    formatBytes (bytes, decimals = 2) {
      const listbytes = FormatUtil.formatBytes(bytes, decimals = 2)
      return listbytes
    },
    formatTimes (milliseconds) {
      const listtime = FormatUtil.formatTimes(milliseconds)
      return listtime
    }
  }
}
</script>

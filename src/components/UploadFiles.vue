<template>
  <v-container>
    <v-dialog v-model="progressDialog" max-width="300px">
      <v-card>
        <v-progress-circular
        :rotate="180"
        :size="100"
        :width="15"
        :value="progress"
        color="pink"
        >
          {{ progress }}
        </v-progress-circular>
      </v-card>
    </v-dialog>
    <label class="btn btn-default">
      <input type="file" ref="file" @change="selectFile" />
    </label>
    <v-btn @click="progressDialogOpen">popup</v-btn>
    <button class="btn btn-success" :disabled="!selectedFiles" @click="upload">
      Upload
    </button>

    <div class="alert alert-light" role="alert">{{ message }}</div>

    <div class="card">
      <div class="card-header">List of Files</div>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="(file, index) in fileInfos"
          :key="index"
        >
          <a :href="file.url">{{ file.name }}</a>
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
import UploadService from '../api/UploadFilesService'

export default {
  name: 'upload-files',
  data () {
    return {
      progressDialog: true,
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: '',

      fileInfos: []
    }
  },
  methods: {
    progressDialogOpen () {
      this.progressDialog = true
    },
    selectFile () {
      this.selectedFiles = this.$refs.file.files
    },
    upload () {
      this.progress = 0

      this.currentFile = this.selectedFiles.item(0)
      UploadService.upload(this.currentFile, event => {
        this.progress = Math.round((100 * event.loaded) / event.total)
      })
        .then(response => {
          this.message = response.data.message
          return UploadService.getFiles()
        })
        .then(files => {
          this.fileInfos = files.data
        })
        .catch(() => {
          this.progress = 0
          this.message = 'Could not upload the file!'
          this.currentFile = undefined
        })

      this.selectedFiles = undefined
    }
  }
}
</script>

<template>
  <v-dialog v-model="FileUploadDialog" max-width="600px" height="300px">
    <v-card>
      <v-card-title class="grey lighten-4">
        <h3>FILE UPLOAD</h3>
      </v-card-title>
      <v-card-text>
        <v-file-input v-model="selectedFiles" placeholder="Upload your files" label="Select Files" multiple prepend-icon="mdi-paperclip">
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
</template>

<script>
export default {
  props: ['FileUploadDialog'],
  data () {
    return {
      selectedFiles: []
    }
  },
  methods: {
    closeFileUploadDialog () { this.$emit('CloseDialog') },
    uploadFiles () {
      this.$emit('uploadFile', this.selectedFiles)
      this.selectedFiles = []
    }
  }
}
</script>

<template>
  <v-card>
    <v-card-title>
      UPLOADING
    </v-card-title>
    <v-card-text>
      <v-container class="text-center">
        <v-progress-circular
          size="150"
          width="10"
          color="primary"
          indeterminate
        >
          {{ this.uploadFileIndex }}
        </v-progress-circular>
      </v-container>
    <v-card-actions>
      <v-container>
        {{ this.uploadFileName + "    " + this.progressValue + "%"}}
      </v-container>
    </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['uploadFileIndex', 'uploadFileName', 'progressValue']
}
</script>

<template>
  <v-dialog v-model="DelModal" max-width="600px">
    <v-card>
      <v-card-title class="grey lighten-4">
        WARNING
      </v-card-title>
      <v-card-text>
        Want to Delete <strong>{{ this.DelFileName.name }}</strong>{{ ' file?' }}
      </v-card-text>
      <v-card-actions class="grey lighten-4">
        <v-spacer/>
        <v-btn text @click="Confirm"><v-icon>mdi-check</v-icon>OK</v-btn>
        <v-btn text class="pa-3" @click="Cancel"><v-icon>mdi-cancel</v-icon>Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['DelModal', 'DelFileName'],
  data () {
    return {
      //
    }
  },
  methods: {
    Cancel () {
      this.$emit('CloseModal')
    },
    Confirm () {
      this.$emit('FileDelete', this.DelFileName)
      this.$emit('CloseModal')
    }
  }
}
</script>

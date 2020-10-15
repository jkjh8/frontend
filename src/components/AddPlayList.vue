<template>
  <v-dialog v-model="onDialog" max-width="800px" persistent scrollable>
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
              <v-btn color="green darken-4" icon>
                <v-icon>mdi-play</v-icon>
              </v-btn>
              <v-btn color="blue-grey darken-4" icon>
                <v-icon>mdi-stop</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn text @click="closeDialog">
          <v-icon>mdi-check</v-icon>
          OK
        </v-btn>
        <v-btn text class="pa-3" @click="closeDialog">
          <v-icon>mdi-cancel</v-icon>
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['onDialog'],
  data () {
    return {
      checkList: []
    }
  },
  computed: {
    ...mapState(['playList', 'fileList'])
  },
  methods: {
    closeDialog: () => {
      this.$emit('offDialog')
    }
  }
}
</script>

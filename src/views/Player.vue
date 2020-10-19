<template>
  <v-container>
    <video-player  class="video-player-box"
      :options="playerOptions"
    >
    </video-player>
  </v-container>
</template>

<script>
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      playerOptions: {
        height: '360',
        autoplay: true,
        sources: [{
          type: 'video/mp4',
          src: 'http://192.168.0.113/video/1.mp4'
        }]
      }
    }
  }
}
</script>

<template>
    <video-player
    v-click-outside="pause"
    class="video-player-box"
    align="middle"
    ref="videoPlayer"
    :options="videoSource"
    :playsinline="true"

    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    >
    </video-player>
</template>

<script>
import { vueWindowSizeMixin } from 'vue-window-size'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  mixins: [vueWindowSizeMixin],
  components: {
    videoPlayer
  },
  props: ['videoSource'],
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  data () {
    return {
      isPlaying: false
    }
  },
  mounted () {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  methods: {
    pause () {
      if (this.isPlaying === true) {
        this.player.pause()
      }
    },
    onPlayerPlay (player) {
      this.isPlaying = true
    },
    onPlayerPause (player) {
      this.isPlaying = false
    },
    resize () {
      if (window.window.innerWidth < 800) {
        this.videoSource.width = window.innerWidth - 100
      } else {
        this.videoSource.width = 700
      }
    }
  }
}
</script>
<style>
.vjs-default-skin.vjs-paused .vjs-big-play-button { display: none; }
</style>

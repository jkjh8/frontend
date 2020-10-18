import Vue from 'vue'
import Vuex from 'vuex'
import http from '../api/http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileList: [],
    playList: []
  },
  mutations: {
    setFileList: (state, payload) => {
      state.fileList = payload
    },
    updatePlayList: (state, payload) => {
      state.playList = payload
    },
    addPlayList: (state, payload) => {
      console.log(payload)
      state.playList.push(payload)
    },
    updateFileList: (state, payload) => {
      state.fileList = payload
    },
    delPlayList: (state, payload) => {
      state.playList.splice(payload, 1)
    }
  },
  actions: {
    getFileList ({ commit }) {
      return http.get('/getFileList').then(({ data }) => {
        commit('setFileList', data)
        // console.log(data)
      })
    }
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import http from '../api/http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileList: [],
    playList: [],
    playerSetup: []
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
    },
    updatePlayerSetup: (state, payload) => {
      state.playerSetup = payload
    },
    updateObjPlayerSetup: (state, value) => {
      value.forEach(element => {
        const key = Object.keys(element)
        state.playerSetup[key[0]] = element[key[0]]
      })
    }
  },
  actions: {
    getFileList ({ commit }) {
      return http.get('/getFileList').then(({ data }) => {
        commit('setFileList', data)
      })
    },
    getPlayerSetup ({ commit }) {
      return http.get('/getSetup').then(({ data }) => {
        commit('updatePlayerSetup', data)
      })
    },
    getPlayList ({ commit }) {
      return http.get('/getPlayList').then(res => {
        commit('updatePlayList', res.data)
      })
    }
  },
  modules: {
  }
})

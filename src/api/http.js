import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://' + window.location.hostname + ':12300'
})

export default instance

import http from './http'

class UploadFilesService {
  async upload (file, onUploadProgress) {
    const formData = new FormData()
    formData.append('file', file)
    return await http.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    })
  }
}

export default new UploadFilesService()

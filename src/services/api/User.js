import http from './Axios'

class User {
  async getUser (userId) {
    const token = localStorage.getItem('AUTH_TOKEN')
    return await http.get(`/users?id=${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  async editUser (userId, data) {
    const token = localStorage.getItem('AUTH_TOKEN')
    return await http.put(`/users/${userId}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  async updateAvatar (userId, avatar) {
    const token = localStorage.getItem('AUTH_TOKEN')
    const formData = new FormData()
    formData.append('avatar', avatar)
    return http.post(`/users/${userId}/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default new User()

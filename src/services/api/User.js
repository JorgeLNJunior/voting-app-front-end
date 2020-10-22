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
}

export default new User()

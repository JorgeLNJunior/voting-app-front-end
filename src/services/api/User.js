import http from './Axios'

class User {
  async getUser (userId) {
    const token = localStorage.getItem('AUTH_TOKEN')
    return await http.get(`/users?id=${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}

export default new User()

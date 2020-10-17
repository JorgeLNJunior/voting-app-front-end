import http from './Axios'

class Auth {
  async register (data) {
    return http.post('/register', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async login (data) {
    return http.post('/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export default new Auth()

import http from './Axios'

class Survey {
  async get () {
    return await http.get('/surveys')
  }

  async getByID (id) {
    return await http.get(`/surveys?id=${id}`)
  }

  async getUserSurveys (userId) {
    return await http.get(`/surveys?user_id=${userId}`)
  }

  async vote (surveyID, optionID) {
    const token = localStorage.getItem('AUTH_TOKEN')
    return await http.post(`/surveys/${surveyID}/vote/${optionID}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  async create (data) {
    const token = localStorage.getItem('AUTH_TOKEN')
    return await http.post('/surveys', data, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}

export default new Survey()

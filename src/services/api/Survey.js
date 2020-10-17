import http from './Axios'

class Survey {
  async getByID (id) {
    return await http.get(`/surveys/${id}`)
  }

  async vote (surveyID, optionID) {
    const token = localStorage.getItem('AUTH_TOKEN')
    return await http.post(`/surveys/${surveyID}/vote/${optionID}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}

export default new Survey()

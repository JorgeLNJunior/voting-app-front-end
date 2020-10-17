import http from './Axios'

class Survey {
  async getByID (id) {
    return await http.get(`/surveys/${id}`)
  }

  async vote (surveyID, optionID) {
    return await http.post(`/surveys/${surveyID}/vote/${optionID}`)
  }
}

export default new Survey()

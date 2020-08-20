import http from './Axios'

class SurveyService {
  async getByID (id) {
    return await http.get(`/surveys/${id}`)
  }
}

export default new SurveyService()

import axios from 'axios'

const DEV_URL = 'https://api-voting-app.herokuapp.com'
const PROD_URL = 'https://api-voting-app.herokuapp.com'

const http = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL
})

export default http

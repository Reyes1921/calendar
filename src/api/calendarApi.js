import axios from "axios"
import {getVenVariables} from "../helpers/getEnvVariables"

const {VITE_API_URL} = getVenVariables()

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
})

calendarApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  }

  return config
})

export default calendarApi

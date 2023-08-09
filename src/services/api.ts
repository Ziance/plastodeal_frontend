import axios, { AxiosInstance } from "axios"

import { setupInterceptorsTo } from "../services/setupInterceptor"
import { config } from "../utils/config"
import { ErrorResponse } from "./SuccessResponse"

const instance: AxiosInstance = axios.create({
  // baseURL: config.cesApiUrl,
  // baseURL:"https://reqres.in/",
  baseURL:"http://localhost:8000",
  timeout: 1000 * 30,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    //  'Authorization': `Bearer ${token}`
  },
})

const specificInstance: AxiosInstance = setupInterceptorsTo(instance)

export const isAxiosError = (err: any): ErrorResponse => {
  if (axios.isAxiosError(err)) {
    if (err.response && err.response.data) {
      if (err.response.status === 404) return { code: 404, message: err.message } as ErrorResponse
      return err.response.data as ErrorResponse
    }
    return { code: err.code, message: err.message } as ErrorResponse
  }
  return { code: err.code, message: err.message } as ErrorResponse
}

export default specificInstance

/* eslint-disable import/prefer-default-export */
import axiosInstance, { isAxiosError } from "../../services/api"
import { ChangePasswordRequest, LoginRequest, ResetPasswordRequest, SignUpRequest } from "./types"

export const loginAsync = async (request: LoginRequest) => {
  try {
    const formData = new FormData()
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("Username", request.username || "")
    formData.append("Password", request.password || "")

    const response = await axiosInstance.post<string>(`/auth/login`, formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}

export const resetPasswordAsync = async (request: ResetPasswordRequest) => {
  try {
    const response = await axiosInstance.post<string>(`/bes/auth/reset-password`, request, {
      responseType: "text",
    })
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}

export const changePasswordAsync = async (request: ChangePasswordRequest) => {
  try {
    const response = await axiosInstance.post<string>(`/bes/auth/change-password`, request, {
      responseType: "text",
    })
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}

export const createAccountAsync = async (request: SignUpRequest) => {
  try {
    const response = await axiosInstance.post<string>(`/bes/auth/register`, request, {
      responseType: "text",
    })
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}

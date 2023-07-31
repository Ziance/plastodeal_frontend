/* eslint-disable import/prefer-default-export */
import axiosInstance, { isAxiosError } from "../../services/api"
import { ChangePasswordRequest, LoginRequest, ResetPasswordRequest, SignUpRequest } from "./types"

export const loginAsync = async (request: LoginRequest) => {
  try {
    const formData = new FormData()
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("email", request.email || "")
    formData.append("password", request.password || "")

    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
      const response = await axiosInstance.post<string>(`/api/login`, 
      {
        email:formData.get("email"),
        password:formData.get("password")
      }, {
      // headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    console.log("api response ",response);
    
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
  // const newRequest = {
  //   email:"eve.holt@reqres.in",
  //   password:"pistol"
  // }
  try {
    const response = await axiosInstance.post<string>(`/api/register`, {
      // responseType: "text",
      email:"eve.holt@reqres.in",
      password:"pistol"
    })
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}

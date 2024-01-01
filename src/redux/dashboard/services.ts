/* eslint-disable import/prefer-default-export */
import axiosInstance, { isAxiosError } from "../../services/api"
import { ChangePasswordRequest, PostRequirementRequest, ResetPasswordRequest, SignUpRequest } from "./types"

export const addPostReqAsync = async (request: PostRequirementRequest) => {
  try {
    const response = await axiosInstance.post<string>(`/post`, request)
    return response
  } catch (err: any) {
    return err.response
  }
}

export const resetPasswordAsync = async (request: ResetPasswordRequest) => {
  try {
    const response = await axiosInstance.put<string>(`/user/reset-password`, request)
    return response
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
      email: "eve.holt@reqres.in",
      password: "pistol"
    })
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}

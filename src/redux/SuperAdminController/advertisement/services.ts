/* eslint-disable import/prefer-default-export */
import axiosInstance, { isAxiosError } from "../../../services/api"
import { ChangePasswordRequest, AddAdvertisementRequest, ResetPasswordRequest, SignUpRequest } from "./types"

export const addAdvertisementAsync = async (request: AddAdvertisementRequest) => {
  try {
    const formData = new FormData()
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("title", request.title || "")
    formData.append("description", request.description || "")
    formData.append("file", request.file || "")
    formData.append("categoryId", request.categoryId || "")

    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
      const response = await axiosInstance.post<string>(`masters/advertisement`, 
      {
        title:formData.get("title"),
        description:formData.get("description"),
        // file:formData.get("file"),
        categoryId:formData.get("categoryId")
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
export const fetchGetAdvertisementByCatagoryIdAsync = async (request:any) => {
  try {
    // const response = await axiosInstance.get(`/product/${request}`);
    const response = await axiosInstance.get(`/masters/advertisement`)
    return response.data ;
  } catch (err) {
    return isAxiosError(err);
  }
};

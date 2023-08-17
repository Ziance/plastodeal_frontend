/* eslint-disable import/prefer-default-export */
import axiosInstance, { isAxiosError } from "../../../services/api"
import { ChangePasswordRequest, PostRequirementRequest, ResetPasswordRequest, SignUpRequest } from "./types"

export const addPostReqAsync = async (request: PostRequirementRequest) => {
  try {
    const formData = new FormData()
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("name", request.name || "")
    formData.append("password", request.contactNo || "")
    formData.append("email", request.email || "")
    formData.append("subject", request.subject || "")
    formData.append("message", request.message || "")

    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
      const response = await axiosInstance.post<string>(`/api/login`, 
      {
        // name:formData.get("name"),
        // contactNo:formData.get("contactNo"),
        // email:formData.get("email"),
        // subject:formData.get("subject"),
        // message:formData.get("message")

        // ---------------------
        email:"eve.holt@reqres.in",
        password:"cityslicka"
      }, {
      // headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    console.log("api response ",response);
    
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}

export const fetchGetApprovalByCatagoryIdAsync = async (request:any) => {
  try {
    const response = await axiosInstance.get(`/product/${request}`);
    return response.data ;
  } catch (err) {
    return isAxiosError(err);
  }
};

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

/* eslint-disable import/prefer-default-export */
import axiosInstance, { isAxiosError } from "../../services/api";
import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  SignUpRequest,
} from "./types";

export const loginAsync = async (request: LoginRequest) => {
  try {
    const formData = new FormData();
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("email", request.email || "");
    formData.append("password", request.password || "");
    console.log("formdata",formData);
    
    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
    const response = await axiosInstance.post<string>(`/user/signin`, {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    console.log("login api response ", response);

    return response.data;
  } catch (err) {
    return isAxiosError(err);
  }
};

export const resetPasswordAsync = async (request: ResetPasswordRequest) => {
  try {
    const response = await axiosInstance.post<string>(`/api/login`, {
      responseType: "text",
    });
    return response.data;
  } catch (err) {
    return isAxiosError(err);
  }
};
export const forgotPasswordAsync = async (request: ForgotPasswordRequest) => {
  try {
    const response = await axiosInstance.post<string>(`/api/login`, {
      email: "eve.holt@reqres.in",
      password: "pistol",
    });
    return response.data;
  } catch (err) {
    return isAxiosError(err);
  }
};

export const changePasswordAsync = async (request: ChangePasswordRequest) => {
  try {
    const response = await axiosInstance.post<string>(
      `/bes/auth/change-password`,
      request,
      {
        responseType: "text",
      }
    );
    return response.data;
  } catch (err) {
    return isAxiosError(err);
  }
};

export const createAccountAsync = async (request: SignUpRequest) => {

  try {
    const response = await axiosInstance.post<string>(`/user/signup`, {
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      phoneNumber: request.phoneNumber,
      countryCode: request.countryCode,
      password: request.password,
      confirmPassword: request.confirmPassword,
      companyName: request.companyName,
      companyType: request.companyType,
      companyPersonName: request.contactPerson,
      companyContactNumber: request.companyContactNumber,
      address: request.address,
      country: request.country,
      state: request.state,
      city: request.city,
      zipCode: request.zipCode,
      companyLogo: request.companyLogo,
      userRole: request.userRole,
      companyContactCode: request.countryCode,
    });
    return response.data;
  } catch (err) {
    return isAxiosError(err);
  }
};

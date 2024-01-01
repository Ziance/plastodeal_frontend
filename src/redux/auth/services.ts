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

    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
    const response = await axiosInstance.post<string>(`/user/signin`, {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    console.log("login api response ", response);

    return response;
  } catch (err) {
    return isAxiosError(err);
  }
};

export const resetPasswordAsync = async (request: ResetPasswordRequest) => {
  try {
    const response = await axiosInstance.post<string>(`/api/login`, {
      responseType: "text",
    });
    return response;
  } catch (err) {
    return isAxiosError(err);
  }
};
export const forgotPasswordAsync = async (request: ForgotPasswordRequest) => {
  try {
    const response = await axiosInstance.put<string>(`/user/forgot-password`, {
      email: request.email,
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



  // const formData = new FormData();
  // formData.append("firstName", request?.firstName || "")
  // formData.append("lastName", request?.lastName || "")
  // formData.append("email", request?.email || "")
  // formData.append("phoneNumber", request?.phoneNumber || "")
  // formData.append("countryCode", request?.countryCode || "")
  // formData.append("password", request?.password || "")
  // formData.append("confirmPassword", request?.confirmPassword || "")
  // formData.append("companyName", request?.companyName || "")
  // formData.append("companyType", request?.companyType || "")
  // formData.append("companyPersonName", request?.contactPerson || "")
  // formData.append("companyContactNumber", request?.companyContactNumber || "")
  // formData.append("address", request?.address || "")
  // formData.append("country", request?.country || "")
  // formData.append("state", request?.state || "")
  // formData.append("city", request?.city || "")
  // formData.append("zipCode", request?.zipCode || "")
  // formData.append("companyLogo", request?.companyLogo || "")
  // formData.append("userRole", request?.userRole || "")
  // formData.append("companyContactCode", request?.companyContactCode || "")

 
  try {
    console.log("req async==>",request);
    const response = await axiosInstance.post<any>(`/user/signup`,
       {
        firstName: request?.firstName,
        lastName: request?.lastName,
        email: request?.email,
        phoneNumber: request?.phoneNumber,
        countryCode: request?.countryCode,
        password: request?.password,
        confirmPassword: request?.confirmPassword,
        companyName: request?.companyName,
        companyType: request?.companyType,
        companyPersonName: request?.contactPerson,
        companyContactNumber: request?.companyContactNumber,
        address: request?.address,
        country: request?.country,
        state: request?.state,
        city: request?.city,
        zipCode: request?.zipCode,
        companyLogo: request?.companyLogo?.preview,
        userRole: request?.userRole,
        companyContactCode: request?.countryCode,
        paymentDetails: request?.paymentDetails
      }
    //   formData, {
    //   headers: {
    //     "Content-Type": "muiltipart/formdata",
    //     Accept: "application/json",
    //   }
    // }
    );
    console.log("response===>async",response);
    
    return response;
  } catch (err) {
    console.log("error async",err);
    
    return isAxiosError(err);
  }
};
export const updateAccountAsync = async (request: any) => {

  try {
    console.log("request", request);

    const response = await axiosInstance.put<string>(`/user/${request?.userId}`, {
      firstName: request?.values?.firstName,
      lastName: request?.values?.lastName,
      email: request?.values?.email,
      phoneNumber: request?.values?.phoneNumber,
      countryCode: request?.values?.countryCode,
      password: request?.values?.password,
      confirmPassword: request?.values?.confirmPassword,
      companyName: request?.values?.companyName,
      companyType: request?.values?.companyType,
      companyPersonName: request?.values?.contactPerson,
      companyContactNumber: request?.values?.companyContactNumber,
      address: request?.values?.address,
      country: request?.values?.country,
      state: request?.values?.state,
      city: request?.values?.city,
      zipCode: request?.values?.zipCode,
      userRole: request?.values?.userRole,
      companyContactCode: request?.values?.countryCode,
      companyLogo: JSON.stringify(request?.values?.profilePicture)
    });
    return response;
  } catch (err) {
    return isAxiosError(err);
  }
};

export const paymentAsync = async(request:string)=>{
  try {
    const response = await axiosInstance.post<string>("/user/payment",{
      amount:request
    })
    console.log("payment log", response);
    
    return response
  } catch (error) {
    return isAxiosError(error);
  }
}
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
    formData.append("email", request.email || "");
    formData.append("password", request.password || "");

    const response = await axiosInstance.post<string>(`/user/signin`, {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    return response;
  } catch (err: any) {
    return err?.response;
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



  const formData = new FormData();
  formData.append("firstName", request?.firstName || "")
  formData.append("lastName", request?.lastName || "")
  formData.append("email", request?.email || "")
  formData.append("phoneNumber", request?.phoneNumber || "")
  formData.append("countryCode", request?.countryCode || "")
  formData.append("password", request?.password || "")
  formData.append("confirmPassword", request?.confirmPassword || "")
  formData.append("companyName", request?.companyName || "")
  formData.append("companyType", request?.companyType || "")
  formData.append("companyPersonName", request?.contactPerson || "")
  formData.append("companyContactNumber", request?.companyContactNumber || "")
  formData.append("address", request?.address || "")
  formData.append("country", request?.country || "")
  formData.append("state", request?.state || "")
  formData.append("city", request?.city || "")
  formData.append("paymentDetails", JSON.stringify(request?.paymentDetails || ""))
  const paymentDetails: { [key: string]: any } = request?.paymentDetails || {};
  for (const key in paymentDetails) {
    if (paymentDetails.hasOwnProperty(key)) {
      formData.append(`paymentDetails[${key}]`, paymentDetails[key]);
    }
  }
  formData.append("zipCode", request?.zipCode || "")
  if (request?.companyLogo) {
    formData.append("file", request?.companyLogo || "")
  }
  formData.append("userRole", request?.userRole || "")
  formData.append("companyContactCode", request?.companyContactCode || "")


  try {
    const response = await axiosInstance.post<any>(`/user/signup`,
      //    {
      //     firstName: request?.firstName,
      //     lastName: request?.lastName,
      //     email: request?.email,
      //     phoneNumber: request?.phoneNumber,
      //     countryCode: request?.countryCode,
      //     password: request?.password,
      //     confirmPassword: request?.confirmPassword,
      //     companyName: request?.companyName,
      //     companyType: request?.companyType,
      //     companyPersonName: request?.contactPerson,
      //     companyContactNumber: request?.companyContactNumber,
      //     address: request?.address,
      //     country: request?.country,
      //     state: request?.state,
      //     city: request?.city,
      //     zipCode: request?.zipCode,
      //     companyLogo: request?.companyLogo?.preview,
      //     userRole: request?.userRole,
      //     companyContactCode: request?.countryCode,
      //     paymentDetails: request?.paymentDetails
      //   }
      //  
      // );
      formData, {
      headers: {
        "Content-Type": "muiltipart/formdata",
        Accept: "application/json",
      }
    })
    return response;
  } catch (err) {

    return isAxiosError(err);
  }
};
export const updateAccountAsync = async (request: any) => {
  try {
    const formData = new FormData()
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("firstName", request?.values?.firstName || "google")
    formData.append("lastName", request?.values?.lastName || "tech")
    formData.append("email", request?.values?.email || "")
    formData.append("phoneNumber", request?.values?.phoneNumber || "")
    formData.append("countryCode", request?.values?.countryCode || "")
    formData.append("password", request?.values?.password || "")
    formData.append("confirmPassword", request?.values?.confirmPassword || "")
    formData.append("companyName", request?.values?.name || "")
    formData.append("companyType", request?.values?.companyType || "org")
    formData.append("companyPersonName", request?.values?.companyPersonName || "")
    formData.append("companyContactNumber", request?.values?.companyContactNumber || "test")
    formData.append("address", request?.values?.address || "")
    formData.append("country", request?.values?.country || "")
    formData.append("state", request?.values?.state || "")
    formData.append("city", request?.values?.city || "")
    formData.append("zipCode", request?.values?.zipCode || "")
    formData.append("userRole", request?.values?.userRole || "")
    formData.append("companyContactCode", request?.values?.companyContactCode || "")
    formData.append("PAN", request?.values?.PAN || "")
    formData.append("gstIn", request?.values?.gstIn || "")
    formData.append("website", request?.values?.website || "")
    if (request?.values?.profilePicture) {
      formData.append("file", request?.values?.profilePicture || "")
    }


    const response = await axiosInstance.put(`/user/${request?.userId}`, formData, {
      headers: {
        "Content-Type": "muiltipart/formdata",
        Accept: "application/json",
      }
      // {
      //   firstName: request?.values?.firstName,
      //   lastName: request?.values?.lastName,
      //   email: request?.values?.email,
      //   phoneNumber: request?.values?.phoneNumber,
      //   countryCode: request?.values?.countryCode,
      //   password: request?.values?.password,
      //   confirmPassword: request?.values?.confirmPassword,
      //   companyName: request?.values?.companyName,
      //   companyType: request?.values?.companyType,
      //   companyPersonName: request?.values?.contactPerson,
      //   companyContactNumber: request?.values?.companyContactNumber,
      //   address: request?.values?.address,
      //   country: request?.values?.country,
      //   state: request?.values?.state,
      //   city: request?.values?.city,
      //   zipCode: request?.values?.zipCode,
      //   userRole: request?.values?.userRole,
      //   companyContactCode: request?.values?.countryCode,
      //   companyLogo: request?.values?.profilePicture,
      // }
    })
      ;
    return response;
  } catch (err) {
    return isAxiosError(err);
  }
};

export const paymentAsync = async (request: string) => {
  try {
    const response = await axiosInstance.post<string>("/user/payment", {
      amount: request
    })

    return response
  } catch (error) {
    return isAxiosError(error);
  }
}
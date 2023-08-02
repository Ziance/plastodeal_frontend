/* eslint-disable import/prefer-default-export */
import axiosInstance, { isAxiosError } from "../../../services/api";
import {
  ChangePasswordRequest,
  PostRequirementRequest,
  ResetPasswordRequest,
  SignUpRequest,
} from "./types";

export const getALLCatagoriesAsync = async (
  request: PostRequirementRequest
) => {
  try {
    const formData = new FormData();
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("name", request?.name || "");
    formData.append("password", request?.contactNo || "");
    formData.append("email", request?.email || "");
    formData.append("subject", request?.subject || "");
    formData.append("message", request?.message || "");

    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
    const response = await axiosInstance.get<string>(`/api/login`);
    console.log("api response ", response);

    return response.data;
  } catch (err) {
    return isAxiosError(err);
  }
};

export const getCatagoriesByIdAsync = async (request: ResetPasswordRequest) => {
  try {
    const response = await axiosInstance.get<string>(
      `/bes/auth/reset-password/`
    );
    return response.data;
  } catch (err) {
    return isAxiosError(err);
  }
};

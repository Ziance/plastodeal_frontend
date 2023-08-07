import {
  ErrorResponse,
  SuccessResponse,
} from "../../../services/SuccessResponse";
import axiosInstance, { isAxiosError } from "../../../services/api";

export const fetchGetUsers = async () => {
  try {
    const response = await axiosInstance.get(`/`);
    return response.data.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};

export const postAddUsersAsync = async (data: any) => {
  try {
    const response = await axiosInstance.get<
      SuccessResponse<any[]> | ErrorResponse
    >(`/${data}`);
    return response.data;
  } catch (error) {
    return isAxiosError(error);
  }
};

export const postAddOrganizationAsync = async (data: any) => {
  try {
    const response = await axiosInstance.get<
      SuccessResponse<any[]> | ErrorResponse
    >(`/${data}`);
    return response.data;
  } catch (error) {
    return isAxiosError(error);
  }
};


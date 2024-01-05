import {
  ErrorResponse,
  SuccessResponse,
} from "../../../services/SuccessResponse";
import axiosInstance, { isAxiosError } from "../../../services/api";
import { StaticPagesRequest } from "./types";

export const fetchStaticPagesAsync = async () => {
  try {
    const response = await axiosInstance.get(`/masters/static-page`);
    return response.data ;
  } catch (err) {
    return isAxiosError(err);
  }
};
export const addStaticPagesAsync = async (request: StaticPagesRequest) => {
  try {
    const response = await axiosInstance.post<
      SuccessResponse<any[]> | ErrorResponse
    >(`/masters/static-page`, {
      title: request?.title,
      description: request?.description,
    });
    return response.data;
  } catch (error) {
    return isAxiosError(error);
  }
};
export const updateStaticPagesAsync = async (request: StaticPagesRequest) => {
  try {
    
    const response = await axiosInstance.put<
      SuccessResponse<any[]> | ErrorResponse
    >(`/masters/static-page/${request?.id}`, {
      title: request?.title,
      description: request?.description,
    });
    return response.data;
  } catch (error) {
    return isAxiosError(error);
  }
};


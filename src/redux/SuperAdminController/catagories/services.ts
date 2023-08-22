import {
  ErrorResponse,
  SuccessResponse,
} from "../../../services/SuccessResponse";
import axiosInstance, { isAxiosError } from "../../../services/api";

export const fetchGetCatagories = async () => {
  try {
    const response = await axiosInstance.get(`/category`);
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};

export const addCatagoryAsync = async (request: any) => {
  try {
    const response = await axiosInstance.post(`/category`, {
      name:request?.name,
      description:request?.description
    });
    return response.data;
  } catch (err) {
    return isAxiosError(err);
  }
};

export const deleteCatagoryActionAsync = async (id: any) => {
  try {
    const response = await axiosInstance.delete(`/category/${id}`);
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};


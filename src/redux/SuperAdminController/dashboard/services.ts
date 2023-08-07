import {
  ErrorResponse,
  SuccessResponse,
} from "../../../services/SuccessResponse";
import axiosInstance, { isAxiosError } from "../../../services/api";

export const fetchAllCatagoriesAction = async () => {
  try {
    const response = await axiosInstance.get(`/`);
    return response.data.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};

export const fetchCatagoriesByIdAction = async (data: any) => {
  try {
    const response = await axiosInstance.get<
      SuccessResponse<any[]> | ErrorResponse
    >(`/project-aggr/project/${data}`);
    return response.data;
  } catch (error) {
    return isAxiosError(error);
  }
};

import {
  ErrorResponse,
  SuccessResponse,
} from "../../../services/SuccessResponse";
import axiosInstance, { isAxiosError } from "../../../services/api";

export const fetchGetUsers = async (req : any) => {
  try {
    const response = await axiosInstance.get(`/user?page=${req?.page}&&limit=${req?.rowsPerPage}&&filter=${req?.filterText}`);
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};

export const postEditUserStatusAsync = async (request: any) => {
  try {
    const response = await axiosInstance.put(`/user/status/${request._id}`, {
      userStatus: !request.userStatus,
    });
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};

export const deleteUsersAsync = async (id: any) => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response;
  } catch (err) {
    return isAxiosError(err);
  }
};


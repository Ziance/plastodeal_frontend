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
    const response = await axiosInstance.post(`/category/`,
      // name:request?.name,
      // description:request?.description,
      // file:request?.file
      request, {
      headers: {
        "Content-Type": "muiltipart/formdata",
        Accept: "application/json",
      }
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

export const postEditCategoryStatusAsync = async (request: any) => {
  try {
    const response = await axiosInstance.put(`/category/change-status/${request?._id}`, {
      status: !request?.status,
    });
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};

export const postEditCategoryDetailsAsync = async (request: any) => {
  // const {id,formData}= request
  try {

    const formData = new FormData()
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("name", request?.name || "")
    formData.append("description", request?.description || "")
    if (request?.file) {
      formData.append("file", request?.file || "")
    }


    const response = await axiosInstance.put(`/category/${request?._id}`, formData, {
      headers: {
        "Content-Type": "muiltipart/formdata",
        Accept: "application/json",
      }
    });
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};
export const viewHistoryByCategoryIdAsync = async (request: any) => {
  
  try {
    const response = await axiosInstance.get(`/category/history/${request?.categoryId}?page=${request?.page}&&limit=${request?.rowsPerPage}&&filter=${request?.filterText}`);
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};
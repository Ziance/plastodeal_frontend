/* eslint-disable import/prefer-default-export */
import axiosInstance, { isAxiosError } from "../../../services/api"
import {  AddAdvertisementRequest,  } from "./types"

export const addAdvertisementAsync = async (request: AddAdvertisementRequest) => {
  try {
    const formData = new FormData()
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("title", request.title || "")
    formData.append("description", request.description || "")
    formData.append("file", request.file || "")
    formData.append("categoryId", request.categoryId || "")

    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
      const response = await axiosInstance.post<string>(`masters/advertisement`, 
      formData, {
        headers: {
          "Content-Type": "muiltipart/formdata",
          Accept: "application/json",
        }
      })
    console.log("api response ",response);
    
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}

export const deleteAdvertisementAsync = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/masters/advertisement/${id}`);
    return response;
  } catch (err) {
    return isAxiosError(err);
  }
};
export const EditAdvertisementStatusAsync = async (request: any) => {
  try {
    const { params, row } = request;
    const response = await axiosInstance.put(
      `/masters/advertisement/status/${row._id}`,{
        status : !row?.status
      }
    );
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};



export const fetchGetAdvertisementBycategoryIdAsync = async (request:any) => {
  try {
    // const response = await axiosInstance.get(`/product/${request}`);
    console.log("category id in service",request);
    
    const response = await axiosInstance.get(`/masters/advertisement/${request.categoryId}?page=${request?.page}&&limit=${request?.rowsPerPage}&&filter=${request?.filterText}`)
    return response.data ;
  } catch (err) {
    return isAxiosError(err);
  }
};
export const fetchGetAllAdvertisementAsync = async () => {
  try {
    // const response = await axiosInstance.get(`/product/${request}`);
    // console.log("category id in service",request);
    
    const response = await axiosInstance.get(`/masters/advertisement`)
    return response.data ;
  } catch (err) {
    return isAxiosError(err);
  }
};

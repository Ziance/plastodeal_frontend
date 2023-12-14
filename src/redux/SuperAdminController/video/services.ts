/* eslint-disable import/prefer-default-export */
import axiosInstance, { isAxiosError } from "../../../services/api"
import { AddVideoRequest } from "./types"

export const getAllVideoAsync = async () => {
  try {
      const response = await axiosInstance.get<string>(`/masters/video`)
      
    console.log("api response ",response);
    
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}

export const addVideoAsync = async (request: AddVideoRequest) => {
  try {
    const response = await axiosInstance.post<string>(`/masters/video`, {
      title:request?.title,
      description:request?.description,
      // file:request?.file
    })
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}

export const deleteVideoByIdAsync = async (request: string) => {
  try {
    const response = await axiosInstance.delete<string>(`/masters/video/${request}`)
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}
export const updateVideoStatusByIdAsync = async (request: any) => {
  try {
    const response = await axiosInstance.put(`/masters/video/status/${request._id}`, {
      status: !request?.status,
    });
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};


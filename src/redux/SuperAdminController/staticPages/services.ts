import {
  ErrorResponse,
  SuccessResponse,
} from "../../../services/SuccessResponse";
import axiosInstance, { isAxiosError } from "../../../services/api";
import { JobRequest } from "./types";

export const fetchStaticPagesAsync = async () => {
  try {
    const response = await axiosInstance.get(`/masters/static-page`);
    return response.data ;
  } catch (err) {
    return isAxiosError(err);
  }
};

export const postAddJobsAsync = async (request: JobRequest) => {
  try {
    const response = await axiosInstance.post<
      SuccessResponse<any[]> | ErrorResponse
    >(`/job`, {
      name: request.Name,
      companyName: request.companyName,
      phoneNumber: request.contactNo,
      email: request.email,
      jobDescription: request.jobDescription,
      expiryDate: request.jobExpireDate,
      functionalArea: request.jobFunctionalArea,
      jobLocation : request.jobLocation,
      jobTitle: request.jobTitle,
      jobType: request.jobType,
      maxAge: request.maxAge,
      maxSalary: request.maxSalary,
      maxExp: request.maxYear,
      minAge: request.minAge,
      minSalary: request.minSalary,
      minExp: request.minYear,
      minEducation: request.minimumEducation,
      website: request.webSite,
    });
    return response.data;
  } catch (error) {
    return isAxiosError(error);
  }
};
export const deleteJobByIdAsync = async (request: string) => {
  try {
    const response = await axiosInstance.delete<string>(`/job/${request}`)
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}
export const updateJobStatusByIdAsync = async (request: any) => {
  try {
    console.log("request jobss",request);
    
    const response = await axiosInstance.put(`/job/status/${request._id}`, {
      status: !request.status,
    });
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};

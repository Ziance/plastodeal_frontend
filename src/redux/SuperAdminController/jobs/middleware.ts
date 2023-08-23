import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../services/SuccessResponse";
import { postAddJobsAsync, fetchJobsAsync, deleteJobByIdAsync, updateJobStatusByIdAsync } from "./services";

export const getJobsAction = createAsyncThunk<any[], undefined>(
  "getUsersAction",
  async (_, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await fetchJobsAsync();
      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      return response?.data?.jobs ;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const postAddJobsAction = createAsyncThunk<any, any>(
  "postAddJobsAction",
  async (request: any, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await postAddJobsAsync(request);
      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const deleteJobByIdAction = createAsyncThunk<string, string>(
  "deleteJobByIdAction",
  async (request: string, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await deleteJobByIdAsync(request)
      // const response: string | ErrorResponse = "This is success"
      console.log("response middile job dele",response);
      
      const errorResponse = response as unknown as ErrorResponse
      if (errorResponse?.code) {
        if (errorResponse.code === 401) {
          // notify("Failed to change password", "error", 2000)
        } else {
          // notify("System Error, Please try again later.", "error", 2000)
        }
        return rejectWithValue(errorResponse)
      }
      // notify("Your password changed successfully.", "success", 2000)
      return response?.success as string
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error)
    }
  }
)

export const updateJobStatusByIdAction = createAsyncThunk<any, any>(
  "updateJobStatusByIdAction",
  async (request: string, { rejectWithValue }) => {
    try {
      console.log("midile request",request);
      
      const response: any | ErrorResponse = await updateJobStatusByIdAsync(request)
      // const response: string | ErrorResponse = "This is success"
      console.log("response middile jobs status update",response);
      
      const errorResponse = response as unknown as ErrorResponse
      if (errorResponse?.code) {
        if (errorResponse.code === 401) {
          // notify("Failed to change password", "error", 2000)
        } else {
          // notify("System Error, Please try again later.", "error", 2000)
        }
        return rejectWithValue(errorResponse)
      }
      // notify("Your password changed successfully.", "success", 2000)
      return response?.success as string
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error)
    }
  }
)

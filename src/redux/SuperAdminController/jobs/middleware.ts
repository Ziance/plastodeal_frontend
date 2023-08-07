import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../services/SuccessResponse";
import { postAddJobsAsync, fetchJobsAsync } from "./services";

export const getJobsAction = createAsyncThunk<any[], undefined>(
  "getUsersAction",
  async (_, { rejectWithValue }) => {
    try {
      const response: any[] | ErrorResponse = await fetchJobsAsync();
      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      return response as any[];
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const postAddJobsAction = createAsyncThunk<any, any>(
  "postAddUsersAction",
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

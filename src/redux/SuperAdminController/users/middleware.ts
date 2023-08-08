import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../services/SuccessResponse";
import { fetchGetUsers, postAddUsersAsync, postAddOrganizationAsync } from "./services";

export const getUsersAction = createAsyncThunk<any, undefined>(
  "getUsersAction",
  async (_, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await fetchGetUsers();
      console.log("response bichka ",response);
      
      // const errorResponse = response as ErrorResponse;
      // if (errorResponse?.code) {
      //   return rejectWithValue(errorResponse.message);
      // }
      return response?.data?.users as any;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const postAddUsersAction = createAsyncThunk<any, any>(
  "postAddUsersAction",
  async (request: any, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await postAddUsersAsync(request);
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

export const postAddOrganizationAction = createAsyncThunk<any, any>(
  "postAddOrganizationAction",
  async (request: any, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await postAddOrganizationAsync(request);
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

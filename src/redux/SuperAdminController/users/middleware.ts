import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../services/SuccessResponse";
import {
  fetchGetUsers,
  postEditUserStatusAsync,
  deleteUsersAsync,
} from "./services";

export const getUsersAction = createAsyncThunk<any, any>(
  "getUsersAction",
  async (request:any, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await fetchGetUsers(request);
      console.log("response Middleware ", response);

      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      return response?.data?.users as any;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const editUsersStatusAction = createAsyncThunk<any, any>(
  "editUsersStatusAction",
  async (request, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await postEditUserStatusAsync(
        request
      );
      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      return response?.data?.user as any;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUsersAction = createAsyncThunk<any, any>(
  "deleteUsersAction",
  async (request, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await deleteUsersAsync(request);
      console.log("response Middleware aaa", response);

      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      console.log("response?.data111 : ", response?.data);
      return response?.data?.user as any;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

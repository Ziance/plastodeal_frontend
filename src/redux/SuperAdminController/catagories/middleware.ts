import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../services/SuccessResponse";
import {
  fetchGetUsers,
  deleteUsersAsync,
  addCatagoryAsync,
} from "./services";

export const getAllCatagoriesAction = createAsyncThunk<any, undefined>(
  "getAllCatagoriesAction",
  async (_, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await fetchGetUsers();
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

export const addCatagoryAction = createAsyncThunk<any, undefined>(
  "addCatagoryAction",
  async (request:any, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await addCatagoryAsync(request);
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
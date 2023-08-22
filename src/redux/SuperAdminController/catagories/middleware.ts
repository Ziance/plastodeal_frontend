import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../services/SuccessResponse";
import {
  fetchGetCatagories,
  addCatagoryAsync,
  deleteCatagoryActionAsync,
} from "./services";
import { ResponseInfo, CatagoryInfo } from "./types";

export const getAllCatagoriesAction = createAsyncThunk<any, undefined>(
  "getAllCatagoriesAction",
  async (_, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await fetchGetCatagories();
      console.log("response Middleware ", response);

      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      return response?.data?.category;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const addCatagoryAction = createAsyncThunk<CatagoryInfo, ResponseInfo>(
  "addCatagoryAction",
  async (request: any, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await addCatagoryAsync(request);
      console.log("response Middleware ", response);

      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      return response?.data?.category as any;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCatagoryAction = createAsyncThunk<any, any>(
  "deleteCatagoryAction",
  async (request, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await deleteCatagoryActionAsync(
        request
      );
      console.log("response Middleware aaa", response);

      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      console.log("response?.data111 : ", response?.data);
      return response?.data?.category as any;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

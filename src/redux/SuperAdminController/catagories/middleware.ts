import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../services/SuccessResponse";
import {
  fetchGetCatagories,
  addCatagoryAsync,
  deleteCatagoryActionAsync,
  postEditCategoryStatusAsync,
  postEditCategoryDetailsAsync,
} from "./services";
import { ResponseInfo, CatagoryInfo } from "./types";

export const getAllCatagoriesAction = createAsyncThunk<any, undefined>(
  "getAllCatagoriesAction",
  async (_, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await fetchGetCatagories();

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

export const editCategoryStatusAction = createAsyncThunk<any, any>(
  "editCategoryStatusAction",
  async (request, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await postEditCategoryStatusAsync(
        request
      );
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

export const editCategoryDetailsAction = createAsyncThunk<any, any>(
  "editCategoryDetailsAction",
  async (request, { rejectWithValue }) => {
    console.log("request Middleware ", request);
    try {
      const response: any | ErrorResponse = await postEditCategoryDetailsAsync(
        request
      );
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

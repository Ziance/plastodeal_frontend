import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../services/SuccessResponse";
import {  addStaticPagesAsync, fetchStaticPagesAsync , updateStaticPagesAsync } from "./services";

export const getAllStaticPagesAction = createAsyncThunk<any[], undefined>(
  "getAllStaticPagesAction",
  async (_, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await fetchStaticPagesAsync();
      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      
      return response?.data?.pages ;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const updateStaticPagesAction = createAsyncThunk<any, any>(
  "updateStaticPagesAction",
  async (request: any, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await updateStaticPagesAsync(request);
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


export const addStaticPagesAction = createAsyncThunk<any, any>(
  "ADDStaticPagesAction",
  async (request: any, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await addStaticPagesAsync(request);
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
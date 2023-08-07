import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../services/SuccessResponse";
import {
  fetchAllCatagoriesAction,
  fetchCatagoriesByIdAction,
} from "./services";

export const getAllCatagoriesAction = createAsyncThunk<any[], undefined>(
  "getAllCatagoriesAction",
  async (_, { rejectWithValue }) => {
    try {
      const response: any[] | ErrorResponse = await fetchAllCatagoriesAction();
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

export const getCatagoriesByIdAction = createAsyncThunk<any, any>(
  "getCatagoriesByIdAction",
  async (request: any, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await fetchCatagoriesByIdAction(
        request
      );
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

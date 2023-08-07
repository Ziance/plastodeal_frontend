import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../services/SuccessResponse";
import { fetchMastersDataAsync } from "./services";

export const getMastersData = createAsyncThunk<any[], string>(
  "getUsersAction",
  async (request, { rejectWithValue }) => {
    try {
      const response: any[] | ErrorResponse = await fetchMastersDataAsync(request);
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
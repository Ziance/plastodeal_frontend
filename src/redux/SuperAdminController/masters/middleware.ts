import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../services/SuccessResponse";
import {
  fetchMastersDataAsync,
  postAddMasterAsync,
  postDeleteMasterAsync,
  postEditStatusAsync,
} from "./services";

export const getMastersData = createAsyncThunk<any, string>(
  "getUsersAction",
  async (request, { rejectWithValue }) => {
    console.log("HEADING", request);
    try {
      const response: any | ErrorResponse = await fetchMastersDataAsync(
        request
      );
      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      if (request === "country") {
        return response?.data?.countries;
      }
      if (request === "state") {
        return response?.data?.states;
      }
      if (request === "city") {
        return response?.data?.cities;
      }
      if (request === "faq") {
        return response?.data?.faqs;
      }
      if (request === "company-type") {
        return response?.data?.companyType;
      }

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const editStatusAction = createAsyncThunk<any, any>(
  "editStatusAction",
  async (request, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await postEditStatusAsync(request);
      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      if (request?.params?.dynamicPath === "country") {
        return response?.data?.country;
      }
      if (request?.params?.dynamicPath === "state") {
        return response?.data?.state;
      }
      if (request?.params?.dynamicPath === "city") {
        return response?.data?.city;
      }
      if (request?.params?.dynamicPath === "faq") {
        return response?.data?.faq;
      }
      if (request?.params?.dynamicPath === "company-type") {
        return response?.data?.companyType;
      }

      return response?.data as any;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const deleteMasterAction = createAsyncThunk<any, any>(
  "deleteMasterAction",
  async (request, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await postDeleteMasterAsync(
        request
      );
      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      if (request?.params?.dynamicPath === "country") {
        return response?.data?.country;
      }
      if (request?.params?.dynamicPath === "state") {
        return response?.data?.state;
      }
      if (request?.params?.dynamicPath === "city") {
        return response?.data?.city;
      }
      if (request?.params?.dynamicPath === "faq") {
        return response?.data?.faq;
      }
      if (request?.params?.dynamicPath === "company-type") {
        return response?.data?.companyType;
      }

      return response?.data as any;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const addMasterAction = createAsyncThunk<any, any>(
  "AddMasterAction",
  async (request, { rejectWithValue }) => {
    console.log("ADDDDDD", request);
    try {
      const response: any | ErrorResponse = await postAddMasterAsync(request);
      console.log("response : ", response?.data?.country);

      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      if (request?.params?.dynamicPath === "country") {
        return response?.data?.country;
      }
      if (request?.params?.dynamicPath === "state") {
        return response?.data?.state;
      }
      if (request?.params?.dynamicPath === "city") {
        return response?.data?.city;
      }
      if (request?.params?.dynamicPath === "faq") {
        return response?.data?.faq;
      }
      if (request?.params?.dynamicPath === "company-type") {
        return response?.data?.companyType;
      }

      return response?.data as any;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

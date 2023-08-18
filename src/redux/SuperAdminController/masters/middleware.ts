import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../services/SuccessResponse";
import {
  fetchMastersDataAsync,
  postAddMasterAsync,
  postDeleteMasterAsync,
  postEditStatusAsync,
} from "./services";
import {
  addCityData,
  addCountryData,
  addFaqData,
  addStateData,
  deleteCityData,
  deleteCountryData,
  deleteStateData,
  setCityData,
  setCountryData,
  setFaqData,
  setStatesData,
} from "./mastersSlice";

export const getMastersData = createAsyncThunk<any, string>(
  "getUsersAction",
  async (request, { rejectWithValue, dispatch }) => {
    try {
      const response: any | ErrorResponse = await fetchMastersDataAsync(
        request
      );
      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      if (request === "country") {
        dispatch(setCountryData(response?.data?.countries));
      }
      if (request === "state") {
        dispatch(setStatesData(response?.data?.states));
      }
      if (request === "city") {
        dispatch(setCityData(response?.data?.cities));
      }
      if (request === "faq") {
        dispatch(setFaqData(response?.data?.faqs));
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
  async (request, { rejectWithValue, dispatch }) => {
    try {
      const response: any | ErrorResponse = await postDeleteMasterAsync(
        request
      );
      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      if (request?.params?.dynamicPath === "country") {
        dispatch(deleteCountryData(response.data.country));
      }
      if (request?.params?.dynamicPath === "state") {
        dispatch(deleteStateData(response.data.state));
      }
      if (request?.params?.dynamicPath === "city") {
        dispatch(deleteCityData(response.data.city));
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
  async (request, { rejectWithValue, dispatch }) => {
    console.log("requestMiddleware", request);

    try {
      const response: any | ErrorResponse = await postAddMasterAsync(request);
      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }

      if (request?.params?.dynamicPath === "country") {
        dispatch(addCountryData(response.data.country));
      }
      if (request?.params?.dynamicPath === "state") {
        dispatch(addStateData(response.data.state));
      }
      if (request?.params?.dynamicPath === "city") {
        dispatch(addCityData(response.data.city));
      }
      if (request?.params?.dynamicPath === "faq") {
        dispatch(addFaqData(response.data.faqs));
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

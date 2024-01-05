import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../services/SuccessResponse";
import {
  fetchMastersDataAsync,
  postAddMasterAsync,
  postDeleteMasterAsync,
  postEditMasterAsync,
  postEditStatusAsync,
} from "./services";

export const getMastersData = createAsyncThunk<any, string>(
  "getMastersData",
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
        return { key: request, data: response?.data?.countries };
      }
      if (request === "state") {
        return { key: request, data: response?.data?.states };
      }
      if (request === "city") {
        return { key: request, data: response?.data?.cities };
      }
      if (request === "faq") {
        return { key: request, data: response?.data?.faqs };
      }
      if (request === "banner") {
        return { key: request, data: response?.data?.banners };
      }
      if (request === "company-type") {
        return {
          key: request.replace(/-([a-z])/g, (_, letter) =>
            letter.toUpperCase()
          ),
          data: response?.data?.companyType,
        };
      }
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const editStatusAction = createAsyncThunk<any, any>(
  "editStatusAction",
  async (request, { rejectWithValue, dispatch }) => {
    try {
      const response: any | ErrorResponse = await postEditStatusAsync(request);
      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      if (request?.params?.dynamicPath === "country") {
        return {
          key: request?.params?.dynamicPath,
          data: response?.data?.country,
        };
      }
      if (request?.params?.dynamicPath === "state") {
        return {
          key: request?.params?.dynamicPath,
          data: response?.data?.state,
        };
      }
      if (request?.params?.dynamicPath === "city") {
        return {
          key: request?.params?.dynamicPath,
          data: response?.data?.city,
        };
      }
      if (request?.params?.dynamicPath === "faq") {
        return {
          key: request?.params?.dynamicPath,
          data: response?.data?.faq,
        };
      }
      if (request?.params?.dynamicPath === "company-type") {
        return {
          key: "companyType",
          data: response?.data?.companyType,
        };
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
        // console.log("-----------", {
        //   key: request?.params?.dynamicPath,
        //   data: response?.data?.country,
        // });

        return {
          key: request?.params?.dynamicPath,
          data: response?.data?.country,
        };
      }
      if (request?.params?.dynamicPath === "state") {
        return {
          key: request?.params?.dynamicPath,
          data: response?.data?.state,
        };
      }
      if (request?.params?.dynamicPath === "city") {
        return {
          key: request?.params?.dynamicPath,
          data: response?.data?.city,
        };
      }
      if (request?.params?.dynamicPath === "faq") {
        return { key: request?.params?.dynamicPath, data: response?.data?.faq };
      }
      if (request?.params?.dynamicPath === "company-type") {
        return {
          key: "companyType",
          data: response?.data?.companyType,
        };
      }

      return response?.data as any;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const editMasterAction = createAsyncThunk<any, any>(
  "editMasterAction",
  async (request, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await postEditMasterAsync(request);
      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      if (request?.params?.dynamicPath === "country") {
        return {
          key: request?.params?.dynamicPath,
          data: response?.data?.country,
        };
      }
      if (request?.params?.dynamicPath === "state") {
        return {
          key: request?.params?.dynamicPath,
          data: response?.data?.state,
        };
      }
      if (request?.params?.dynamicPath === "city") {
        return {
          key: request?.params?.dynamicPath,
          data: response?.data?.city,
        };
      }
      if (request?.params?.dynamicPath === "faq") {
        return { key: request?.params?.dynamicPath, data: response?.data?.faq };
      }
      if (request?.params?.dynamicPath === "company-type") {
        return { key: "companyType", data: response?.data?.companyType };
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
    try {
      const response: any | ErrorResponse = await postAddMasterAsync(request);
      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      if (request?.params?.dynamicPath === "country") {
        return {
          key: request?.params?.dynamicPath,
          data: response?.data?.country,
        };
      }
      if (request?.params?.dynamicPath === "state") {
        return {
          key: request?.params?.dynamicPath,
          data: response?.data?.state,
        };
      }
      if (request?.params?.dynamicPath === "city") {
        return {
          key: request?.params?.dynamicPath,
          data: response?.data?.city,
        };
      }
      if (request?.params?.dynamicPath === "faq") {
        return { key: request?.params?.dynamicPath, data: response?.data?.faq };
      }
      if (request?.params?.dynamicPath === "company-type") {
        return {
          key: "companyType",
          data: response?.data?.companyType,
        };
      }
      return response?.data as any;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

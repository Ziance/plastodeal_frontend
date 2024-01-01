/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit"
// import notify from "devextreme/ui/notify"
import { ErrorResponse } from "../../../services/SuccessResponse"
import {  addAdvertisementAsync, fetchGetAdvertisementBycategoryIdAsync, deleteAdvertisementAsync, EditAdvertisementStatusAsync, fetchGetAllAdvertisementAsync } from "./services"
import {
  AddAdvertisementRequest,
  Advertisement,
  ResponseInfo,
  UserInfo
} from "./types"

export const addAdvertisementAction = createAsyncThunk<UserInfo,AddAdvertisementRequest>(
  "addAdvertisementAction",
  async (request: AddAdvertisementRequest, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await addAdvertisementAsync(request)
      console.log("response addAdvertisementAction", response);
      
      // if (errorResponse?.code) {
      //   if (errorResponse.code === 401) {
      //     // notify("Invalid credential", "error", 2000)
      //   } else if (errorResponse.code === 500) {
      //     // notify("Authentication failed", "error", 2000)
      //   }
      //   // notify(errorResponse.message, "error", 2000)
      //   return rejectWithValue(errorResponse)
      // }
      const userInfo: UserInfo = {
        accessToken: response?.data?.accessToken,
        refreshToken: response?.data?.refreshToken,
        // username: request.email || "",
        token: response?.token 
      }
      return response?.status
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error)
    }
  }
)

export const deleteAdvertisementAction = createAsyncThunk<any, any>(
  "deleteAdvertisementAction",
  async (request, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await deleteAdvertisementAsync(request);
      console.log("response Middleware deleteAdvertisementAction", response);

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


export const fetchGetAdvertisementBycategoryIdAction = createAsyncThunk<Advertisement, any>(
  "fetchGetAdvertisementBycategoryIdAction",
  async (request:any, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await fetchGetAdvertisementBycategoryIdAsync(request);
      console.log("response Middleware ", response);

      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      return response?.data?.advertisement;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const editAdvertisementStatusAction = createAsyncThunk<any, any>(
  "editAdvertisementStatusAction",
  async (request, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await EditAdvertisementStatusAsync(request);
      const errorResponse = response as ErrorResponse;
      return response?.data as any;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const fetchGetAllAdvertisementAction = createAsyncThunk<any, undefined>(
  "fetchGetAllAdvertisementAction",
  async (_, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await fetchGetAllAdvertisementAsync()
      console.log("response Middleware ", response);

      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      return response?.data?.ads;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit"
// import notify from "devextreme/ui/notify"
import { ErrorResponse } from "../../../services/SuccessResponse"
import { createAccountAsync, addAdvertisementAsync, fetchGetAdvertisementByCatagoryIdAsync } from "./services"
import {
  ChangePasswordRequest,
  AddAdvertisementRequest,
  Advertisement,
  ResponseInfo,
  SignUpRequest,
  UserInfo,
} from "./types"

export const addAdvertisementAction = createAsyncThunk<UserInfo,AddAdvertisementRequest>(
  "addPostRequirementAction",
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
      return response.status
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error)
    }
  }
)

export const fetchGetAdvertisementByCatagoryIdAction = createAsyncThunk<Advertisement, ResponseInfo>(
  "getAllCatagoriesAction",
  async (request:any, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await fetchGetAdvertisementByCatagoryIdAsync(request);
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

export const changePasswordAction = createAsyncThunk<string, ChangePasswordRequest>(
  "changePasswordAction",
  async (request: ChangePasswordRequest, { rejectWithValue }) => {
    try {
      // const response: string | ErrorResponse = await changePasswordAsync(request)
      const response: string | ErrorResponse = "This is success"
      const errorResponse = response as unknown as ErrorResponse
      if (errorResponse?.code) {
        if (errorResponse.code === 401) {
          // notify("Failed to change password", "error", 2000)
        } else {
          // notify("System Error, Please try again later.", "error", 2000)
        }
        return rejectWithValue(errorResponse)
      }
      // notify("Your password changed successfully.", "success", 2000)
      return response as string
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error)
    }
  }
)

export const createAccountAction = createAsyncThunk<string, SignUpRequest>(
  "signupAction",
  async (request: SignUpRequest, { rejectWithValue }) => {
    try {
      console.log("request",request);
      
      const response: string | ErrorResponse = await createAccountAsync(request)
      // const response: string | ErrorResponse = "This is success"
      const errorResponse = response as unknown as ErrorResponse
      console.log("response",response);
      
      if (errorResponse?.code) {
        if (errorResponse.code === 401) {
         
        } else {
        }
        return rejectWithValue(errorResponse)
      }
      return response as string
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

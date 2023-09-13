/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
// import notify from "devextreme/ui/notify"
import { ErrorResponse } from "../../services/SuccessResponse";
import {
  createAccountAsync,
  loginAsync,
  forgotPasswordAsync,
  updateAccountAsync
} from "./services";
import {
  ChangePasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  ForgotPasswordRequest,
  SignUpRequest,
  UserInfo,
} from "./types";

export const loginAction = createAsyncThunk<UserInfo, LoginRequest>(
  "loginAction",
  async (request: LoginRequest, { rejectWithValue }) => {
    try {
      console.log("log getting inside login action");

      const response: any | ErrorResponse = await loginAsync(request);
      console.log("response.....", response);

      const userInfo: UserInfo = {
        accessToken: response?.data?.jwtToken,
        userId: response?.data?.user?.userId,
        user: response?.data?.user,
        refreshToken: response?.data?.refreshToken,
        username: request.email || "",
        token: response?.token,
      };
    
      let responseData:any ={}
        if (response.status===200 || response.status===204) {
          console.log("user info", userInfo);
          // responseData=userInfo
          return responseData
        }
      
     
      return userInfo;

      // if (errorResponse?.code) {
      //   if (errorResponse.code === 401) {
      //     // notify("Invalid credential", "error", 2000)
      //   } else if (errorResponse.code === 500) {
      //     // notify("Authentication failed", "error", 2000)
      //   }
      //   // notify(errorResponse.message, "error", 2000)
      //   return rejectWithValue(errorResponse)
      // }
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error);
    }
  }
);

export const forgotPasswordAction = createAsyncThunk<
  string,
  ForgotPasswordRequest
>(
  "forgotPasswordAction",
  async (request: ForgotPasswordRequest, { rejectWithValue }) => {
    try {
      const response: string | ErrorResponse = await forgotPasswordAsync(
        request
      );
      // const response: string | ErrorResponse = "This is success"
      const errorResponse = response as unknown as ErrorResponse;
      if (errorResponse?.code) {
        if (errorResponse.code === 401) {
          // notify("No Email ID exist for given username.", "error", 2000)
        } else {
          // notify("System Error, Please try again later.", "error", 2000)
        }
        return rejectWithValue(errorResponse);
      }
      // notify("We've sent a link to reset your password. Check your inbox.", "success", 2000)
      return response as string;
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error);
    }
  }
);
export const resetPasswordAction = createAsyncThunk<
  string,
  ResetPasswordRequest
>(
  "resetPasswordAction",
  async (request: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      // const response: string | ErrorResponse = await resetPasswordAsync(request)
      const response: string | ErrorResponse = "This is success";
      const errorResponse = response as unknown as ErrorResponse;
      if (errorResponse?.code) {
        if (errorResponse.code === 401) {
          // notify("No Email ID exist for given username.", "error", 2000)
        } else {
          // notify("System Error, Please try again later.", "error", 2000)
        }
        return rejectWithValue(errorResponse);
      }
      // notify("We've sent a link to reset your password. Check your inbox.", "success", 2000)
      return response as string;
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error);
    }
  }
);

export const changePasswordAction = createAsyncThunk<
  string,
  ChangePasswordRequest
>(
  "changePasswordAction",
  async (request: ChangePasswordRequest, { rejectWithValue }) => {
    try {
      // const response: string | ErrorResponse = await changePasswordAsync(request)
      const response: string | ErrorResponse = "This is success";
      const errorResponse = response as unknown as ErrorResponse;
      if (errorResponse?.code) {
        if (errorResponse.code === 401) {
          // notify("Failed to change password", "error", 2000)
        } else {
          // notify("System Error, Please try again later.", "error", 2000)
        }
        return rejectWithValue(errorResponse);
      }
      // notify("Your password changed successfully.", "success", 2000)
      return response as string;
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error);
    }
  }
);

export const createAccountAction = createAsyncThunk<string, SignUpRequest>(
  "createAccountAction",
  async (request: SignUpRequest, { rejectWithValue }) => {
    try {
      const response: string | any | ErrorResponse = await createAccountAsync(
        request
      );
      // const response: string | ErrorResponse = "This is success"
      const errorResponse = response as unknown as ErrorResponse;
      if (errorResponse?.code) {
        if (errorResponse.code === 401) {
        } else {
        }
        return rejectWithValue(errorResponse);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateAccountAction = createAsyncThunk<string, any>(
  "updateAccountAction",
  async (request: any, { rejectWithValue }) => {
    try {
      const response: string | ErrorResponse = await updateAccountAsync(
        request
      );
      // const response: string | ErrorResponse = "This is success"
      const errorResponse = response as unknown as ErrorResponse;
      if (errorResponse?.code) {
        if (errorResponse.code === 401) {
        } else {
        }
        return rejectWithValue(errorResponse);
      }
      return response as string;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
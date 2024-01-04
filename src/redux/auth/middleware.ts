/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
// import notify from "devextreme/ui/notify"
import { ErrorResponse } from "../../services/SuccessResponse";
import {
  createAccountAsync,
  loginAsync,
  forgotPasswordAsync,
  updateAccountAsync,
  paymentAsync,
  resetPasswordAsync
} from "./services";
import {
  ChangePasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  ForgotPasswordRequest,
  SignUpRequest,
  UserInfo,
} from "./types";
import { updateUser } from "../../services/token";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const loginAction = createAsyncThunk<UserInfo, LoginRequest>(
  "loginAction",
  async (request: LoginRequest, { rejectWithValue }) => {
    try {
      console.log("log getting inside login action");

      const response: any | ErrorResponse = await loginAsync(request)

      console.log("response", response);

      // .then(({ payload }: any) => {
      //   console.log("payload middle", payload);
      let userInfo: UserInfo;
      if (response?.status === 200) {
        userInfo = {
          accessToken: response?.data?.data?.jwtToken,
          userId: response?.data?.data?.user?.userId,
          user: response?.data?.data?.user,
          refreshToken: response?.data?.data?.refreshToken,
          username: request.email || "",
          token: response?.data?.token,
        };
        setTimeout(() => {
          toast.success("Login successfull")
          return userInfo
        }, 500);
      } else {
        toast.error(response?.data?.message)
        return userInfo = {
          username: "",
          accessToken: "",
          refreshToken: "",
          user: {},
          userId: "",
          avatarUrl: "",
          token: "",
        }
       
      }


      return userInfo;

    } catch (error) {
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
      const response: any | ErrorResponse = await resetPasswordAsync(request)
      // const response: string | ErrorResponse = "This is success";
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
    console.log("request middle", request);

    try {
      const response: string | any | ErrorResponse = await createAccountAsync(
        request
      );
      console.log("response ", response);

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
export const updateAccountAction = createAsyncThunk<any, any>(
  "updateAccountAction",
  async (request: any, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await updateAccountAsync(
        request
      );
      updateUser(response?.data?.data?.user)
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

export const paymentAction = createAsyncThunk<string, string>(
  "paymentAction",
  async (request: string, { rejectWithValue }) => {
    try {
      const response: string | any | ErrorResponse = await paymentAsync(
        request
      );
      console.log("res ==> middle", response);

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
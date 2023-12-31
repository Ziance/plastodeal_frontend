/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit"
// import notify from "devextreme/ui/notify"
import { ErrorResponse } from "../../services/SuccessResponse"
import { createAccountAsync, addPostReqAsync, resetPasswordAsync } from "./services"
import {
  ChangePasswordRequest,
  PostRequirementRequest,
  ResetPasswordRequest,
  SignUpRequest,
  UserInfo,
} from "./types"

export const addPostRequirementAction = createAsyncThunk<UserInfo, PostRequirementRequest>(
  "addPostRequirementAction",
  async (request: PostRequirementRequest, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await addPostReqAsync(request)
      if (response?.status === 200) {
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const resetPasswordAction = createAsyncThunk<string, ResetPasswordRequest>(
  "resetPasswordAction",
  async (request: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await resetPasswordAsync(request)
      // const response: string | ErrorResponse = "This is success"

      const errorResponse = response as unknown as ErrorResponse
      if (errorResponse?.code) {
        if (errorResponse.code === 401) {
          // notify("No Email ID exist for given username.", "error", 2000)
        } else {
          // notify("System Error, Please try again later.", "error", 2000)
        }
        return rejectWithValue(errorResponse)
      }
      // notify("We've sent a link to reset your password. Check your inbox.", "success", 2000)
      return response as string
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error)
    }
  }
)

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

      const response: string | ErrorResponse = await createAccountAsync(request)
      // const response: string | ErrorResponse = "This is success"
      const errorResponse = response as unknown as ErrorResponse

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

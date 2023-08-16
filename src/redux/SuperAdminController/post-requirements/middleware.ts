/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit"
// import notify from "devextreme/ui/notify"
import { ErrorResponse } from "../../../services/SuccessResponse"
import {  addPostReqAsync, getAllPostRequirementsAsync,deletePostAsync } from "./services"
import {
  ChangePasswordRequest,
  PostRequirementRequest,
  ResetPasswordRequest,
  SignUpRequest,
  UserInfo,
} from "./types"

export const addPostRequirementAction = createAsyncThunk<UserInfo,PostRequirementRequest>(
  "addPostRequirementAction",
  async (request: PostRequirementRequest, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await addPostReqAsync(request)
      console.log("response addPostRequirementAction", response);
      
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
        username: request.email || "",
        token: response?.token 
      }
      return userInfo
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error)
    }
  }
)

export const getAllPostRequirementsAction = createAsyncThunk<any, undefined>(
  "getAllPostRequirements",
  async (_, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await getAllPostRequirementsAsync()
      // const response: string | ErrorResponse = "This is success"
      console.log("responjse",response);
      
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
      return response.data
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error)
    }
  }
)

export const deletePostAction = createAsyncThunk<any, any>(
  "deleteUsersAction",
  async (request, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await deletePostAsync(request);
      console.log("response Middleware aaa", response);

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



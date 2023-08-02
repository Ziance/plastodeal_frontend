/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit"
// import notify from "devextreme/ui/notify"
import { ErrorResponse } from "../../../services/SuccessResponse"
import { getCatagoriesByIdAsync, getALLCatagoriesAsync } from "./services"
import {
  ChangePasswordRequest,
  PostRequirementRequest,
  ResetPasswordRequest,
  SignUpRequest,
  UserInfo,
} from "./types"

export const getALLCatagoriesAction = createAsyncThunk<UserInfo,PostRequirementRequest>(
  "getALLCatagoriesAction",
  async (request: PostRequirementRequest, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await getALLCatagoriesAsync(request)
      console.log("response getALLCatagoriesAction", response);
      
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

export const getCatagoriesByIdAction = createAsyncThunk<string, ResetPasswordRequest>(
  "resetPasswordAction",
  async (request: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response: string | ErrorResponse = await getCatagoriesByIdAsync(request)
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

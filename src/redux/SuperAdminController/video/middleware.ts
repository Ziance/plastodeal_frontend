/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit"
// import notify from "devextreme/ui/notify"
import { ErrorResponse } from "../../../services/SuccessResponse"
import { addVideoAsync, getAllVideoAsync,deleteVideoByIdAsync, updateVideoStatusByIdAsync } from "./services"
import {
  AddVideoRequest,
  UserInfo,
} from "./types"

export const getAllVideoAction = createAsyncThunk<any,undefined>(
  "getAllVideoAction",
  async (_, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await getAllVideoAsync()
      console.log("response video", response);
      return response?.data
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error)
    }
  }
)

export const addVideoAction = createAsyncThunk<string, AddVideoRequest>(
  "addVideoAction",
  async (request: AddVideoRequest, { rejectWithValue }) => {
    try {
      const response: string | ErrorResponse = await addVideoAsync(request)
      const errorResponse = response as unknown as ErrorResponse
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse)
      }
      return response as string
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const deleteVideoByIdAction = createAsyncThunk<string, string>(
  "deleteVideByIdAction",
  async (request: string, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await deleteVideoByIdAsync(request)
      // const response: string | ErrorResponse = "This is success"
      console.log("response middile video dele",response);
      
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
      return response?.success as string
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error)
    }
  }
)

export const updateVideoStatusByIdAction = createAsyncThunk<string, string>(
  "updateVideoStatusByIdAction",
  async (request: string, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await updateVideoStatusByIdAsync(request)
      // const response: string | ErrorResponse = "This is success"
      console.log("response middile video status update",response);
      
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
      return response?.success as string
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error)
    }
  }
)


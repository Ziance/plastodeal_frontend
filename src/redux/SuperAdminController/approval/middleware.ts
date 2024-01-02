/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit"
// import notify from "devextreme/ui/notify"
import { ErrorResponse } from "../../../services/SuccessResponse"
import { addPostReqAsync, viewProductByOtpAsync, checkOtpAsync, viewProductWhenLoginAsync, fetchGetApprovalBycategoryIdAsync, addProductAsync, editProductAsync, EditApprovalStatusAsync, deleteApprovalAsync } from "./services"
import {
  ChangePasswordRequest,
  PostRequirementRequest,
  ResetPasswordRequest,
  SignUpRequest,
  Approval,
  ResponseInfo
} from "./types"
import { setCurrentUser } from "./approvalSlice";
import { setUser } from "../../../services/token";

export const addProductAction = createAsyncThunk<any, any>(
  "addProductAction",
  async (request, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await addProductAsync(request);
      const errorResponse = response as ErrorResponse;
      return response;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);
export const getApprovalByCategoryIdAction = createAsyncThunk<Approval, any>(
  "getApprovalByCategoryIdAction",
  async (request: any, { rejectWithValue }) => {
    console.log("request", request);
    try {
      const response: any | ErrorResponse = await fetchGetApprovalBycategoryIdAsync(request);
      console.log("response Middleware ", response);

      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      return response?.data?.product;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);
export const editProductAction = createAsyncThunk<any, any>(
  "addProductAction",
  async (request, { rejectWithValue }) => {
    console.log("request", request);

    try {
      const response: any | ErrorResponse = await editProductAsync(request);
      const errorResponse = response as ErrorResponse;
      return response;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);
export const viewProductByOtpAction = createAsyncThunk<any, any>(
  "viewProductByOtpAction",
  async (request, { rejectWithValue }) => {
    try {
      const response: any = await viewProductByOtpAsync(request);
      if (response?.status === 200) return response;
      return rejectWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);
export const viewProductWhenLoginAction = createAsyncThunk<any, any>(
  "viewProductWhenLoginAction",
  async (request, { rejectWithValue }) => {
    console.log("request", request);

    try {
      const response: any | ErrorResponse = await viewProductWhenLoginAsync(request);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
)


export const checkOtpAction = createAsyncThunk<any, any>(
  "checkOtpAction", async (request, { dispatch, rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await checkOtpAsync(request);
      if (response?.status === 200) {
        await setUser(request.user)
        await dispatch(setCurrentUser(request.user))
        return response;
      }
      return rejectWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const editApprovalStatusAction = createAsyncThunk<any, any>(
  "editApprovalStatusAction",
  async (request, { rejectWithValue }) => {
    console.log("request", request);

    try {
      const response: any | ErrorResponse = await EditApprovalStatusAsync(request);
      const errorResponse = response as ErrorResponse;
      return response;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);
export const deleteApprovalAction = createAsyncThunk<any, any>(
  "deleteApprovalAction",
  async (request, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await deleteApprovalAsync(request);

      const errorResponse = response as ErrorResponse;
      if (errorResponse?.code) {
        return rejectWithValue(errorResponse.message);
      }
      return response;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const addPostRequirementAction = createAsyncThunk<any, PostRequirementRequest>(
  "addPostRequirementAction",
  async (request: PostRequirementRequest, { rejectWithValue }) => {
    try {
      const response: any | ErrorResponse = await addPostReqAsync(request)
      console.log("response addPostRequirementAction", response);
      return response
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error)
    }
  }
)



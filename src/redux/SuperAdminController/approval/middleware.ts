/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit"
// import notify from "devextreme/ui/notify"
import { ErrorResponse } from "../../../services/SuccessResponse"
import { addPostReqAsync,viewProductByOtpAsync,checkOtpAsync,viewProductWhenLoginAsync ,fetchGetApprovalBycategoryIdAsync,addProductAsync, editProductAsync,EditApprovalStatusAsync, deleteApprovalAsync} from "./services"
import {
  ChangePasswordRequest,
  PostRequirementRequest,
  ResetPasswordRequest,
  SignUpRequest,
  Approval,
  ResponseInfo
} from "./types"

export const addProductAction = createAsyncThunk<any, any>(
  "addProductAction",
  async (request, { rejectWithValue }) => {
    console.log("request",request);
    
    try {
      const response: any | ErrorResponse = await addProductAsync(request);
      const errorResponse = response as ErrorResponse;
      return response?.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);
export const  getApprovalByCategoryIdAction = createAsyncThunk<Approval, any>(
  "getApprovalByCategoryIdAction",
  async (request:any, { rejectWithValue }) => {
    console.log("request",request);    
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
    console.log("request",request);
    
    try {
      const response: any | ErrorResponse = await editProductAsync(request);
      const errorResponse = response as ErrorResponse;
      return response?.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);
export const viewProductByOtpAction = createAsyncThunk<any, any>(
  "viewProductByOtpAction",
  async (request, { rejectWithValue }) => {
    console.log("request",request);
    
    try {
      const response: any | ErrorResponse = await viewProductByOtpAsync(request);
      const errorResponse = response as ErrorResponse;
      console.log("middile response approval otp==>",JSON.stringify(response));
      
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);
export const viewProductWhenLoginAction = createAsyncThunk<any, any>(
  "viewProductWhenLoginAction",
  async (request, { rejectWithValue }) => {
    console.log("request",request);
    
    try {
      const response: any | ErrorResponse = await viewProductWhenLoginAsync(request);
      const errorResponse = response as ErrorResponse;
      return response;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
)
export const checkOtpAction = createAsyncThunk<any, any>(
  "checkOtpAction",
  async (request, { rejectWithValue }) => {
    console.log("request",request);
    
    try {
      const response: any | ErrorResponse = await checkOtpAsync(request);
      const errorResponse = response as ErrorResponse;
      console.log("middle response===> ",response.data.details.otp);
      let returnResponse :any = {}
      if (response?.data?.details?.otp?.toString()===request.otp) {
        console.log("true===>");
        
       returnResponse={message:"success", user:request.user}
      } else {
        console.log("false====>");
        
        returnResponse={message:"rejected", user:null}
      };
      return returnResponse;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);
export const editApprovalStatusAction = createAsyncThunk<any, any>(
  "editApprovalStatusAction",
  async (request, { rejectWithValue }) => {
    console.log("request",request);
    
    try {
      const response: any | ErrorResponse = await EditApprovalStatusAsync(request);
      const errorResponse = response as ErrorResponse;
      return response?.data as any;
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

export const addPostRequirementAction = createAsyncThunk<any,PostRequirementRequest>(
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
      // const userInfo: UserInfo = {
      //   accessToken: response?.data?.accessToken,
      //   refreshToken: response?.data?.refreshToken,
      //   username: request.email || "",
      //   token: response?.token 
      // }
      return null
    } catch (error) {
      // notify("System Error, Please try again later.", "error", 2000)
      return rejectWithValue(error)
    }
  }
)



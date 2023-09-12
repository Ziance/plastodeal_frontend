import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { getUser, removeUser, setUser } from "../../../services/token"
import { LoadingState } from "../../../types/AppNav"
import { DashState, UserInfo } from "./types"
import {
  addProductAction,
  checkOtpAction,
  editProductAction,
  getApprovalByCategoryIdAction,
  viewProductByOtpAction,
  viewProductWhenLoginAction
} from "./middleware"

const INITIAL_STATE: DashState = {
  currentUser: getUser(),
  loading: LoadingState.DEFAULT,
  approvalData: [],
  viewByOtpData : [],
  viewByLoginData : [],
  message: ""
}

const dashboardSlice = createSlice({
  name: "Dashboard",
  initialState: INITIAL_STATE,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<LoadingState>) => ({
      ...state,
      loading: payload,
    }),
    logout: (state) => {
      removeUser()
      return { ...state, currentUser: null }
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(loginAction.fulfilled, (state, { payload }: PayloadAction<UserInfo>) => {
    //   setUser(payload)
    //   return { ...state, loading: LoadingState.DEFAULT, currentUser: payload }
    // })
    builder.addCase(getApprovalByCategoryIdAction.fulfilled, (state,{payload}) => ({
      ...state,
      loading: LoadingState.SUCCESS,
      approvalData: payload
    }))
    builder.addCase(addProductAction.fulfilled, (state,{payload}) => ({
      ...state,
      loading: LoadingState.SUCCESS,
      // approvalData: payload
      message:"fullfilled"
    }))
    builder.addCase(viewProductByOtpAction.fulfilled, (state,{payload}) => ({
      ...state,
      loading: LoadingState.SUCCESS,
      viewByOtpData: payload
    }))
    builder.addCase(viewProductWhenLoginAction.fulfilled, (state,{payload}) => ({
      ...state,
      loading: LoadingState.SUCCESS,
      viewByLoginData: payload
    }))
    builder.addCase(checkOtpAction.fulfilled, (state, { payload }: PayloadAction<any>) => {
      console.log("payload==>", payload);
      if (payload?.user) {
        setUser(payload?.user)
      }
      return { ...state, loading: LoadingState.DEFAULT, currentUser: payload }
    })
    builder.addCase(addProductAction.rejected, (state,{payload}) => ({
      ...state,
      loading: LoadingState.SUCCESS,
      // approvalData: payload
      message:"rejected"
    }))
    // builder.addCase(editProductAction.fulfilled, (state,{payload}) => ({
    //   ...state,
    //   loading: LoadingState.SUCCESS,
    //   // approvalData: payload
    //   message:"fullfilled"
    // }))
    // builder.addCase(editProductAction.rejected, (state,{payload}) => ({
    //   ...state,
    //   loading: LoadingState.SUCCESS,
    //   // approvalData: payload
    //   message:"rejected"
    // }))
  },
})

export const { setLoading, logout } = dashboardSlice.actions

export const approvalSelector = (state: RootState) => state?.Approval

export default dashboardSlice.reducer

import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { getUser, removeUser, setUser } from "../../../services/token"
import { LoadingState } from "../../../types/AppNav"
import { DashState, UserInfo } from "./types"
import {
  addProductAction,
  getApprovalByCategoryIdAction
} from "./middleware"

const INITIAL_STATE: DashState = {
  currentUser: getUser(),
  loading: LoadingState.DEFAULT,
  approvalData: [],
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
    builder.addCase(addProductAction.rejected, (state,{payload}) => ({
      ...state,
      loading: LoadingState.SUCCESS,
      // approvalData: payload
      message:"regected"
    }))
  },
})

export const { setLoading, logout } = dashboardSlice.actions

export const approvalSelector = (state: RootState) => state?.Approval

export default dashboardSlice.reducer

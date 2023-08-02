import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { getUser, removeUser, setUser } from "../../../services/token"
import { LoadingState } from "../../../types/AppNav"
import { DashState, UserInfo } from "./types"
import {
  getALLCatagoriesAction,
  getCatagoriesByIdAction,
} from "./middleware"

const INITIAL_STATE: DashState = {
  currentUser: getUser(),
  loading: LoadingState.DEFAULT,
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
    builder.addCase(getALLCatagoriesAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }))
    builder.addCase(getCatagoriesByIdAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }))
  },
})

export const { setLoading, logout } = dashboardSlice.actions

export const SuperAdmindashSelector = (state: RootState) => state?.DashBoard

export default dashboardSlice.reducer

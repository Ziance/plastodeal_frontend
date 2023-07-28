import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../redux/store"
import { getUser, removeUser, setUser } from "../../services/token"
import { LoadingState } from "../../types/AppNav"
import { AuthState, UserInfo } from "./types"
import {
  changePasswordAction,
  createAccountAction,
  loginAction,
  resetPasswordAction,
} from "./middleware"

const INITIAL_STATE: AuthState = {
  currentUser: getUser(),
  loading: LoadingState.DEFAULT,
}

const authSlice = createSlice({
  name: "Auth",
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
    builder.addCase(loginAction.fulfilled, (state, { payload }: PayloadAction<UserInfo>) => {
      setUser(payload)
      return { ...state, loading: LoadingState.DEFAULT, currentUser: payload }
    })
    builder.addCase(resetPasswordAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }))
    builder.addCase(changePasswordAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }))
    builder.addCase(createAccountAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }))
    builder.addCase(loginAction.rejected, (state) => ({ ...state, loading: LoadingState.ERROR }))
    builder.addCase(resetPasswordAction.rejected, (state) => ({
      ...state,
      loading: LoadingState.ERROR,
    }))
    builder.addCase(changePasswordAction.rejected, (state) => ({
      ...state,
      loading: LoadingState.ERROR,
    }))
    builder.addCase(createAccountAction.rejected, (state) => ({
      ...state,
      loading: LoadingState.ERROR,
    }))
  },
})

export const { setLoading, logout } = authSlice.actions

export const authSelector = (state: RootState) => state.Auth

export default authSlice.reducer

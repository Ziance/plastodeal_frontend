import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../redux/store"
import { getUser, removeUser, setUser } from "../../services/token"
import { LoadingState } from "../../types/AppNav"
import { AuthState, UserInfo } from "./types"
import {
  changePasswordAction,
  createAccountAction,
  loginAction,
  paymentAction,
  resetPasswordAction,
} from "./middleware"
import { log } from "console"

const INITIAL_STATE: AuthState = {
  currentUser: getUser(),
  loading: LoadingState.DEFAULT,
  message: "",
  errorMessage: "",
  payment:{}
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
      if (payload.user?.userStatus===true) {
        setUser(payload)
      }
      return { ...state, loading: LoadingState.DEFAULT, currentUser:payload.user?.userStatus===true ? payload :getUser() , message:payload.user?.userStatus===true ? "success" : "rejected" }
    })
    
    builder.addCase(resetPasswordAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }))
    builder.addCase(changePasswordAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }))
    builder.addCase(paymentAction.fulfilled, (state,{payload}: PayloadAction<any>) => {
    
    
      return {  ...state, loading: LoadingState.SUCCESS,payment : payload}
    })
    builder.addCase(createAccountAction.fulfilled, (state,{ payload }: PayloadAction<any>) => {
     return { ...state, loading: LoadingState.DEFAULT,  message: payload.data?.user ? "fullfilled" : "rejected", errorMessage: payload?.message} 
    })
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

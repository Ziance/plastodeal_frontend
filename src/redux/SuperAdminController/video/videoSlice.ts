import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { getUser, removeUser, setUser } from "../../../services/token"
import { LoadingState } from "../../../types/AppNav"
import { DashState, UserInfo } from "./types"
import {
  getAllVideoAction,
  addVideoAction,
  deleteVideoByIdAction
} from "./middleware"

const INITIAL_STATE: DashState = {
  currentUser: getUser(),
  loading: LoadingState.DEFAULT,
  videoData:[]
}

const videoSlice = createSlice({
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
    builder.addCase(getAllVideoAction.fulfilled, (state,{payload}) => ({
      ...state,
      loading: LoadingState.SUCCESS,
      videoData:payload
    }))
    builder.addCase(addVideoAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }))
    builder.addCase(deleteVideoByIdAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }))
    // builder.addCase(loginAction.rejected, (state) => ({ ...state, loading: LoadingState.ERROR }))
    builder.addCase(getAllVideoAction.rejected, (state) => ({
      ...state,
      loading: LoadingState.ERROR,

    }))
    builder.addCase(addVideoAction.rejected, (state) => ({
      ...state,
      loading: LoadingState.ERROR,
    }))
    builder.addCase(deleteVideoByIdAction.rejected, (state) => ({
      ...state,
      loading: LoadingState.ERROR,
    }))
  },
})

export const { setLoading, logout } = videoSlice.actions

export const videoSelector = (state: RootState) => state?.Video

export default videoSlice.reducer

import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { getUser, removeUser, setUser } from "../../../services/token"
import { LoadingState } from "../../../types/AppNav"
import { DashState, UserInfo } from "./types"
import {
  addAdvertisementAction,
  fetchGetAdvertisementBycategoryIdAction,
  fetchGetAllAdvertisementAction,
} from "./middleware"

const INITIAL_STATE: DashState = {
  currentUser: getUser(),
  loading: LoadingState.DEFAULT,
  advertisementData:[],
  allAdvertisementData:[]
}

const advertisementSlice = createSlice({
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
    builder.addCase(addAdvertisementAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }))
   
    builder.addCase(fetchGetAdvertisementBycategoryIdAction.fulfilled, (state,{payload}) => ({
      ...state,
      loading: LoadingState.SUCCESS,
      advertisementData: payload
    }))
    builder.addCase(fetchGetAllAdvertisementAction.fulfilled, (state,{payload}) => ({
      ...state,
      loading: LoadingState.SUCCESS,
      allAdvertisementData: payload
    }))
    
 
  },
})

export const { setLoading, logout } = advertisementSlice.actions

export const advertisementSelector = (state: RootState) => state?.Advertisement

export default advertisementSlice.reducer

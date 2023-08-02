import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { getUser, removeUser, setUser } from "../../../services/token"
import { LoadingState } from "../../../types/AppNav"
import { DashState, UserInfo } from "./types"
import {
  addPostRequirementAction,
  changePasswordAction,
  getAllPostRequirementsAction,
  createAccountAction,
} from "./middleware"

const INITIAL_STATE: DashState = {
  currentUser: getUser(),
  loading: LoadingState.DEFAULT,
}

const postRequirementSlice = createSlice({
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
    builder.addCase(addPostRequirementAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }))
    builder.addCase(getAllPostRequirementsAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }))
    builder.addCase(createAccountAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }))
    // builder.addCase(loginAction.rejected, (state) => ({ ...state, loading: LoadingState.ERROR }))
     
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

export const { setLoading, logout } = postRequirementSlice.actions
export const postRequirementSelector = (state: RootState) => state?.DashBoard
export default postRequirementSlice.reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { getUser, removeUser, setUser } from "../../../services/token"
import { LoadingState } from "../../../types/AppNav"
import { DashState, PostRequirementRequest, UserInfo } from "./types"
import {
  addPostRequirementAction,
  deletePostAction,
  getAllPostRequirementsAction,
} from "./middleware"

const INITIAL_STATE: any = {
  currentUser: getUser(),
  loading: LoadingState.DEFAULT,
  getPostReq: []
}
// const INITIAL_STATE: UserState = {
//   userDetails: [],
//   companyDetails: [],
//   loading: LoadingState.DEFAULT,
// };

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
    builder.addCase(getAllPostRequirementsAction.fulfilled, (state,{payload}) => ({
      ...state,
      getPostReq:payload,
      loading: LoadingState.SUCCESS,
    }))
    builder.addCase(
      deletePostAction.fulfilled,
      (state: any, { payload }: PayloadAction<any>) => ({
        ...state,
        loading: LoadingState.SUCCESS,
        userDetails: state?.userDetails?.filter(
          (row: any) => row._id !== payload._id
        ),
      })
    );
    // builder.addCase(loginAction.rejected, (state) => ({ ...state, loading: LoadingState.ERROR }))
  },
})

export const { setLoading, logout } = postRequirementSlice.actions
export const postRequirementSelector = (state: RootState) => state?.Posts
export default postRequirementSlice.reducer
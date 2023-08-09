import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { removeUser } from "../../../services/token";
import { LoadingState } from "../../../types/AppNav";
import { UserState } from "./types";
import { getUsersAction, postAddUsersAction } from "./middleware";

const INITIAL_STATE: UserState = {
  userDetails: [],
  companyDetails: [],
  loading: LoadingState.DEFAULT,
};

const userSlice = createSlice({
  name: "User",
  initialState: INITIAL_STATE,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<LoadingState>) => ({
      ...state,
      loading: payload,
    }),
    logout: (state) => {
      removeUser();
      return { ...state, currentUser: null };
    },
    deleteUser: (state: any, { payload }: PayloadAction<string>) => {
      const data: any[] = [...state.userDetails];
      const filteredCodes = data.filter((item: any) => item.Id !== payload);
      return {
        ...state,
        codeItems: filteredCodes,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUsersAction.fulfilled,
      (state: any, { payload }: PayloadAction<any>) => ({
        ...state,
        loading: LoadingState.SUCCESS,
        userDetails: payload,
      })
    );
    // builder.addCase(
    //   editUsersStatusAction.fulfilled,
    //   (state: any, { payload }: PayloadAction<any>) => ({
    //     ...state,
    //     loading: LoadingState.SUCCESS,
    //     userDetails: payload,
    //   })
    // );
    builder.addCase(postAddUsersAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }));
  },
});

export const { setLoading, deleteUser } = userSlice.actions;

export const userSelector = (state: RootState) => state?.Users;

export default userSlice.reducer;

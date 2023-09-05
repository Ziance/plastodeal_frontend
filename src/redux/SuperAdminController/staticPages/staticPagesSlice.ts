import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { removeUser } from "../../../services/token";
import { LoadingState } from "../../../types/AppNav";
import { StaticPagesState } from "./types";
import {  getAllStaticPagesAction } from "./middleware";

const INITIAL_STATE: StaticPagesState = {
  staticPagesDetails: [],
  addJobFormdata: [],
  loading: LoadingState.DEFAULT,
};

const staticPagesSlice = createSlice({
  name: "Jobs",
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
  },
  extraReducers: (builder) => {
    builder.addCase(getAllStaticPagesAction.fulfilled, (state,{payload}) => ({
      ...state,
      loading: LoadingState.SUCCESS,
      staticPagesDetails:payload
    }));
    // builder.addCase(updateJobStatusByIdAction.fulfilled, (state) => ({
    //   ...state,
    //   loading: LoadingState.SUCCESS,
    // }));
  },
});

export const { setLoading } = staticPagesSlice.actions;

export const staticPagesSelector = (state: RootState) => state?.StaticPages;

export default staticPagesSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { LoadingState } from "../../../types/AppNav";
import { DashState } from "./types";
import { getAllCatagoriesAction, getCatagoriesByIdAction } from "./middleware";

const INITIAL_STATE: DashState = {
  productDetails: [],
  loading: LoadingState.DEFAULT,
};

const dashboardSlice = createSlice({
  name: "Dashboard",
  initialState: INITIAL_STATE,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<LoadingState>) => ({
      ...state,
      loading: payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCatagoriesAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }));
    builder.addCase(getCatagoriesByIdAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }));
  },
});

export const { setLoading } = dashboardSlice.actions;

export const SuperAdmindashSelector = (state: RootState) => state?.DashBoard;

export default dashboardSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { removeUser } from "../../../services/token";
import { LoadingState } from "../../../types/AppNav";
import { MastersState } from "./types";
import { getMastersData } from "./middleware";

const INITIAL_STATE: MastersState = {
  masterData: [],
  loading: LoadingState.DEFAULT,
};

const jobsSlice = createSlice({
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
    builder.addCase(getMastersData.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }));
  },
});

export const { setLoading } = jobsSlice.actions;

export const userSelector = (state: RootState) => state?.Jobs;

export default jobsSlice.reducer;

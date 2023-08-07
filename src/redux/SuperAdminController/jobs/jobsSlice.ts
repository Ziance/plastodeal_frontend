import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { removeUser } from "../../../services/token";
import { LoadingState } from "../../../types/AppNav";
import { JobsState } from "./types";
import { getJobsAction, postAddJobsAction } from "./middleware";

const INITIAL_STATE: JobsState = {
  jobsDetails: [],
  addJobFormdata: [],
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
    builder.addCase(getJobsAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }));
    builder.addCase(postAddJobsAction.fulfilled, (state) => ({
      ...state,
      loading: LoadingState.SUCCESS,
    }));
  },
});

export const { setLoading } = jobsSlice.actions;

export const userSelector = (state: RootState) => state?.Jobs;

export default jobsSlice.reducer;

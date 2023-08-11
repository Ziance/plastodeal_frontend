import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { removeUser } from "../../../services/token";
import { LoadingState } from "../../../types/AppNav";
import { MastersState } from "./types";
import {
  addMasterAction,
  deleteMasterAction,
  editStatusAction,
  getMastersData,
} from "./middleware";

const INITIAL_STATE: MastersState = {
  masterData: [],
  loading: LoadingState.DEFAULT,
};

const mastersSlice = createSlice({
  name: "Masters",
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
    builder.addCase(
      getMastersData.fulfilled,
      (state: any, { payload }: PayloadAction<any>) => ({
        ...state,
        loading: LoadingState.SUCCESS,
        masterData: payload,
      })
    );
    builder.addCase(
      addMasterAction.fulfilled,
      (state: any, { payload }: PayloadAction<any>) => ({
        ...state,
        loading: LoadingState.SUCCESS,
        masterData: [...state.masterData, payload],
      })
    );
    builder.addCase(
      editStatusAction.fulfilled,
      (state: any, { payload }: PayloadAction<any>) => ({
        ...state,
        loading: LoadingState.SUCCESS,
        masterData: state.masterData.map((row: any) => {
          if (row._id === payload._id) {
            return payload;
          }
          return row;
        }),
      })
    );
    builder.addCase(
      deleteMasterAction.fulfilled,
      (state: any, { payload }: PayloadAction<any>) => ({
        ...state,
        loading: LoadingState.SUCCESS,
        masterData: state.masterData.filter(
          (row: any) => row._id !== payload._id
        ),
      })
    );
  },
});

export const { setLoading } = mastersSlice.actions;

export const mastersSelector = (state: RootState) => state?.Masters;

export default mastersSlice.reducer;

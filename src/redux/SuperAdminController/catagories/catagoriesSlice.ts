import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { removeUser } from "../../../services/token";
import { LoadingState } from "../../../types/AppNav";
import { CatagoryState } from "./types";
import {
  addCatagoryAction,
  deleteCatagoryAction,
  getAllCatagoriesAction,
} from "./middleware";

const INITIAL_STATE: CatagoryState = {
  catagoriesDetails: [],
  companyDetails: [],
  loading: LoadingState.DEFAULT,
};

const CatagorySlice = createSlice({
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
      const data: any[] = [...state.catagoriesDetails];
      const filteredCodes = data.filter((item: any) => item.Id !== payload);
      return {
        ...state,
        codeItems: filteredCodes,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllCatagoriesAction.fulfilled,
      (state: any, { payload }: PayloadAction<any>) => ({
        ...state,
        loading: LoadingState.SUCCESS,
        catagoriesDetails: payload,
      })
    );

    builder.addCase(
      addCatagoryAction.fulfilled,
      (state: any, { payload }: PayloadAction<any>) => ({
        ...state,
        loading: LoadingState.SUCCESS,
        catagoriesDetails: [...state.catagoriesDetails, payload],
      })
    );

    builder.addCase(
      deleteCatagoryAction.fulfilled,
      (state: any, { payload }: PayloadAction<any>) => ({
        ...state,
        loading: LoadingState.SUCCESS,
        catagoriesDetails: state.catagoriesDetails.filter(
          (row: any) => row?._id !== payload?._id
        ),
      })
    );
  },
});

export const { setLoading, deleteUser } = CatagorySlice.actions;

export const catagorySelector = (state: RootState) => state?.Catagory;

export default CatagorySlice.reducer;

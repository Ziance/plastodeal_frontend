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
  allData: {
    country: [],
    state: [],
    city: [],
    faq: [],
    companyType: [],
    banner: [],
  },
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
        allData: {
          ...state.allData,
          [payload.key]: payload.data,
        },
      })
    );

    builder.addCase(
      addMasterAction.fulfilled,
      (state: any, { payload }: PayloadAction<any>) => ({
        ...state,
        loading: LoadingState.SUCCESS,
        allData: {
          ...state.allData,
          [payload.key]: [...state.allData[payload.key], payload.data],
        },
      })
    );
    
    builder.addCase(
      deleteMasterAction.fulfilled,
      (state: any, { payload }: PayloadAction<any>) => ({
        ...state,
        loading: LoadingState.SUCCESS,
        allData: {
          ...state.allData,
          [payload.key]: state.allData[payload.key].filter(
            (row: any) => row._id !== payload.data._id
          ),
        },
      })
    );

    builder.addCase(
      editStatusAction.fulfilled,
      (state: any, { payload }: PayloadAction<any>) => ({
        ...state,
        loading: LoadingState.SUCCESS,
        allData: {
          ...state.allData,
          [payload.key]: state.allData[payload.key].map((row: any) => {
            if (row._id === payload.data._id) {
              return payload.data;
            }
            return row;
          }),
        },
      })
    );
  },
});

export const { setLoading } = mastersSlice.actions;

export const mastersSelector = (state: RootState) => state?.Masters;

export default mastersSlice.reducer;

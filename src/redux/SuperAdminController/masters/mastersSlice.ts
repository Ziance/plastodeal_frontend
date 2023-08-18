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
    setCountryData: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      allData: {
        ...state.allData,
        country: payload,
      },
    }),
    setStatesData: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      allData: {
        ...state.allData,
        state: payload,
      },
    }),
    setCityData: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      allData: {
        ...state.allData,
        city: payload,
      },
    }),
    setFaqData: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      allData: {
        ...state.allData,
        faq: payload,
      },
    }),
    addCountryData: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      allData: {
        ...state.allData,
        country: [...state.allData.country, payload],
      },
    }),
    addStateData: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      allData: {
        ...state.allData,
        state: [...state.allData.state, payload],
      },
    }),
    addCityData: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      allData: {
        ...state.allData,
        city: [...state.allData.city, payload],
      },
    }),
    addFaqData: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      allData: {
        ...state.allData,
        faq: [...state.allData.faq, payload],
      },
    }),

    deleteCountryData: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      allData: {
        ...state.allData,
        country: state.allData.country.filter(
          (row: any) => row._id !== payload._id
        ),
      },
    }),
    deleteStateData: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      allData: {
        ...state.allData,
        state: state.allData.state.filter(
          (row: any) => row._id !== payload._id
        ),
      },
    }),
    deleteCityData: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      allData: {
        ...state.allData,
        city: state.allData.city.filter((row: any) => row._id !== payload._id),
      },
    }),
    deleteFaqData: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      allData: {
        ...state.allData,
        faq: state.allData.faq.filter((row: any) => row._id !== payload._id),
      },
    }),

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
    // builder.addCase(
    //   // getMastersData.fulfilled,(state: any, { payload }: PayloadAction<any>) => ({
    //   //   ...state,
    //   //   loading: LoadingState.SUCCESS,
    //   //   masterData: payload,
    //   // })
    //   // getMastersData.fulfilled,
    //   // (state: any, { payload }: PayloadAction<any>) => ({
    //   //   ...state,
    //   //   loading: LoadingState.SUCCESS,
    //   //   // allData: {
    //   //   //   ...state.allData,
    //   //   //   Object.keys(payload)[0] : []
    //   //   //   // country : payload.country
    //   //   // },
    //   // })
    // );
    // builder.addCase(
    //   addMasterAction.fulfilled,
    //   (state: any, { payload }: PayloadAction<any>) => ({
    //     ...state,
    //     loading: LoadingState.SUCCESS,
    //     allData: [...state.allData, payload],
    //   })
    // );
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

export const {
  setLoading,
  setStatesData,
  setCountryData,
  setFaqData,
  addCountryData,
  addStateData,
  addCityData,
  addFaqData,
  setCityData,
  deleteCountryData,
  deleteCityData,
  deleteFaqData,
  deleteStateData,
} = mastersSlice.actions;

export const mastersSelector = (state: RootState) => state?.Masters;

export default mastersSlice.reducer;

import { LoadingState } from "../../../types/AppNav";

export type MastersState = {
  masterData: MastersDetails[];
  loading: LoadingState;
};

export type MastersDetails = {
  countryName: string;
  stateName: string;
  cityName: string;
  createdAt: string;
  isDelete: boolean;
  status: boolean;
  updatedAt: string;
  userId: string;
  _id: string;
  answer: string;
  question: string;
  companyType: string;
};

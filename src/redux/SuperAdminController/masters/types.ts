import { LoadingState } from "../../../types/AppNav";

export type MastersState = {
  masterData: MastersDetails[];
  loading: LoadingState;
};

export type MastersDetails = {
  id?: any;
  mastersName: string;
};

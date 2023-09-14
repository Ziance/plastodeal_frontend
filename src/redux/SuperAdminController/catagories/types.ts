import { LoadingState } from "../../../types/AppNav";

export type CatagoryState = {
  catagoriesDetails: any[];
  loading: LoadingState;
  companyDetails: ResponseInfo[];
  viewHistory:[]
};

export type CatagoryInfo = {
  name: any;
  description: any;
  file: any;
};

export type ResponseInfo = {
  // name: any;
  // description: any;
  // file: any;
  formData:any
};


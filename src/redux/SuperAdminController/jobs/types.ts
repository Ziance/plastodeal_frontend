import { LoadingState } from "../../../types/AppNav";

export type JobsState = {
  jobsDetails: JobsInfo[];
  addJobFormdata: AddJobForm[];
  loading: LoadingState;
};

export type JobsInfo = {
  jobType?: any;
  jobCategory: string;
  jobTitle: string;
  jobLocation?: string;
  companyName?: string;
  expiryDate?: string;
  status?: boolean;
  action?: string;
};

export type AddJobForm = {
  jobType?: any;
  jobFunctionArea?: any;
  jobTitle?: any;
  education?: string;
  jobDetails?: string;
  age?: string;
  experience?: string;
  salary?: string;
  jobLocation?: string;
  jobExpirationDate?: string;
  companyName?: string;
  contactPerson?: string;
  phoneNumber?: number;
  email?: string;
  webSite?: string;
};

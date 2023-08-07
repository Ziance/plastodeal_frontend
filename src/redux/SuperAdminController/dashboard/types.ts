import { LoadingState } from "../../../types/AppNav";

export type ProductData = {
  id: string;
  name: string;
  image: string;
};

export type DashState = {
  productDetails: ProductData[];
  loading: LoadingState;
};

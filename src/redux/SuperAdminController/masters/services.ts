import axiosInstance, { isAxiosError } from "../../../services/api";

export const fetchMastersDataAsync = async (category: string) => {
  try {
    const response = await axiosInstance.get<any[]>(`/masters/${category}`);
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};

export const postEditStatusAsync = async (request: any) => {
  try {
    const { params, row } = request;
    const response = await axiosInstance.put(
      `/masters/${params.dynamicPath}/status/${row._id}`,
      {
        status: !row.status,
      }
    );
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};

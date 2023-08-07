
import axiosInstance, { isAxiosError } from "../../../services/api";

export const fetchMastersDataAsync = async (category: string) => {
  try {
    const response = await axiosInstance.get<any[]>(`/masters/${category}`)
    return response.data as any[]
  } catch (err) {
    return isAxiosError(err)
  }
}
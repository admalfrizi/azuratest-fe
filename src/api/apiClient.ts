import axiosInstance from "../lib/axios";

export const apiClient = {
  get: <T>(endpoint: string, params?: Record<string, string | number>) =>
    axiosInstance.get<T>(endpoint, { method: "GET", params }),
  post: <T>(endpoint: string, body: unknown) =>
    axiosInstance.post<T>(endpoint, { method: "POST", body: JSON.stringify(body) }).then((res) => res.data),
  put: <T>(endpoint: string, body: unknown) =>
    axiosInstance.put<T>(endpoint, { method: "PUT", body: JSON.stringify(body) }).then((res) => res.data),
  delete: <T>(endpoint: string) => axiosInstance.delete<T>(endpoint, { method: "DELETE" }).then((res) => res.data),
};
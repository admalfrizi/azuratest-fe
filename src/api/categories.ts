import { CATEGORIES_URL } from "../constants/services";
import type { GetDtlDataParams, GetPaginationParams, UpdateCategoriesParams } from "../types/params";
import apiClient from "../lib/axios";
import type { PaginationDataResponse } from "../types/response";

export type CreateCategoriesInput = {
  name: string;
}

export type UpdateCategoriesInput = Partial<CreateCategoriesInput>;

export const categoriesAPI = {
  getAllData: (params: GetPaginationParams) => apiClient.get<PaginationDataResponse<Categories[]>>(CATEGORIES_URL.LIST_CATEGORY,{ params }),
  getOptionsCategories: () =>  apiClient.get<PaginationDataResponse<Categories[]>>(CATEGORIES_URL.OPTION_CATEGORY),
  getById: (params: GetDtlDataParams) => apiClient.get<Categories>(CATEGORIES_URL.DTL_CATEGORY(params.id)),
  create: (formData: CreateCategoriesInput) => apiClient.post<Categories>(CATEGORIES_URL.LIST_CATEGORY, formData),
  update: (params: UpdateCategoriesParams) => apiClient.put<Categories>(CATEGORIES_URL.DTL_CATEGORY(params.id), params.form),
  delete: (params: GetDtlDataParams) => apiClient.delete<void>(CATEGORIES_URL.DTL_CATEGORY(params.id))
}
import { BOOK_URL } from "../constants/services";
import apiClient from "../lib/axios";
import type { GetPaginationParams, GetDtlDataParams, UpdateBookParams } from "../types/params";

export type CreateBookInput = {
  title: string;
  author: string;
  publisher: string;
  publication_date: string;
  number_of_pages: number;
  category_id: number;
}

export type UpdateBookInput = Partial<CreateBookInput>;

export const bookApi = {
  getAllData: ( params: GetPaginationParams ) => apiClient.get<Book[]>(BOOK_URL.LIST_BOOKS, {
    params
  }),
  getById: (params: GetDtlDataParams) => apiClient.get<Book>(BOOK_URL.DTL_BOOKS(params.id)),
  create: (formData: CreateBookInput) => apiClient.post<Book>(BOOK_URL.LIST_BOOKS, formData),
  update: (params: UpdateBookParams) => apiClient.put<Book>(BOOK_URL.DTL_BOOKS(params.id), params.formData),
  delete: (params: GetDtlDataParams) => apiClient.delete<void>(BOOK_URL.DTL_BOOKS(params.id))
}
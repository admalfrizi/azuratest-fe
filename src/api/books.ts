import { BOOK_URL } from "../constants/services";
import apiClient from "../lib/axios";

interface GetBooksParams {
  page: number;
  perPage: number;
}

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
  getAllData: ( params: GetBooksParams ) => apiClient.get<Book[]>(BOOK_URL.LIST_BOOKS, {
    params
  })
}
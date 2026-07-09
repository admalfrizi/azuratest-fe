import type { UpdateBookInput } from "../api/books";
import type { UpdateCategoriesInput } from "../api/categories";

export type GetPaginationParams = {
    page: number;
    perPage: number;
    category_id?: number;
    search?: string;
    publication_date?: string;
}

export interface GetDtlDataParams {
    id: number
}

export interface GetPublicationDatesParams {
    category_id?: number;
    search?: string
}

export interface UpdateBookParams {
    id: number,
    formData: UpdateBookInput
}

export interface UpdateCategoriesParams {
    id: number,
    form: UpdateCategoriesInput
}
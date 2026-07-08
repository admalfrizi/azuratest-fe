import type { UpdateBookInput } from "../api/books";
import type { UpdateCategoriesInput } from "../api/categories";

export interface GetPaginationParams {
    page: number;
    perPage: number;
}

export interface GetDtlDataParams {
    id: number
}

export interface UpdateBookParams {
    id: number,
    formData: UpdateBookInput
}

export interface UpdateCategoriesParams {
    id: number,
    form: UpdateCategoriesInput
}
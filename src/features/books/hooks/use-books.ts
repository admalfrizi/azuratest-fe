import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookApi, type CreateBookInput } from "../../../api/books";
import type { GetDtlDataParams, GetPaginationParams } from "../../../types/params";
import { categoriesAPI } from "../../../api/categories";
import { useFetch } from "../../../lib/fetch";
import type { PaginationDataResponse } from "../../../types/response";
 
export const bookKeys = {
    all: (params?: GetPaginationParams) => ["books", params] as const,
    categoriesOption: () => ["categories"],
    detail: (id: number) => ["books", id] as const
};

export function useCategoryOption() {
    return useFetch(
        bookKeys.categoriesOption(),
        () => categoriesAPI.getOptionsCategories()
    );
}

export function useBooks(
    params: GetPaginationParams
) {
    return useFetch<PaginationDataResponse<Book[]>>(
        bookKeys.all(params),
        () => bookApi.getAllData(params)
    )
}

export function useGetDetailBook(
    params: GetDtlDataParams
) {
    return useQuery({
        queryKey: bookKeys.detail(params.id),
        queryFn: () => bookApi.getById(params)
    })
}

export function useCreateBook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateBookInput) => bookApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: bookKeys.all() })
        }
    })
}

export function useDeleteBook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: GetDtlDataParams) => bookApi.delete(params),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: bookKeys.all()})
        }
    })
}
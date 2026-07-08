import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { GetDtlDataParams, GetPaginationParams, UpdateCategoriesParams } from "../../../types/params";
import { categoriesAPI, type CreateCategoriesInput } from "../../../api/categories";
import { useFetch } from "../../../lib/fetch";
import type { PaginationDataResponse } from "../../../types/response";

export const categoryKeys = {
  all: () => ["categories"] as const, 
  list: (page?: number, perPage?: number) => [...categoryKeys.all(), "list", page, perPage] as const,
  detail: (id: number) => ["categories", id] as const,
};

export function useCategories(
    params: GetPaginationParams
) {
    return useFetch<PaginationDataResponse<Categories[]>>(
        categoryKeys.list(params.page, params.perPage),
        () => categoriesAPI.getAllData(params)
    )
}

export function useDeleteCategory(params: GetPaginationParams) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: GetDtlDataParams) => categoriesAPI.delete(params),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: categoryKeys.list(params.page, params.perPage)})
        }
    })
}

export function useCreateCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateCategoriesInput) => categoriesAPI.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryKeys.all() });
        },
        //onError: (error: Error) => toast.error(error.message),
    });
}

export function useUpdateCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: UpdateCategoriesParams) => categoriesAPI.update(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryKeys.all() });
        },
        //onError: (error: Error) => toast.error(error.message),
    });
}


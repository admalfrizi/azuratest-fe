import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetDtlDataParams, GetPaginationParams } from "../../../types/params";
import { categoriesAPI } from "../../../api/categories";

export const categoryKeys = {
  all: (page: number, perPage: number) => ["categories", page, perPage] as const,
  detail: (id: number) => ["categories", id] as const,
};

export function useCategories(
    params: GetPaginationParams
) {
    return useQuery({
        queryKey: categoryKeys.all(params.page, params.perPage),
        queryFn: () => categoriesAPI.getAllData(params),
        placeholderData: keepPreviousData,
    })
}

export function useDeleteCategory(params: GetPaginationParams) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: GetDtlDataParams) => categoriesAPI.delete(params),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: categoryKeys.all(params.page, params.perPage)})
        }
    })
}


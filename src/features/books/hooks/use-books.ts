import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookApi, type CreateBookInput } from "../../../api/books";
import type { GetDtlDataParams, GetPaginationParams } from "../../../types/params";
 
export const bookKeys = {
    all: ["books"] as const,
    detail: (id: number) => ["books", id] as const
};

export function useBooks(
    params: GetPaginationParams
) {
    return useQuery({
        queryKey: bookKeys.all,
        queryFn: () => bookApi.getAllData(params),
    })
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
            queryClient.invalidateQueries({ queryKey: bookKeys.all })
        }
    })
}
import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../../../api/books";
import type { GetBooksParams } from "../../../types/params";
 
export const bookKeys = {
    all: ["books"] as const,
    detail: (id: number) => ["books", id] as const
};

export function useBooks(
    params: GetBooksParams
) {
    return useQuery({
        queryKey: bookKeys.all,
        queryFn: () => bookApi.getAllData(params),
    })
}

export function use
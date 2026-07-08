import { useQuery } from "@tanstack/react-query";
import type { GetPaginationParams } from "../../../types/params";
import { categoriesAPI } from "../../../api/categories";

export const categoryKeys = {
  all: ["categories"] as const,
  detail: (id: number) => ["categories", id] as const,
};

export function useCategories(
    params: GetPaginationParams
) {
    return useQuery({
        queryKey: categoryKeys.all,
        queryFn: () => categoriesAPI.getAllData(params),
    })
}


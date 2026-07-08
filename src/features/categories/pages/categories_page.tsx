import { useMemo, useState } from 'react';
import { DataTable } from '../../../components/data-table/data-table';
import type { PaginationState } from "@tanstack/react-table";
import { useCategories } from '../hooks/use-categories';
import type { GetPaginationParams } from '../../../types/params';
import { categorieskColumns } from '../components/category-column';

const CategoriesPage = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const pageParams: GetPaginationParams = {
        page: pagination.pageIndex + 1,
        perPage: pagination.pageSize
    }

    const { data , isLoading, isError } = useCategories(pageParams);
    const categoriesData = useMemo(() => data?.data ?? [], [data]);
    const meta = useMemo(() => data?.meta, [data]);

    const pageCount = useMemo(() => {
        if (meta?.totalPages) return meta.totalPages;
        if (meta?.totalCount) return Math.ceil(meta.totalCount / pagination.pageSize);
        return -1;
    }, [meta, pagination.pageSize]);

    return (
        <div className="container mx-auto py-8">
            <DataTable 
                columns={categorieskColumns} 
                data={categoriesData as Categories[]}
                isLoading={isLoading}
                isError={isError}
                manualPagination
                pageCount={pageCount}
                pagination={pagination}
                onPaginationChange={setPagination}                
            />
        </div>
    );
};

export default CategoriesPage;
import { useMemo, useState } from 'react';
import { DataTable } from '../../../components/data-table/data-table';
import type { PaginationState } from "@tanstack/react-table";
import { useCategories, useDeleteCategory } from '../hooks/use-categories';
import type { GetPaginationParams } from '../../../types/params';
import { categoryColumns } from '../components/category-column';
import { Button } from '../../../components/ui/button';

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
    const deleteMutation = useDeleteCategory(pageParams);

    const categoriesData = useMemo(() => data?.data ?? [], [data]);
    const meta = useMemo(() => data?.meta, [data]);

    const pageCount = useMemo(() => {
        if (meta?.totalPages) return meta.totalPages;
        if (meta?.totalCount) return Math.ceil(meta.totalCount / pagination.pageSize);
        return -1;
    }, [meta, pagination.pageSize]);

    const columns = useMemo(
        () => categoryColumns({
            onEdit: (category) => console.log("edit", category), // open your edit modal/route here
            onDelete: (category) => {
                if (confirm(`Hapus "${category.name}"?`)) deleteMutation.mutate({ id: category.id });
            },
        }),
        [deleteMutation]
    );

    return (
        <div className="container mx-auto py-8">'
            <Button size="lg" className="mb-4">
                Tambah Data
            </Button>
            <DataTable 
                columns={columns} 
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
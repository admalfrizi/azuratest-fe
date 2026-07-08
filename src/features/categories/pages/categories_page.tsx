import React, { useState } from 'react';
import { DataTable } from '../../../components/data-table/data-table';
import type { PaginationState } from "@tanstack/react-table";
import { useCategories } from '../hooks/use-categories';
import type { GetPaginationParams } from '../../../types/params';
import { categorieskColumns } from '../components/category-column';

const CategoriesPage = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const pageParams: GetPaginationParams = {
        page: pagination.pageIndex + 1,
        perPage: pagination.pageSize
    }

    const { data: categories, isLoading, isError } = useCategories(pageParams);

    return (
        <div className="container mx-auto py-8">
            <DataTable 
                columns={categorieskColumns} 
                data={categories?.data!!}
                isLoading={isLoading}
                isError={isError}
                manualPagination
                pagination={pagination}
                pageCount={categories?.meta.totalPages ?? 0}
                onPaginationChange={setPagination}                
            />
        </div>
    );
};

export default CategoriesPage;
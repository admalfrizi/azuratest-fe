import { useMemo, useState } from 'react';
import { DataTable } from '../../../components/data-table/data-table';
import type { PaginationState } from "@tanstack/react-table";
import { useCategories, useDeleteCategory } from '../hooks/use-categories';
import type { GetPaginationParams } from '../../../types/params';
import { categoryColumns } from '../components/category-column';
import { Button } from '../../../components/ui/button';
import { ConfirmDialog } from '../../../components/alert-dialog/confirm-dialog';
import { CategoryFormDialog } from '../components/category-form-dialog';

const CategoriesPage = () => {
    const [formOpen, setFormOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Categories | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<Categories | null>(null);

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
            onEdit: (category) => openEditForm(category), // open your edit modal/route here
            onDelete: (category) => setDeletingCategory(category),
        }),
        [deleteMutation]
    );

    const openCreateForm = () => {
        setEditingCategory(null);
        setFormOpen(true);
    };

    const openEditForm = (category: Categories) => {
        setEditingCategory(category);
        setFormOpen(true);
    };

    return (
        <>
            <div className="container mx-auto py-8">'
                <Button size="lg" className="mb-4" onClick={openCreateForm}>
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
            <CategoryFormDialog open={formOpen} onOpenChange={setFormOpen} category={editingCategory} />
            <ConfirmDialog
                open={Boolean(deletingCategory)}
                onOpenChange={(open) => !open && setDeletingCategory(null)}
                title="Delete this category?"
                description={`"${deletingCategory?.name}" will be permanently removed. Books using this category will need to be reassigned.`}
                isPending={deleteMutation.isPending}
                onConfirm={() => {
                if (deletingCategory) {
                    deleteMutation.mutate({ id: deletingCategory.id }, {
                    onSuccess: () => setDeletingCategory(null),
                    });
                }
                }}
            />
        </>
    );
};

export default CategoriesPage;
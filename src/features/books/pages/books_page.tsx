import { useMemo, useState } from 'react';
import { useBooks, useCategoryOption, useDeleteBook } from '../hooks/use-books';
import FilterGroup from '../../../components/filter/filter_group';
import type { PaginationState } from '@tanstack/react-table';
import type { GetPaginationParams } from '../../../types/params';
import { DataTable } from '../../../components/data-table/data-table';
import { bookColumns } from '../components/book-column';
import { ConfirmDialog } from '../../../components/alert-dialog/confirm-dialog';
import { BookFormDialog } from '../components/book-form-dialog';

const BooksPage = () => {
    const [formOpen, setFormOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [deletingBook, setDeletingBook] = useState<Book | null>(null);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const pageParams: GetPaginationParams = {
        page: pagination.pageIndex + 1,
        perPage: pagination.pageSize,
        ...(selectedCategoryId && { category_id: selectedCategoryId }),
    }

    const { data, isLoading, isError} = useBooks(pageParams);
    const { data: categoryData } = useCategoryOption();
    const deleteMutation = useDeleteBook();

    const books = useMemo(() => data?.data ?? [], [data]);
    const meta = useMemo(() => data?.meta, [data]);

    const columns = useMemo(
        () => bookColumns({
            onEdit: (book) => openEditForm(book),
            onDelete: (book) => setDeletingBook(book),
        }),
        [deleteMutation]
    );

    const pageCount = useMemo(() => {
        if (meta?.totalPages) return meta.totalPages;
        if (meta?.totalCount) return Math.ceil(meta.totalCount / pagination.pageSize);
        return -1;
    }, [meta, pagination.pageSize]);

    const categories = useMemo(() => {
        if (!categoryData?.data) return [];
        
        return categoryData.data?.map((cat: any) => ({
            id: cat.id,
            name: cat.name 
        }));
    }, [categoryData]);

    const openCreateForm = () => {
        setEditingBook(null);
        setFormOpen(true);
    };

    const openEditForm = (book: Book) => {
        setEditingBook(book);
        setFormOpen(true);
    };
    
    return (
        <div className="container mx-auto py-8">
            <div className='flex flex-col gap-y-5'>
                <FilterGroup 
                    categories={categories}
                    selectedCategoryId={selectedCategoryId}
                    onSelectCategory={setSelectedCategoryId}
                    selectedTime={selectedTime}
                    onSelectTime={setSelectedTime}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    openCreateForm={openCreateForm}
                />
                <DataTable
                    columns={columns} 
                    data={books as Book[]}  
                    isLoading={isLoading}
                    isError={isError}
                    manualPagination
                    pageCount={pageCount}
                    pagination={pagination}
                    onPaginationChange={setPagination}              
                />
            </div>
            <BookFormDialog open={formOpen} onOpenChange={setFormOpen} book={editingBook} />
            <ConfirmDialog
                open={Boolean(deletingBook)}
                onOpenChange={(open) => !open && setDeletingBook(null)}
                title="Delete this Book ?"
                description={`"${deletingBook?.title}" book will be permanently removed. Are you sure to execute this one ?`}
                isPending={deleteMutation.isPending}
                onConfirm={() => {
                    if (deletingBook) {
                        deleteMutation.mutate({ id: deletingBook.id }, {
                            onSuccess: () => setDeletingBook(null),
                        });
                    }
                }}
            />
        </div>
    );
};

export default BooksPage;
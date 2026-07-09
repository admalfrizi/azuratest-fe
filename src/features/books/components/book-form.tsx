import { useForm } from "react-hook-form";
import { FieldGroup } from "../../../components/ui/field";
import { Button } from "../../../components/ui/button";
import { DialogFooter } from "../../../components/ui/dialog";
import { bookSchema, type BookFormValues } from "../../../lib/validations";
import { useCreateBook, useUpdateBook } from "../hooks/use-books";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { BookFormInput } from "./book-form-input";
import { BookFormSelect } from "./book-form-select";
import { BookFormDate } from "./book-form-date";

export interface CategoryOption {
    id: number;
    name: string;
}

interface BookFormProps {
    book?: Book | null;
    isEditMode: boolean;
    categories: CategoryOption[];
    onSuccess: () => void;
    onCancel: () => void;
}

export function BookForm({ book, isEditMode, categories, onSuccess, onCancel }: BookFormProps) {
    const createMutation = useCreateBook();
    const updateMutation = useUpdateBook();

    const { 
        control, 
        handleSubmit, 
        reset
    } = useForm<BookFormValues>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: "", 
            author: "", 
            publisher: "", 
            publication_date: "", 
            number_of_pages: 0, 
            category_id: isEditMode && book ? book.category.id : undefined,
        }
    });

    useEffect(() => {
        if (book) {
            reset({
                title: book.title,
                author: book.author,
                publisher: book.publisher,
                publication_date: book.publication_date ? book.publication_date.split('T')[0] : "",
                number_of_pages: book.number_of_pages,
                category_id: book.category.id,
            });
        } else {
            reset({
                title: "", author: "", publisher: "", publication_date: "", number_of_pages: 0,
                category_id: categories.length > 0 ? categories[0].id : 0, 
            });
        }
    }, [book, categories, reset]);

    const onSubmit = (data: BookFormValues) => {
        if (isEditMode && book) {
            updateMutation.mutate(
                { id: book.id, formData: data },
                { onSuccess: onSuccess }
            );
        } else {
            createMutation.mutate(
                data,
                { onSuccess: onSuccess }
            );
        }
    };

    const isPending = createMutation.isPending || updateMutation.isPending;
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FieldGroup>
                    <BookFormInput 
                        control={control}
                        name="title" 
                        label={"Judul Buku"} 
                        isPending={isPending}                        
                    />
                    <BookFormInput 
                        control={control}
                        name="author" 
                        label={"Penulis Buku"} 
                        isPending={isPending}                        
                    />
                    <BookFormInput 
                        control={control}
                        name="publisher" 
                        label={"Penerbit"} 
                        isPending={isPending}                        
                    />
                    <BookFormDate 
                        control={control}
                        name="publication_date" 
                        label="Tanggal Publikasi" 
                        isPending={isPending}                        
                    />
                    <BookFormSelect 
                        control={control}
                        name="category_id"
                        label="Kategori"
                        placeholder="Pilih Kategori"
                        isPending={isPending}
                        options={categories}
                    />
                    <BookFormInput 
                        control={control}
                        name="number_of_pages" 
                        label={"Jumlah Halaman"} 
                        isPending={isPending}  
                        type="number"                      
                    />
                </FieldGroup>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Batal
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : isEditMode ? "Simpan Perubahan" : "Buat Data"}
                    </Button>
                </DialogFooter>
            </form>
        </div>
    );
}
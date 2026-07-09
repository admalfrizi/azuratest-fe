import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { BookForm } from "./book-form";

interface CategoryOption {
    id: number;
    name: string;
}

interface BookFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    book?: Book | null;
    categories: CategoryOption[];
}

export function BookFormDialog({open, onOpenChange, book, categories}: BookFormDialogProps) {
    const isEditMode = Boolean(book);
    const handleSuccess = () => onOpenChange(false);
    const handleCancel = () => onOpenChange(false);
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Ubah Data Buku" : "Tambah Buku Baru"}</DialogTitle>
                    <DialogDescription>
                        {isEditMode ? "Melakukan perubahan pada data buku" : "Menambahkan nama data buku baru"}
                    </DialogDescription>
                </DialogHeader>
                {open && (
                    <BookForm 
                        book={book}
                        isEditMode={isEditMode}
                        categories={categories}
                        onSuccess={handleSuccess} 
                        onCancel={handleCancel}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}
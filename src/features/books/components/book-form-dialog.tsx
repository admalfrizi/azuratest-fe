import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog";


interface BookFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    book?: Book | null;
}

export function BookFormDialog({open, onOpenChange, book}: BookFormDialogProps) {
    const isEditMode = Boolean(book);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Ubah Data Buku" : "Tambah Buku Baru"}</DialogTitle>
                    <DialogDescription>
                        {isEditMode ? "Melakukan perubahan pada data buku" : "Menambahkan nama data buku baru"}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
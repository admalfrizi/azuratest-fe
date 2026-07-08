import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useCreateCategory, useUpdateCategory } from "../hooks/use-categories";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../../components/ui/field";
import { categorySchema, type CategoryFormValues } from "../../../lib/validations";

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Categories | null;
}

export function CategoryFormDialog({ open, onOpenChange, category }: CategoryFormDialogProps) {
  const isEditMode = Boolean(category);
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  const { control, handleSubmit, reset } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: category?.name ?? ""
      });
    }
  }, [open, category, reset]);

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (values: CategoryFormValues) => {
    if (isEditMode && category) {
      updateMutation.mutate(
        { id: category.id, form: values },
        { onSuccess: () => onOpenChange(false) }
      );
    } else {
      createMutation.mutate(values, { onSuccess: () => onOpenChange(false) });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Ubah Nama Kategori" : "Tambah Kategori Baru"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Melakukan perubahan data kategori" : "Menambahkan nama data kategori baru"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="category-name">
                                Name Kategori
                            </FieldLabel>
                            <Input
                                {...field}
                                id="category-name"
                                aria-invalid={fieldState.invalid}
                                placeholder="e.g., Science Fiction"
                                autoComplete="off"
                                disabled={isPending}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : isEditMode ? "Save changes" : "Create"}
              </Button>
            </DialogFooter>
          </form>
      </DialogContent>
    </Dialog>
  );
}
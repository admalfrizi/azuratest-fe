import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100)
});

export const bookSchema = z.object({
  title: z.string().min(1, "Judul buku wajib diisi"),
  author: z.string().min(1, "Penulis wajib diisi"),
  publisher: z.string().min(1, "Penerbit wajib diisi"),
  publication_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal tidak valid"),
  number_of_pages: z.number().int().positive("Jumlah halaman minimal 1"),
  category_id: z.number().int().positive("Kategori wajib dipilih"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
export type BookFormValues = z.infer<typeof bookSchema>;
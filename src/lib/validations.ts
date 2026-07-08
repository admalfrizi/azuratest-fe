import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100)
});

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  author: z.string().min(1, "Author is required").max(255),
  isbn: z.string().min(10, "ISBN must be at least 10 characters").max(20),
  publishedYear: z.coerce
    .number()
    .int()
    .min(1000, "Enter a valid year")
    .max(new Date().getFullYear(), "Year can't be in the future"),
  categoryId: z.coerce.number().int().positive("Select a category"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
export type BookFormValues = z.infer<typeof bookSchema>;
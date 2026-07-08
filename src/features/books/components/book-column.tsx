"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header"
import { DataTableRowActions } from "../../../components/data-table/data-table-row-actions"

interface BookColumnsOptions {
  onEdit?: (book: Book) => void
  onDelete?: (book: Book) => void
}

export function bookColumns({ onEdit, onDelete }: BookColumnsOptions = {}): ColumnDef<Book>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
    },
    {
      accessorKey: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Buku" />,
    },
    {
      accessorKey: "author",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Penulis Buku" />,
    },
    {
      accessorKey: "category",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Kategori" />,
    },
    {
      accessorKey: "publisher",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Penerbit" />,
    },
    {
      accessorKey: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <DataTableRowActions
          onEdit={onEdit ? () => onEdit(row.original) : undefined}
          onDelete={onDelete ? () => onDelete(row.original) : undefined}
        />
      ),
    },
  ]
}
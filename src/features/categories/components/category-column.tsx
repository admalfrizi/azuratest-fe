"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header"
import { DataTableRowActions } from "../../../components/data-table/data-table-row-actions"

interface CategoryColumnsOptions {
  onEdit?: (category: Categories) => void
  onDelete?: (category: Categories) => void
}

export function categoryColumns({ onEdit, onDelete }: CategoryColumnsOptions = {}): ColumnDef<Categories>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Kategori" />,
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
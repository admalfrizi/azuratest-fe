"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header"

export const categorieskColumns: ColumnDef<Categories>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Kategori" />,
  },
  {
    accessorKey: "number_of_pages",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Number of Page" />,
  }
]
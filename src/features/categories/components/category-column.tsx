"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header"

export const categorieskColumns: ColumnDef<Categories>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Kategori" />,
  },
  {
    accessorKey: "action",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Action" />,
  }
]
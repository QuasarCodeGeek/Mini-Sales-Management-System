import { router } from '@inertiajs/react';
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

export type Product = {
    id: number,
    name: string,
    price: number,
    stock: number
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "Product ID",
        enableMultiSort: true,
    },
    {
        accessorKey: "name",
        header: "Name",
        enableMultiSort: true,
    },
    {
        accessorKey: "sku",
        header: "SKU",
        enableMultiSort: true,
    },
    {
        accessorKey: "price",
        header: "Price",
        enableMultiSort: true,
        cell: ({row}) => (
            <span>
                ₱ {row.original.price}
            </span>
        )
    },
    {
        accessorKey: "stock",
        header: "Stock",
        enableMultiSort: true,
        cell: ({row}) => (
            <span className={row.original.stock < 10 ? 'text-red-500' : ''}>
                {row.original.stock}
            </span>
        )
    },
    {
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button 
                onClick={() => router.get(`/products/${row.original.id}/edit`)}
                variant={"default"}
                size={"sm"}>Edit</Button>
                <Button
                variant={"destructive"}
                size={"sm"}>Delete</Button>
            </div>
        )
    }
]
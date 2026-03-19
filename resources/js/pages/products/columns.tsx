import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { router } from '@inertiajs/react';

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
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "sku",
        header: "SKU",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({row}) => (
            <span>
                ₱ {row.original.price}
            </span>
        )
    },
    {
        accessorKey: "stock",
        header: "Stock",
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
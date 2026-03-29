import { router } from '@inertiajs/react';
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

export type Product = {
    id: number,
    customer: {
        name: string
    },
    total_amount: number
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "Transaction ID",
        enableMultiSort: true,
    },
    {
        accessorKey: "customer.name",
        header: "Customer",
        enableMultiSort: true,
    },
    {
        accessorKey: "total_amount",
        header: "Total Amount",
        enableMultiSort: true,
    },
    {
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button 
                onClick={() => router.get(`/sales/${row.original.id}/edit`)}
                variant={"default"}
                size={"sm"}>Edit</Button>
                <Button
                variant={"destructive"}
                size={"sm"}>Delete</Button>
            </div>
        )
    }
]
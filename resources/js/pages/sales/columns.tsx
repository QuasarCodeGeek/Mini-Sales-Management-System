import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { router } from '@inertiajs/react';

export type Product = {
    id: number,
    customer_id: number,
    total_amount: number
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "Transaction ID",
    },
    {
        accessorKey: "customer_id",
        header: "Customer",
    },
    {
        accessorKey: "total_amount",
        header: "Total Amount",
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
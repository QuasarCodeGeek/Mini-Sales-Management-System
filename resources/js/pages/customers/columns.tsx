import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { router } from '@inertiajs/react';

export type Customer = {
    id: number
    name: string
    contact: string
    address: string
}

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "id",
        header: "Customer ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "contact",
        header: "Contact",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button 
                onClick={() => router.get(`/customers/${row.original.id}/edit`)}
                variant={"default"}
                size={"sm"}>Edit</Button>
                <Button
                variant={"destructive"}
                size={"sm"}>Delete</Button>
            </div>
        )
    }
]
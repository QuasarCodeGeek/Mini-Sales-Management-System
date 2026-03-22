import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState
} from "@tanstack/react-table"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "./ui/select"
import { useState } from "react"
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
// import { Pagination } from "./data-table-pagination"


interface DataTableProps<TData> {
    columns: ColumnDef<TData>[]
    data: TData[]
}

export function DataTable<TData>({
    columns,
    data,
}: DataTableProps<TData>) {

    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageIndex: 0, pageSize: 10 },
            sorting: [ {id: "product_id", desc: true} ]
        },
        getSortedRowModel: getSortedRowModel(), 
    })

    return (
        <div>
            <div className="flex items-center">
                <Input
                    placeholder="Search name..."
                    className="bg-neutral-100 dark:bg-neutral-900 border rounded px-2 py-1 mb-3"
                    onChange={(e) =>
                    table.getColumn("name")?.setFilterValue(e.target.value)
                    }
                />
            </div>

            {/* Pagination */}
            <div className="mb-4">
                <div className="flex items-center justify-between mt-4">
                    {/* Pagination Buttons */}
                    <div className="flex items-center gap-2">
                        <Button variant={"default"}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        >
                        Previous
                        </Button>

                        <Button variant={"default"}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        >
                        Next
                        </Button>
                    </div>

                    {/* Page Info & Page Size Select */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-neutral-500">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </span>

                        <div className="flex items-center gap-2">
                        <span className="text-sm text-neutral-500">Rows per page:</span>
                        <Select
                            value={table.getState().pagination.pageSize.toString()}
                            onValueChange={(value) => table.setPageSize(Number(value))}
                        >
                            <SelectTrigger>
                            <SelectValue placeholder={table.getState().pagination.pageSize.toString()} />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                                {[5, 10, 20, 50].map((size) => (
                                <SelectItem key={size} value={size.toString()}>
                                    {size} rows
                                </SelectItem>
                                ))}
                            </SelectGroup>
                            </SelectContent>
                        </Select>
                        </div>
                    </div>
                </div>
            </div>
            {/* End of Pagination */}

            <div className="overflow-auto">
                <table className="w-full border-collapse text-sm">

                    <thead className="bg-neutral-200 dark:bg-neutral-800 rounded-t rounded-xl">
                        {table.getHeaderGroups().map((hg) => (
                        <tr key={hg.id}>
                            {hg.headers.map((header) => (
                            <th
                                key={header.id}
                                className="p-3 text-left font-semibold cursor-pointer select-none"
                                onClick={header.column.getToggleSortingHandler()} // ✅ toggle sorting
                                >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                
                                {header.column.getIsSorted() === "asc" && <ChevronUp className="inline-block w-4 h-4 ml-1" />}
                                {header.column.getIsSorted() === "desc" && <ChevronDown className="inline-block w-4 h-4 ml-1" />}
                            </th>
                            ))}
                        </tr>
                        ))}
                    </thead>

                    <tbody>
                        { table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                            <tr key={row.id} 
                            className="border-t border-gray-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800/50">
                                {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-3">
                                    {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                    )}
                                </td>
                                ))}
                            </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="p-3 text-center text-neutral-500">
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    )
}
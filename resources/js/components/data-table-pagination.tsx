import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "./ui/select"
import { Table } from "@tanstack/react-table"

type DataTablePaginationProps<T> = {
  table: Table<T>
}

export function Pagination<T>({ table }: DataTablePaginationProps<T>) {

    return (
        <div className="flex items-center justify-between mt-4">
            {/* Pagination Buttons */}
            <div className="flex items-center gap-2">
                <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-2 py-1 border rounded hover:neutral-200 dark:hover:bg-neutral-800"
                >
                Previous
                </button>

                <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-2 py-1 border rounded hover:neutral-200 dark:hover:bg-neutral-800"
                >
                Next
                </button>
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
    )
}
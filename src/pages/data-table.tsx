"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table"

import { cn } from "@/lib/utils"

import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/ui/dropdown-menu"
  
import { Check, ChevronsUpDown } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/popover"


// TODO: get these dynamically
const statuses = [
  {
    value: "complete",
    label: "complete",
  },
  {
    value: "failed",
    label: "failed",
  },
]

const operations = [
  {
    value: "nft-buy",
    label: "nft-buy",
  },
  {
    value: "nft-claim",
    label: "nft-claim",
  },
  {
    value: "nft-open",
    label: "nft-open",
  },
  {
    value: "nft-burn",
    label: "nft-burn",
  },
  {
    value: "nft-transfer",
    label: "nft-transfer",
  },
  {
    value: "nft-redeem",
    label: "nft-redeem",
  },
  {
    value: "nft-offer-redeem",
    label: "nft-offer-redeem",
  }
]


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const [operationOpen, setOperationOpen] = React.useState(false)
    const [operationValue, setOperationValue] = React.useState("")
  

    const [statusOpen, setStatusOpen] = React.useState(false)
    const [statusValue, setStatusValue] = React.useState("")
    

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div>
      <div className="flex items-center py-4 p-0">

      <Popover open={operationOpen} onOpenChange={setOperationOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={operationOpen}
          className="w-[200px] justify-between">
          {operationValue
            ? operations.find((oper) => oper.value === operationValue)?.label
            : "Select action..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Action..." />
          <CommandEmpty>No actions found.</CommandEmpty>
          <CommandGroup>
            {operations.map((oper) => (
              <CommandItem
                key={oper.value}
                value={oper.value}
                onSelect={(currentValue) => {

                  // hide and unhide columns based on operation before we setOperationValue filter
                  if (( operationValue != "nft-offer-redeem" ) && (currentValue == "nft-offer-redeem")) {
                    console.log("nft-offer-redeem, toggleVisibility")

                    table.getColumn("num_minted")?.toggleVisibility(false)
                    table.getColumn("num_burned")?.toggleVisibility(false)
                    table.getColumn("mintedStr")?.toggleVisibility(false)
                    table.getColumn("burnedStr")?.toggleVisibility(false)

                    table.getColumn("offer_id")?.toggleVisibility(true)
                    table.getColumn("contract_addr")?.toggleVisibility(true)
                    table.getColumn("token_id")?.toggleVisibility(true)
                  } else if (( operationValue != "nft-offer-redeem" ) && (currentValue != "nft-offer-redeem")) {
                    console.log("NOT nft-offer-redeem, toggleVisibility")

                    table.getColumn("num_minted")?.toggleVisibility(true)
                    table.getColumn("num_burned")?.toggleVisibility(true)
                    table.getColumn("mintedStr")?.toggleVisibility(true)
                    table.getColumn("burnedStr")?.toggleVisibility(true)

                    table.getColumn("offer_id")?.toggleVisibility(false)
                    table.getColumn("contract_addr")?.toggleVisibility(false)
                    table.getColumn("token_id")?.toggleVisibility(false)
                  }


                  setOperationValue(currentValue === operationValue ? "" : currentValue)
                  table.getColumn("op")?.setFilterValue(currentValue)
                  setOperationOpen(false)

                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    operationValue === oper.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {oper.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>


      <Popover open={statusOpen} onOpenChange={setStatusOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={statusOpen}
          className="w-[200px] justify-between">
          {statusValue
            ? statuses.find((status) => status.value === statusValue)?.label
            : "Select status..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Status..." />
          <CommandEmpty>No status found.</CommandEmpty>
          <CommandGroup>
            {statuses.map((status) => (
              <CommandItem
                key={status.value}
                value={status.value}
                onSelect={(currentValue) => {
                  setStatusValue(currentValue === statusValue ? "" : currentValue)
                  table.getColumn("status")?.setFilterValue(currentValue)
                  setStatusOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    statusValue === status.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {status.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>

      <Input
          placeholder="Filter contract address..."
          value={(table.getColumn("contract_addr")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("contract_addr")?.setFilterValue(event.target.value)
          }
          className="max-w-xs">
        </Input>

        <Input
          placeholder="Filter wallet_addr..."
          value={(table.getColumn("wallet_addr")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("wallet_addr")?.setFilterValue(event.target.value)
          }
          className="max-w-sm">
        </Input>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    <div className="rounded-md border">



      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="font-bold" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="flex-1 text-sm text-muted-foreground">
  {table.getFilteredSelectedRowModel().rows.length} of{" "}
  {table.getFilteredRowModel().rows.length} row(s) selected.
</div>

    <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

    </div>

  )
}

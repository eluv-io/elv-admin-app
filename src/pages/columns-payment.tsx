"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"

import { Badge } from "@/ui/badge"
import { Checkbox } from "@/ui/checkbox"
import { DataTableColumnHeader } from "./data-columns-sort-hide"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

// define an interface for status enum

// generate a type for the actions json
/*     
    {
        "tenant": "iten4TXq2en3qtu3JREnE5tSLRf9zLod",
        "site": "iq__3dpGzS8pinQL7Ryt6VowPt7B2Qga",
        "wallet_addr": "0x153f8690eee74ab3e2b4d899fd85209cfc2012ad",
        "op": "nft-claim",
        "trans_id": "LGtWsPdsZQCPV6dmfjFnYd",
        "status": "complete",
        "timestamp": 1670365113,
        "num_minted": 1,
        "num_burned": 0,
        "client_ref_id": "",
        "status_op": "nft-claim:iq__3dpGzS8pinQL7Ryt6VowPt7B2Qga:Q52E4PbNcptkT69WRteuvj",
        "minted": [
            {
                "prod_name": "",
                "sku": "Q52E4PbNcptkT69WRteuvj",
                "quant": 1
            }
        ]
    },

    */
export type Actions = {
    tenant: string,
    site: string,
    wallet_addr: string,
    op: string,
    trans_id: string,
    status: string,
    timestamp: Date, // number
    num_minted: number,
    num_burned: number,
    client_ref_id: string,
    status_op: string,
    minted: [
        {
            prod_name: string,
            sku: string,
            quant: number
        }
    ],
    burned: [
        {
            name: string,
            contract_addr: string,
            token_id: string
        }
    ]
}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    
  {
    accessorKey: "status",
    header: "Status",
  },
  /*
  {
    accessorKey: "email",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    */
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
          ),
    },
      
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy wallet address
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]


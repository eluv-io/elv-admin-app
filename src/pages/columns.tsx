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

import { z } from "zod"

const baseExplorerUrl : string = "https://eluvio.tryethernal.com"

//  use a Zod schema here if you want.


/*
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}
*/

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



export type Product = {
    prod_name?: string,
    sku: string,
    quant: number
}

export type Minted = {
        name?: string,
        contract_addr: string,
        token_id: string
}

export type Burned = {
    name: string,
    contract_addr: string,
    token_id: string
}


export type Actions = {
    tenant: string,
    site: string,
    wallet_addr: string,
    op: string,
    trans_id: string,
    status: string,
    timestamp: number, // number
    timestampStr?: string,
    num_minted: number,
    num_burned: number,
    purchase_amount?: number,
    purchase_fee?: number,
    purchase_processor?: string,
    client_ref_id: string,
    status_op: string,
    gift_id?: string,
    offer_id?: string,
    contract_addr?: string,
    token_id?: string,
    nft_name?: string,
    products?: Product[],
    productsStr?: string,
    minted?: Minted[],
    mintedStr?: string,
    burned?: Burned[]
    burnedStr?: string
}


// UNUSED thus far
export const ActionSchema = z.object({
    tenant: z.string(),
    site: z.string(),
    wallet_addr: z.string(),
    op: z.string(),
    trans_id: z.string(),
    status: z.string(),
    timestamp: z.number(),
    num_minted: z.number(),
    num_burned: z.number(),
    client_ref_id: z.string(),
    status_op: z.string(),
    minted: z.array(
      z.object({ 
        prod_name: z.string(), 
        sku: z.string(), 
        quant: z.number()
      })
    ),
    burned: z.array(
      z.object({
        name: z.string(),
        contract_addr: z.string(),
        token_id: z.string()
      })
    )
  })


export const ActionsColumns: ColumnDef<Actions>[] = [
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

      /*
    {
        accessorKey: "tenant",
        header: "Tenant",
    },
    */
   {
    accessorKey: "op",
    header: "Operation",
   },
    {
        accessorKey: "status",
        header: "Status",
    },
    /*
    {
      accessorKey: "timestamp",
      header: "Timestamp",
    },
    */

    {
        accessorKey: "timestampStr",
        header: "Date",
    },

    {
        accessorKey: "wallet_addr",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Wallet Address" />
          ),
          cell: ({ row }) => {
            const walletAddr : string = row.getValue("wallet_addr")
            const explorerUrl = baseExplorerUrl + "address/" + walletAddr

            return <div className="text-right font-medium"><a href={explorerUrl} target="_new">{walletAddr}</a></div>
          },  
      
    },

    {
        accessorKey: "num_minted",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Num Minted" />
        ),
    },
    {
        accessorKey: "num_burned",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Num Burned" />
        ),
    },


    /*
    {
        accessorKey: "products",
        header: "Products",
    },
    */  

    /*
    {
      accessorKey: "purchase_fee",
      header: "Fee",
    },
    */
    {
      accessorKey: "purchase_processor",
      header: "Processor",
    },


    
    /*
    {
        accessorKey: "client_ref_id",
        header: "Client Ref ID",
    },
    */
    {
        accessorKey: "status_op",
        header: "Operation Status",
    },
    {
        accessorKey: "gift_id",
        header: "Gift ID",
    },
    {
      accessorKey: "productsStr",
      header: "Products",
    },

    //
    // https://eluvio.tryethernal.com/token/0x8eb1184e1ad4d72c667a64317270aec6509cb931/1
    //
    {
      accessorKey: "minted",
      header: "Token",
      cell: ({ row }) => {
        const mintedArr : string = row.getValue("minted")
        let contractAddr : string = row.getValue("contract_addr")
        let operationUnparsed : string = row.getValue("status_op")
        let operationFirst : string = operationUnparsed.split(":")[0]

        let operationMiddle : string = operationUnparsed.split(":")[1]
        let operationEnd : string = operationUnparsed.split(":")[2]
        
        if (contractAddr == undefined || contractAddr == "") {
          contractAddr = operationMiddle;
        }
        const explorerUrl = baseExplorerUrl + "/token/" + contractAddr + "/" + operationEnd

        // TODO - look at array

        // interate over the array and create a link for each item
        //const mintedItems : Minted[] = JSON.parse(mintedArr)
        //const mintedLinks : string[] = []
        //mintedItems.forEach((mintedItem) => {
        //    mintedLinks.push(<a href={explorerUrl} target="_new">{mintedItem.prod_name}</a>)
        //});

        if (operationFirst == "nft-claim") {
          return <div className="text-left font-medium"></div>
        } else {
          return <div className="text-left font-medium"><a href={explorerUrl} target="_new">{contractAddr} : {operationEnd}</a></div>
        }
      },  

    },
    {
        accessorKey: "mintedStr",
        header: "Minted",
    },
    {
        accessorKey: "burnedStr",
        header: "Burned",
    },
    {
        accessorKey: "offer_id",
        header: "Offer ID",
    },
    {
        accessorKey: "contract_addr",
        header: "Contract Addr",
    },
    {
        accessorKey: "token_id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Token ID" />
        ),

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
    accessorKey: "purchase_amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("purchase_amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      if (formatted == "$NaN" ) {
        return <div className="text-right font-medium"></div>
      } else {
        return <div className="text-right font-medium">{formatted}</div>
      }
    },
  },
  {
    accessorKey: "purchase_fee",
    header: () => <div className="text-right">Fee</div>,
    cell: ({ row }) => {
      const fee = parseFloat(row.getValue("purchase_fee"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(fee)

      if (formatted == "$NaN" ) {
        return <div className="text-right font-medium"></div>
      } else {
        return <div className="text-right font-medium">{formatted}</div>
      }
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const action = row.original
 
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
              onClick={() => navigator.clipboard.writeText(action.trans_id)}
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


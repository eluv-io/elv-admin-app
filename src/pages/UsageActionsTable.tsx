"use client"

import React, { useEffect, useState } from 'react';

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  ArrowLeftRight,
  Blocks,
  Store,
  Check, 
  ChevronsUpDown
} from "lucide-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/popover"

import { Button } from "@/ui/button"

import { Actions, ActionsColumns } from "./columns"
import { DataTable } from "./data-table"

import { cn } from "@/lib/utils"

import { getActionsData } from "./ActionsData"


type ActionsCount = {
  buy: number;
  opened: number;
  claimed: number;
  redeemed: number;
  offer_redeemed: number;
  minted: number;
  burned: number;
  transferred: number;
  gifted: number;
  vote_drop: number;
}

const ActionsPage: React.FC = () => {
  const [data, setData] = useState<Actions[]>([]);

  const [value, setValue] = React.useState("")
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result : Actions[] = await getActionsData();

        let count : ActionsCount = {
          buy: 0,
          opened: 0,
          claimed: 0,
          redeemed: 0,
          offer_redeemed: 0,
          minted: 0,
          burned: 0,
          transferred: 0,
          gifted: 0,
          vote_drop: 0,
        };

        if (result) {
          // iterate over the results and JSON.stringify() the minted and burned arrays
          // so that they can be displayed in the table

          result.forEach((item) => {

            // count operations for dashboard summary
            if (item?.op) {
              switch (item.op) {
                case "nft-buy":
                  count.buy += 1;
                  break;
                case "nft-open":
                  count.opened += 1;
                  break;
                case "nft-claim":
                  count.claimed += 1;
                  break;
                case "nft-redeem":
                  count.redeemed += 1;
                  break;
                case "nft-offer-redeem":
                  count.offer_redeemed += 1;
                  break;
                case "nft-mint":
                  count.minted += 1;
                  break;
                case "nft-burn":
                  count.burned += 1;
                  break;
                case "nft-transfer":
                  count.transferred += 1;
                  break;
                case "nft-gift":
                  count.gifted += 1;
                  break;
                case "nft-vote-drop":
                  count.vote_drop += 1;
                  break;
                default:
                  break;
              }
            }

            // JSON.stringify the, products, minted and burned arrays
            if (item?.products) {
              item.products.forEach((productItem) => {
                if (item.productsStr == undefined) {
                  item.productsStr = "";
                } else {
                  item.productsStr += (item.productsStr == "") ? JSON.stringify(productItem) : ", " + JSON.stringify(productItem) + " ";
                }
              });
            }

            if (item?.minted) {
              item.minted.forEach((mintedItem) => {
                if (item.mintedStr == undefined) {
                  item.mintedStr = "";
                } else {
                  item.mintedStr += (item.mintedStr == "") ? JSON.stringify(mintedItem) : ", " + JSON.stringify(mintedItem) + " ";
                }
              });
            }
            if (item?.burned) {
              item.burned.forEach((burnedItem) => {
                if (item.burnedStr == undefined) {
                  item.burnedStr = "";
                } else {
                  item.burnedStr += (item.burnedStr == "") ? JSON.stringify(burnedItem) : ", " + JSON.stringify(burnedItem) + " ";
                }
              }); 
            }

            // convert the unix timestamp to a date string including the time of day

            if (item?.timestamp) {
              const date = new Date(item.timestamp * 1000);
              item.timestampStr = date.toLocaleDateString("en-US");
              item.timestampStr += " " + date.toLocaleTimeString("en-US");
            }
            /* date of week option
            if (item?.timestamp) {
              item.timestampStr = new Date(item.timestamp * 1000).toDateString();
            }
            */


          });
        }

        setData(result);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchData();

    
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
 
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  

  }, []);


  
  return (
    <div>
      

        <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Usage">
            <CommandItem>
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            <span>Actions</span>
            <CommandShortcut>⌘A</CommandShortcut>
            </CommandItem>
            <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Payments</span>
            <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
            <Blocks className="mr-2 h-4 w-4" />
            <span>Blockchain Operations</span>
            <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>Items</CommandItem>

          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Setup">
            <CommandItem>
            <Store className="mr-2 h-4 w-4" />
            <span>Marketplace Setup</span>
            <CommandShortcut>⌘M</CommandShortcut>

            </CommandItem>
            <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Tenant Setup</span>
            <CommandShortcut>⌘T</CommandShortcut>
            </CommandItem>
            <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>

      <DataTable columns={ActionsColumns} data={data} />
    </div>
  );
}


export function CommandMenu() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Usage">
            <CommandItem>
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            <span>Actions</span>
            <CommandShortcut>⌘A</CommandShortcut>
            </CommandItem>
            <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Payments</span>
            <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
            <Blocks className="mr-2 h-4 w-4" />
            <span>Blockchain Operations</span>
            <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>Items</CommandItem>

          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Setup">
            <CommandItem>
            <Store className="mr-2 h-4 w-4" />
            <span>Marketplace Setup</span>
            <CommandShortcut>⌘M</CommandShortcut>

            </CommandItem>
            <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Tenant Setup</span>
            <CommandShortcut>⌘T</CommandShortcut>
            </CommandItem>
            <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
          </CommandGroup>
        </CommandList>
    </CommandDialog>
  )
}


export default ActionsPage;

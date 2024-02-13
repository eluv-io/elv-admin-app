

import { Actions } from "./columns"
import AuthorityApi from "../clients/AuthorityApi"
import { Response } from 'node-fetch';
import { RootStore } from "../stores/index";
import { flow } from "mobx";

 export async function getActionsData(): Promise<Actions[]> {
  
    // console log
    console.log("getActionsData called");

    // Fetch data from authClient API here
    let rootStore: RootStore = (window as any).rootStore;
    let authClient: AuthorityApi = rootStore.authService;

    let res: { };
    try {

        res = await authClient.TenantActionsReport({
            tenant: "",  // TODO: pickup tenant id elsewhere, prev hard coded
            actions: "nft-open,nft-buy,nft-claim,nft-redeem,nft-offer-redeem,vote-drop",
            start_date: "2024-01-01",
            end_date: "2024-01-31"
        });
        console.log("response : ", res);

    } catch (error) {
        console.error("Error fetching actions data: ", error);
    }

    return [
 
        ]
}

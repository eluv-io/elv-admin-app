/* eslint-disable no-unused-vars */

import urljoin from "url-join";
import { keccak256, toUtf8Bytes } from "../static/lib/ethers.min.js";
import {Utils} from "@eluvio/elv-client-js/src/Utils.js";
const AuthorizationClient = require("@eluvio/elv-client-js/src/AuthorizationClient.js");
import { ElvClient } from "@eluvio/elv-client-js";
import { FrameClient } from "@eluvio/elv-client-js/src/FrameClient";
import url from "url";
import { Response } from 'node-fetch'; 
import { EluvioConfigurationInf } from "configuration.js";

interface TenantActionsReportParams {
  tenant: string; 
  actions?: string;
  offset?: number;
  count?: number;
  start_ts?: number; 
  end_ts?: number;
  start_date?: string; // date in ISO string format
  end_date?: string;
}

interface GetTenantConfigMinterParams {
  tenant: string;
  host: string;
}

class AuthorityApi {
  client: FrameClient;
  config: EluvioConfigurationInf;
  debug: boolean;
  asUrlPath: string | null;

  constructor({ client, config, asUrl}: { client: FrameClient, config: EluvioConfigurationInf, asUrl: string }) {
    this.client = client;
    this.config = config;
    this.debug = true;
    if(asUrl) {
      // elv-client-js strips the path and only stores the host - save it here
      this.asUrlPath = url.parse(asUrl).path;
      console.log("asUrlPath: ", this.asUrlPath);
      this.client.SetNodes({
        authServiceURIs:[
          asUrl
        ]
      });
    } else {
      this.asUrlPath = "as";
    }
  }


  
  /**
   * Get minter configuration from authority service
   *
   * @namedParams
   * @param {string} tenant - The Tenant ID
   * @return {Promise<Object>} - The API Response for the tenant's minter configuration
   */
  async GetTenantConfigMinter({ tenant, host } : GetTenantConfigMinterParams) : Promise<{}> {
    let res = await this.GetServiceRequest({
      path: urljoin("/tnt/config", tenant, "minter")
    });

    console.log("GetTenantConfigMinter response : ", res);
    //FIXME:
    //return res.json();
    return res;
  }

  async PutServiceRequest({ path, body = {}, headers = {}, queryParams = {}, useFabricToken = false }) {
    return await this.TenantAuthServiceRequest({ path, method: "PUT", queryParams, body, headers, useFabricToken });
  }

  async PostServiceRequest({ path, body = {}, headers = {}, queryParams = {}, useFabricToken = false }) {
    return await this.TenantAuthServiceRequest({ path, method: "POST", queryParams, body, headers, useFabricToken });
  }

  async GetServiceRequest({ path, queryParams = {}, headers = {} }) {
    //return await this.TenantPathAuthServiceRequest({ path, method: "GET", queryParams, headers });

    console.log ("GetServiceRequest called with path: ", path);

    if (this.client) {
      if (this.client.authClient) {
        console.log("this.client.authClient exists");
      }
    } 
      
    // call the client's MakeTenantPathAuthServiceRequest method
    return await this.client.authClient.MakeTenantPathAuthServiceRequest({
      method: "GET",
      path,
      queryParams,
      headers
    });
  }

  async DeleteServiceRequest({ path, queryParams = {}, headers = {} }) {
    return await this.TenantPathAuthServiceRequest({ path, method: "DELETE", queryParams, headers });
  }

  /**
   * Authority Service API request using path auth. Typically used for GET and DELETE
   *
   * @namedParams
   * @param {string} path - The request endpoint
   * @param {string} method - The rquest method
   * @param {Object} queryParams - The query parameters
   * @param {Object} headers - The headers
   * @return {Promise<Object>} - The API Response
   */
  async TenantPathAuthServiceRequest({ path, method, queryParams = {}, headers = {} }) {
    let ts = Date.now();
    let params = { ts, ...queryParams };
    const paramString = new URLSearchParams(params).toString();

    var newPath = path + "?" + paramString;

    const { multiSig } = await this.TenantSign({
      message: newPath,
    });

    if(this.debug) {
      console.log(`Authorization: Bearer ${multiSig}`);
    }

    let res = {};

    path = urljoin(this.asUrlPath, path);

    //Not exposed yet
    /*
    res = await this.client.authClient.MakeAuthServiceRequest({
      method,
      path,
      headers: {
        Authorization: `Bearer ${multiSig}`,
        ...headers,
      },
      queryParams: { ts, ...queryParams },
    });
    */

    return res;
  }

  /*
  async TenantSign({ message }) {
    //console.log(this.client);

    //Not exposted yet:
    //const signature = await ElvClient.Sign(
    //  keccak256(toUtf8Bytes(message))
    //);
    //const multiSig = Utils.FormatSignature(signature);

    var signature = "";
    var multiSig = "";
    return { signature, multiSig };
  }
  */

  async TenantSign({ message }: { message: string }) {

    console.log("TenantSign called");

    const signature = await this.client.authClient.TenantSign(
      keccak256(toUtf8Bytes(message))
    );
    const multiSig = this.client.utils.FormatSignature(signature);
    return { signature, multiSig };
  }


  /**
   * Get actions report for the tenant
   *
   * @namedParams
   * @param {string} tenant - The Tenant ID
   * @param {string} actions - The actions to report on
   * @param {integer} offset - The offset to start from
   * @param {integer} count - The number of records to return
   * @param {integer} start_ts - The start timestamp secs
   * @param {integer} end_ts - The end timestamp secs
   * @param {string} start_date - The ISO start date
   * @param {string} end_date - The ISO end date
   * @return {Promise<Object>} - The API Response containing primary sales info
   */
  async TenantActionsReport({
      tenant,
      actions = "nft-open,nft-buy,nft-claim,nft-redeem,nft-offer-redeem,vote-drop",  // nft-transfer
      offset,
      count,
      start_ts,
      end_ts,
      start_date,
      end_date,
    }: TenantActionsReportParams): Promise<{}> { 
    
    let start_ts_param : number = 0;
    let end_ts_param : number = 0;

    let headers = {};
    let prettyPrint = true;

    let validActions = ["nft-open", "nft-buy", "nft-claim", "nft-redeem", "nft-offer-redeem", "nft-transfer", "vote-drop"];
    let actionList = actions.split(",");
    for (let i = 0; i < actionList.length; i++) {
      if (!validActions.includes(actionList[i])) {
        throw new Error(`Invalid action: ${actionList[i]}`);
      }
    }

    // use start timestamp if provided, else convert dates string to timestamps
    if (!(start_ts)) {
        console.log("start_date: ", start_date);
          console.log("end_date: ", end_date);
        
        if (start_date || end_date) {

          // convert ISO date strings to timestamps in secs
          start_ts_param = start_date ? new Date(start_date).getTime() / 1000 : 0;
          end_ts_param = end_date ? new Date(end_date).getTime() / 1000 : 0;

            console.log("start_ts_param: ", start_ts_param);
            console.log("end_ts_param: ", end_ts_param);
          
        } else {
          start_ts_param = start_ts || 0;
          end_ts_param = end_ts || 0;
        }

    }
  
    console.log("path : ", urljoin("/tnt/", tenant, "/actions"));

    let res: {}  = await this.GetServiceRequest({
      path: urljoin("/tnt/", tenant, "/actions"),
      queryParams: { actions: actions, offset: offset, count: count, 
        start_ts : start_ts_param, end_ts : end_ts_param},
      headers
    });
  
    return res;
  }

}

export default AuthorityApi;

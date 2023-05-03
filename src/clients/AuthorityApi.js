/* eslint-disable no-unused-vars */

import urljoin from "url-join";
import { keccak256, toUtf8Bytes } from "../static/lib/ethers.min.js";
import {Utils} from "@eluvio/elv-client-js/src/Utils.js";
const AuthorizationClient = require("@eluvio/elv-client-js/src/AuthorizationClient.js");
import { ElvClient } from "@eluvio/elv-client-js";

class AuthorityApi {

  constructor({ client, config, asUrl}) {
    this.client = client;
    this.config = config;
    if(asUrl) {
      // elv-client-js strips the path and only stores the host - save it here
      this.asUrlPath = url.parse(asUrl).path;
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
  async GetTenantConfigMinter({ tenant, host }) {
    let res = await this.GetServiceRequest({
      path: urljoin("/tnt/config", tenant, "minter"),
      host
    });

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
    return await this.TenantPathAuthServiceRequest({ path, method: "GET", queryParams, headers });
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

}

export default AuthorityApi;

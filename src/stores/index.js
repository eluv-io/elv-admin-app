import {makeObservable, flow, configure, observable, action} from "mobx";
import { makePersistable } from "mobx-persist-store";
//import ElvLive from "../clients/ElvLive";
import AuthorityApi from "../clients/AuthorityApi";

import {ElvClient} from "@eluvio/elv-client-js";
import {FrameClient} from "@eluvio/elv-client-js/src/FrameClient";

// Force strict mode so mutations are only allowed within actions.
configure({
  enforceActions: "always"
});

export class RootStore {
  initialized = false;
  client;
  walletClient;

  authService;

  networkInfo;

  loggedIn = false;
  userProfile;
  tenantInfo;
  marketplaceInfo;
  loaded = false;
  tenantBasicsSteps;
  config = {}

  constructor() {
    makeObservable(this, {
      initialized: observable,
      client: observable,
      loggedIn: observable,
      userProfile: observable,
      walletClient: observable,
      tenantInfo: observable,
      marketplaceInfo: observable,
      loaded: observable,
      tenantBasicsSteps: observable,
      config: observable,
      authService: observable,
      networkInfo: observable
    });

    makePersistable(this, { name: "RootStore", properties: ["tenantInfo", "marketplaceInfo", "tenantBasicsSteps"], storage: window.localStorage });
  }

  // eslint-disable-next-line require-yield
  Initialize = flow(function * ({config}) {
    try {
      console.log("RootStore Initialize()");

      let client = new FrameClient({
        target: window.parent,
        timeout: 240
      });
      this.client = client;
      this.initialized = true;

      this.networkInfo = yield this.client.NetworkInfo();

      config["config-url"],
      console.log("configUrl: ", config["config-url"]);

      this.config = config;

      console.log ("config.authorityServiceUrl: ", config.authorityServiceUrl);

      this.authService = new AuthorityApi({client: client, config: config, asUrl: config.authorityServiceUrl});

      let address =  yield this.client.CurrentAccountAddress();
      console.log(" currentAccountAddress:", address);

      const configUrl = yield client.ConfigUrl();
      console.log("configUrl: ", configUrl);
      const newClient = yield ElvClient.FromConfigurationUrl({configUrl});

      //TEMP: Test data
      this.tenantInfo = {
        basics: {
          tenantId: "iten12345",
          tenantName: "",
          tenantAdmins: {id:"igrp12345", members: 12, managers: 12},
          mediaPlatform: {
            contentTypes:[
              {
                name:"Tenant123 - Title",
                objectId: "iq__12345",
                latestHash: "hq__12345",
              },
              {
                name:"Tenant123 - Title Master",
                objectId: "iq__12345",
                latestHash: "hq__12345",
              },
              {
                name:"Tenant123 - Title Collection",
                objectId: "iq__12345",
                latestHash: "hq__12345",
              },
              {
                name:"Tenant123 - Title Permissions",
                objectId: "iq__12345",
                latestHash: "hq__12345",
              },
              {
                name:"Tenant123 - Channel",
                objectId: "iq__12345",
                latestHash: "hq__12345",
              },
              {
                name:"Tenant123 - Live Stream",
                objectId: "iq__12345",
                latestHash: "hq__12345",
              }
            ],
            libraries:[
              {
                name:"Tenant123 - Properties",
                libraryId: "iq__12345"
              },
              {
                name:"Tenant123 - Masters",
                libraryId: "iq__12345"
              },
              {
                name:"Tenant123 - Mezzanines",
                libraryId: "iq__12345"
              }
            ],
            groups:[
              {
                name: "Tenant123 - Content Admins"
              },
              {
                name: "Tenant123 - Content Viewers"
              },
            ],
            objects: [
              {
                name: "Site - Tenant123"
              },
            ]
          },
          marketplace: {
            contentTypes:[
              {
                name:"Tenant123 - Eluvio LIVE Drop Event Site",
                objectId: "iq__12345",
                latestHash: "hq__12345",
              },
              {
                name:"Tenant123 - Eluvio LIVE Tenant",
                objectId: "iq__12345",
                latestHash: "hq__12345",
              },
              {
                name:"Tenant123 - Eluvio LIVE Marketplace",
                objectId: "iq__12345",
                latestHash: "hq__12345",
              },
              {
                name:"Tenant123 - NFT Collection",
                objectId: "iq__12345",
                latestHash: "hq__12345",
              },
              {
                name:"Tenant123 - NFT Template",
                objectId: "iq__12345",
                latestHash: "hq__12345",
              }
            ],
            objects: [
              {
                name:"Eluvio LIVE Drop Event Site - Tenant123",
                objectId: "iq__12345",
                latestHash: "hq__12345",
              },
              {
                name:"Eluvio LIVE Tenant - Tenant123",
                objectId: "iq__12345",
                latestHash: "hq__12345",
              },
              {
                name:"Eluvio LIVE Marketplace - Tenant123",
                objectId: "iq__12345",
                latestHash: "hq__12345",
              },
            ]
          },
          authorityServices: {
            tenantObject: {
              objectId: "iq__12345",
              latestHash: "hq__12345",
              previousVersions: [
                {
                  hash:"hq__12345",
                  version: "622",
                  commitInfo: {
                    author: "test-tenant",
                    commit_message: "update links",
                    commit_date: "February 24, 2023 at 4:25:11 p.m. EST"
                  }
                },
                {
                  hash:"hq__12345",
                  version: "621",
                  commitInfo: {
                    author: "test-tenant",
                    commit_message: "update links",
                    commit_date: "February 23, 2023 at 2:22:11 p.m. EST"
                  }
                }
              ]
            },
            minterConfig: {
              minter: "ikms1234minter",
              minterHelperContractAddress: "0x1234minterhelper",
              proxyOwner: "ikms1234proxyowner",
              proxyContract: "0x1234proxycontract"
            }
          }

        },
        users: {
        },
        groups: {
        },
        permissions: {
        }
      };

      this.tenantBasicsSteps = {};

      //TEMP: Test data
      this.marketplaceInfo = {
        basics:{
          sales: {
            contractAddress: "0x11233",
            stakeholders: [
              {id: "0x1234", address:"0x123423423535346", releasable: 159, released:6.0},
              {id:"0x3456", address:"0x3456", releasable: 45, released:6.0},
              {id:"0x4567", address:"0x4567", releasable: 76, released:6.0},
              {id:"0x5678", address:"0x5678", releasable: 87, released:6.0},
              {id:"0x1236", address:"0x1236", releasable: 98, released:6.0},
              {id:"0x1237", address:"0x1237", releasable: 67, released:6.0},
              {id:"0x1238", address:"0x1238", releasable: 64, released:6.0},
            ]
          },
          royalties: {
            contractAddress: "0x11234",
            stakeholders: [
              {id: "0x1234", address:"0x1234", releasable: 87, released:6.0},
              {id:"0x3456", address:"0x2345", releasable: 56, released:6.0},
              {id:"0x4567", address:"0x4567", releasable: 83, released:6.0},
              {id:"0x5678", address:"0x5678", releasable: 65, released:6.0},
              {id:"0x1236", address:"0x3284", releasable: 22, released:6.0},
              {id:"0x1237", address:"0x7240", releasable: 54, released:6.0},
              {id:"0x1238", address:"0x2490", releasable: 77, released:6.0},
            ]
          },
          marketplaces: [
            {id: "iq__1234", name:"My Store 1", items: 87, status: "good"},
            {id:"iq__3456", name:"My Store 2", items: 56, status: "good", errors:[], warnings:[]},
            {id:"iq__4567", name:"My Store 3", items: 83, status: "2 errors, 1 warning", errors:["error 1", "error 2"], warnings:["warning 1"]},
            {id:"iq__5678", name:"My Store 4", items: 65, status: "1 error, 2 warning", errors:["error 1"], warnings:["warning 1", "warning 2"]},
            {id:"iq__1236", name:"My Store 5", items: 22, status: "good"},
            {id:"iq__1237", name:"My Store 6", items: 54, status: "good"},
            {id:"iq__1238", name:"My Store 7", items: 77, status: "good"},
          ],
          settings:{
            leaderboard_excludes: [
              "0xb37c256c91a9b623ffb03158d9002917bca49b5d",
              "0xb091756c91a9b623ffb03158d9002917bca49b5d",
              "0x20dea119872cf855c8f802a1aba3b43f691e181d"
            ],
            min_list_price: null,
            minter: {
              shuffle_seed: "creative seeding",
              shuffle_token_id: true,
              use_mint_ordinal_in_token_id: true
            },
            owners: [
              "0x59e79eFE007F5208857a646Db5cBddA82261Ca81",
              "0x5557f80d0537e7bb439d919841e0eb9ed449e6bb"
            ],
            revenue_addr: "0xee142f26f720200022f3f96ee8dc9d666b8949be",
            royalty: 10,
            royalty_addr: "0x904736f613c9aac4a4ba047905f13c032ab81a42"
          }
        }
      };

      console.log("Tenant Id: ", this.tenantInfo.basics.tenantId);

      //console.log("Minter Config: ", yield this.authService.GetTenantConfigMinter({tenant:"iten4TXq2en3qtu3JREnE5tSLRf9zLod"}));

    } catch(error) {
      console.error("Failed to initialize application");
      console.error(error);
    } finally {
      this.loaded = true;
    }
  });

  Authenticate = flow(function * () {
    try {
      yield this.walletClient.LogIn({
        method: "popup"
      });

      this.loggedIn = true;
    } catch(error) {
      console.error(error);
    }
  });

  Logout = flow(function * () {
    yield this.walletClient.LogOut();
    this.loggedIn = false;
    this.userProfile = {};
  });

  SetTenantId = flow(function *(tenantId) {
    let tenantInfo = this.tenantInfo;
    tenantInfo.basics.tenantId = tenantId;
    this.tenantInfo =  tenantInfo;
    yield this.Refresh();
  });

  Refresh = flow(function *(tenantId) {
    if(!tenantId || tenantId === ""){
      return;
    }
    yield ({client:this.client, config:this.config, elvLive:this.elvLive, authService:this.authService});
  });

  SetupTenant = flow(function * () {
    //TODO: setup tenant
  });

  SetupTenantMarketplace = flow(function * () {
    //TODO: setup marketplace
  });

  SetupTenantMediaplatform = flow(function * () {
    //TODO: setup tenant
  });

  SetupTenantMinterConfig = flow(function * () {
    //TODO: setup tenant
  });

  // eslint-disable-next-line require-yield
  SetStepComplete = flow(function * ({step, value=true}) {
    console.log("SetStepComplete: ", step);
    let newTenantBasicsSetup = this.tenantBasicsSteps;
    newTenantBasicsSetup[step] = value;
    this.tenantBasicsSteps = newTenantBasicsSetup;
  });

  UpdateTenantLink = flow(function * () {

  });

  GetActionsData = flow(function * () {
    console.log("GetActionsData");

    let actions = yield this.authService.TenantActionsReport({
      tenant: "", // TODO: test hard coded, fix
      actions: "nft-open,nft-buy,nft-claim,nft-redeem,nft-offer-redeem,vote-drop",
      start_date: "2024-01-01",
      end_date: "2024-01-31"
    });

    console.log("Actions: ", actions);

    return actions;

  });

}

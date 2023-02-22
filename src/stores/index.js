import {makeObservable, flow, configure, observable} from "mobx";
import {ElvWalletClient} from "@eluvio/elv-client-js";
import {FrameClient} from "@eluvio/elv-client-js/src/FrameClient";

// Force strict mode so mutations are only allowed within actions.
configure({
  enforceActions: "always"
});

class RootStore {
  client;
  walletClient;
  loggedIn = false;
  userProfile;
  tenantInfo;
  loaded = false;

  constructor() {
    makeObservable(this, {
      client: observable,
      loggedIn: observable,
      userProfile: observable,
      walletClient: observable,
      tenantInfo: observable,
      loaded: observable
    });

    this.Initialize();
  }

  Initialize = flow(function * () {
    try {
      // Determine whether your application needs FrameClient or
      // ElvWalletClient

      // FrameClient is a client that looks like ElvClient but, under the
      // hood, passes messages to another frame with an actual ElvClient
      //
      this.client = new FrameClient({
        target: window.parent,
        timeout: 30
      });

      // ElvWalletClient is a standalone client for using Eluvio Media
      // Wallet functionality
      //
      this.walletClient = yield ElvWalletClient.Initialize({
        network: EluvioConfiguration.network,
        mode: EluvioConfiguration.mode
      });

      window.client = this.client;
      window.walletClient = this.walletClient;

      //TEMP: Test data
      this.tenantInfo = {
        basics: {
          tenantId: "iten12345",
          tenantName: "",
          tenantAdmins: {id:"igrp12345", members: 12, managers: 12},
          mediaPlatform: {
            contentTypes:[],
            libraries:[],
            groups:[]
          },
          marketplace: {
            contentTypes:[],
            libraries:[]
          },
          authorityServices: {
            tenantObject: {
              id: "iq__12345",
              latestHash: "hq__12345"
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
}

export const rootStore = new RootStore();

window.rootStore = rootStore;

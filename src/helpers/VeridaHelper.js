import { EnvironmentType, Network } from "@verida/client-ts";
import { VaultAccount, hasSession } from "@verida/account-web-vault";

import { EventEmitter } from "events";

const {
  VUE_APP_LOGO_URL,
  VUE_APP_CONTEXT_NAME,
  VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER,
} = process.env;

export const VERIDA_ENVIRONMENT = EnvironmentType.TESTNET;

class VeridaHelper extends EventEmitter {
  context = null;
  account = '';
  did = '';
  profile = {}
  connected = false

  async initApp() {
    if (!this.context) {
      await this.connectVault();
    }
  }

  hasSession() {
    return hasSession(VUE_APP_CONTEXT_NAME);
  }

  async connectVault() {
    this.account = new VaultAccount({
      defaultDatabaseServer: {
        type: "VeridaDatabase",
        endpointUri: VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER,
      },
      defaultMessageServer: {
        type: "VeridaMessage",
        endpointUri: VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER,
      },
      vaultConfig: {
        loginUri: VUE_APP_LOGO_URL,
      },
    });

    this.context = await Network.connect({
      client: {
        environment: VERIDA_ENVIRONMENT,
      },
      account: this.account,
      context: {
        name: VUE_APP_CONTEXT_NAME,
      },
    });

    this.did = await this.account.did();
    await this.initProfile();

    this.emit("initialized");
  }

  async initProfile() {
    try {
      const client = await this.context.getClient();
      const profile = await client.openPublicProfile(this.did, "Verida: Vault");
      const cb = async () => {
        const data = await profile.getMany();
        this.profile = {
          name: data.name,
          country: data.country,
          avatar: data?.avatar?.uri,
        };
        this.emit("profileChanged", this.profile);
      };
      profile.listen(cb);
      await cb();
    } catch (error) {
      console.log("User", { error });
    }
  }

  async logout() {
    await this.context.getAccount().disconnect(VUE_APP_CONTEXT_NAME);
    this.context = null;
    this.account = null;
    this.did = "";
    this.profile = {};
    this.connected = false
  }
}

const veridaHelper = new VeridaHelper();

export default veridaHelper;
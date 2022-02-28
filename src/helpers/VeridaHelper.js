import { EnvironmentType, Network } from "@verida/client-ts";
import { VaultAccount, hasSession } from "@verida/account-web-vault";

import { EventEmitter } from "events";
import { DATA_REQUEST, DATA_SEND, MESSAGING } from "../constants/inbox";

const {
  VUE_APP_LOGO_URL,
  VUE_APP_CONTEXT_NAME,
} = process.env;

export const VERIDA_ENVIRONMENT = EnvironmentType.TESTNET;

class VeridaHelper extends EventEmitter {
  context = null;
  account = '';
  did = '';
  profile = {}
  connected = false;
  msgInstance = {}


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
      logoUrl: VUE_APP_LOGO_URL,
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

    if (this.context) {
      this.connected = true
    }

    this.did = await this.account.did();
    await this.initProfile();
    await this.messageListener();
    this.emit("initialized");
  }

  async createDIDJWT(data) {
    const contextName = VUE_APP_CONTEXT_NAME;
    const jwtDID = await this.context
      .getAccount()
      .createDidJwt(contextName, data);

    return jwtDID;
  }

  async validateSchema(
    data,
    schemaUrl
  ) {
    const schemas = await this.context.getClient().getSchema(schemaUrl);
    const isValid = await schemas.validate(data);
    const errors = schemas.errors;

    if (!isValid) {
      return {
        isValid,
        errors,
      };
    }

    return {
      isValid,
      errors: [],
    };
  }

  async sendInboxMessage({ message, did, subject }) {
    const type = MESSAGING;

    const data = {
      data: [message],
    };

    const config = {
      recipientContextName: "Verida: Vault",
    };

    const messaging = await this.context.getMessaging();
    await messaging.send(did, type, data, subject, config);
    return true;
  }

  async sendInbox({ message, did, subject }) {
    const type = DATA_SEND;

    const data = {
      data: [message],
    };

    const config = {
      recipientContextName: "Verida: Vault",
    };

    const messaging = await this.context.getMessaging();
    await messaging.send(did, type, data, subject, config);
    return true;
  }




  async messageListener() {
    this.msgInstance = await this.context.getMessaging()
    const cb = async (inboxEntry) => {
      this.emit("messageNotification", inboxEntry);
    };
    await this.msgInstance.onMessage(cb);
  }

  async getMessages() {
    const filter = {
      type: DATA_REQUEST,
    };
    const options = {
      limit: 20,
      skip: 0,
      sort: [{ sentAt: "desc" }],
    };
    const messages = await this.msgInstance.getMessages(filter, options);
    this.emit("messageNotification", messages);
    return this.messages;
  }

  async requestData({ message, did, data }) {
    const type = DATA_REQUEST

    const config = {
      recipientContextName: 'Verida: Vault'
    }

    const messaging = await this.context.getMessaging();
    return await messaging.send(did, type, data, message, config)
  }


  async initProfile() {
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

  }

  async retrieveSchema(url) {
    const schemas = await this.context.getClient().getSchema(url);
    const json = await schemas.getSpecification();
    return json

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
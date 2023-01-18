import { EventEmitter } from "events";
import { Context, Messaging } from "@verida/client-ts";
import { config } from "@/config";
import { veridaMessagingTypes } from "@/constants";

type MessagingTypes =
  | "inbox/type/dataRequest"
  | "inbox/type/message"
  | "inbox/type/dataSend";
interface MessageParams {
  did: string;
  subject: string;
  data?: any;
  type: MessagingTypes;
}

class VeridaHelper extends EventEmitter {
  public context: Context | undefined;
  public did: string;
  public connected: boolean;
  private _msgInstance: Messaging | undefined;
  public messages: any = [];

  constructor() {
    super();
    this.did = "";
    this.connected = false;
  }

  public async connectVault(context: Context) {
    this.context = context;
    if (this.context) {
      this.connected = true;
    }

    this.did = await context.getAccount().did();
  }

  public getContext(): Context {
    if (!this.context) {
      throw new Error("");
    }

    return this.context;
  }

  public async createDIDJWT(data: any) {
    const contextName = config.veridaContextName;
    const jwtDID = await this.getContext()
      .getAccount()
      .createDidJwt(contextName, data);

    return jwtDID;
  }

  public async validateSchema(data: any, schemaUrl: string) {
    const schemas = await this.getContext().getClient().getSchema(schemaUrl);
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
  private async initialiseMessagingInstance(): Promise<Messaging> {
    if (this._msgInstance) {
      return this._msgInstance;
    }

    this._msgInstance = await this.getContext().getMessaging();

    return this._msgInstance;
  }

  private async messageListener() {
    const messaging = await this.initialiseMessagingInstance();

    const messagelistnerCallback = async (inboxEntry: any[]) => {
      this.emit("messageNotification", inboxEntry);
    };

    await messaging.onMessage(messagelistnerCallback);
  }

  async getMessages() {
    const filter = {
      type: veridaMessagingTypes.dataRequest,
    };
    const options = {
      limit: 20,
      skip: 0,
      sort: [{ sentAt: "desc" }],
    };
    const messaging = await this.initialiseMessagingInstance();
    const messages = messaging.getMessages(filter, options);
    this.emit("messageNotification", messages);
    return this.messages;
  }

  public async messaging({
    did,
    data,
    type,
    subject,
  }: MessageParams): Promise<boolean> {
    const config = {
      did,
      recipientContextName: "Verida: Vault",
    };

    const messagingInstance = await this.initialiseMessagingInstance();

    await this.messageListener();

    await messagingInstance.send(did, type, data, subject, config);

    return true;
  }

  public async retrieveSchema(url: string) {
    const schemas = await this.getContext().getClient().getSchema(url);
    const json = await schemas.getSpecification();
    return json;
  }

  public async logout(): Promise<void> {
    this.context = undefined;
    this.did = "";
    this._msgInstance = undefined;
    this.connected = false;
  }
}

const veridaHelper = new VeridaHelper();

export default veridaHelper;

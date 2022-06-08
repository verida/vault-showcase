
import { EventEmitter } from "events";
import { DATA_REQUEST } from "../constants/inbox";
import { envKeys } from '../config/env.config';

interface MessageParams { message: string, did: string, subject: string, data?: any, type: string }

class VeridaHelper extends EventEmitter {
	context: any = null;
	did = "";
	connected = false;
	msgInstance: any = {};
	messages: any = []

	async connectVault(context?: any) {
		this.context = context
		if (this.context) {
			this.connected = true;
		}
		this.did = await context.getAccount().did();
		await this.messageListener();
	}

	async createDIDJWT(data: any) {
		const contextName = envKeys.VUE_APP_CONTEXT_NAME;
		const jwtDID = await this.context
			.getAccount()
			.createDidJwt(contextName, data);

		return jwtDID;
	}

	async validateSchema(data: any, schemaUrl: string) {
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

	async sendInboxData({ message, did, subject, type }: MessageParams) {

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
		this.msgInstance = await this.context.getMessaging();
		const cb = async (inboxEntry: any[]) => {
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

	async requestData({ message, did, data }: MessageParams) {
		const type = DATA_REQUEST;

		const config = {
			recipientContextName: "Verida: Vault",
		};

		const messaging = await this.context.getMessaging();
		return await messaging.send(did, type, data, message, config);
	}
	async retrieveSchema(url: string) {
		const schemas = await this.context.getClient().getSchema(url);
		const json = await schemas.getSpecification();
		return json;
	}

	async logout(): Promise<void> {
		this.context = null;
		this.did = "";
		this.connected = false;
	}
}

const veridaHelper = new VeridaHelper();

export default veridaHelper;


console.log(['heade', 'tail'].map(item => ({ key: item, label: item })));


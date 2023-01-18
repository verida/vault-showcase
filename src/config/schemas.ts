import { config } from "./config";

export const supportedSchemas = {
  shoppingCoupon: `${config.veridaBaseSchemaURL}shopping/coupon/v0.1.0/schema.json`,
  covid19PCRTest: `${config.veridaBaseSchemaURL}health/pathology/tests/covid19/pcr/v0.1.0/schema.json`,
  contact: `${config.veridaBaseSchemaURL}social/contact/v0.1.0/schema.json`,
  following: `${config.veridaBaseSchemaURL}https://common.schemas.verida.io/social/following/v0.1.0/schema.json`,
  posts: `${config.veridaBaseSchemaURL}https://common.schemas.verida.io/social/post/v0.1.0/schema.json`,
  inboxMessage:
    "https://core.schemas.verida.io/inbox/type/message/v0.1.0/schema.json",
};

export const allSchemasForMessaging = [
  supportedSchemas.contact,
  supportedSchemas.covid19PCRTest,
  supportedSchemas.contact,
];

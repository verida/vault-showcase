import { config } from "./config";

export const SCHEMAS = [
  `${config.veridaBaseSchemaURL}shopping/coupon/v0.1.0/schema.json`,
  `${config.veridaBaseSchemaURL}health/pathology/tests/covid19/pcr/v0.1.0/schema.json`,
  `${config.veridaBaseSchemaURL}social/contact/v0.1.0/schema.json`,
  // `https://core.schemas.verida.io/inbox/type/message/v0.1.0/schema.json`,
];

export const socialDataSchema = {
  following: `${config.veridaBaseSchemaURL}https://common.schemas.verida.io/social/following/v0.1.0/schema.json`,
  posts: `${config.veridaBaseSchemaURL}https://common.schemas.verida.io/social/post/v0.1.0/schema.json`,
};

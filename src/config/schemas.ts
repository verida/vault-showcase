const { VUE_APP_SCHEMA_PATHS } = process.env

export const SCHEMAS = [
  `${VUE_APP_SCHEMA_PATHS}shopping/coupon/v0.1.0/schema.json`,
  `${VUE_APP_SCHEMA_PATHS}health/pathology/tests/covid19/pcr/v0.1.0/schema.json`,
  `${VUE_APP_SCHEMA_PATHS}social/contact/v0.1.0/schema.json`,
  // `https://core.schemas.verida.io/inbox/type/message/v0.1.0/schema.json`,
]


export const socialDataSchema = {
  following:
    "https://common.schemas.verida.io/social/following/v0.1.0/schema.json",
  posts:
    "https://common.schemas.verida.io/social/post/v0.1.0/schema.json",
}

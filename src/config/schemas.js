const { VUE_APP_SCHEMA_PATHS } = process.env

export const SCHEMAS = [
  `${VUE_APP_SCHEMA_PATHS}identity/kyc/AU/schema.json`,
  `${VUE_APP_SCHEMA_PATHS}shopping/coupon/schema.json`,
  `${VUE_APP_SCHEMA_PATHS}health/pathology/tests/covid19/pcr/schema.json`
]

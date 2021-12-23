export function extract(data, collection) {
  switch (collection) {
    case 'shopping/coupon':
    case 'health/pathology/tests/covid19-pcr':
      return data.name
    case 'identity/kyc/AU': {
      const { firstName, middleName, lastName } = data
      return `${firstName} ${middleName} ${lastName}`
    }
  }
}


export function getSchemaProperties(data) {
  return data.allOf.find((item) => item["properties"]).properties;
}

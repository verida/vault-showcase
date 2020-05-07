export function extract (data, collection) {
  switch (collection) {
    case 'shopping/coupon':
      return data.name
    case 'identity/kyc/AU/basic': {
      const { firstName, middleName, lastName } = data
      return `${firstName} ${middleName} ${lastName}`
    }
  }
}

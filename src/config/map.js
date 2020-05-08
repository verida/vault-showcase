export const schemas = {
  'shopping/coupon': {
    view: [
      'description',
      'value',
      'valueType',
      'currency',
      'barcode'
    ],
    create: [
      'description',
      'value',
      'valueType',
      'currency',
      'barcode'
    ]
  },
  'identity/kyc/AU': {
    view: [
      'firstName',
      'lastName',
      'gender',
      'dateOfBirth',
      'streetAddress1',
      'suburb',
      'state',
      'postcode'
    ],
    create: [
      'firstName',
      'lastName',
      'gender',
      'dateOfBirth',
      'streetAddress1',
      'suburb',
      'state',
      'postcode'
    ]
  }
}

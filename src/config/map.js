export const schemas = {
  'https://schemas.verida.io/health/pathology/tests/covid19-pcr/schema.json': {
    view: [
      'name',
      'fullName',
      'healthNumber',
      'testType',
      'testResult'
    ],
    create: [
      'name',
      'fullName',
      'healthNumber',
      'testType',
      'testResult'
    ]
  },
  'https://schemas.verida.io/shopping/coupon/schema.json': {
    view: [
      'name',
      'description',
      'value',
      'valueType',
      'currency',
      'barcode'
    ],
    create: [
      'name',
      'description',
      'value',
      'valueType',
      'currency',
      'barcode'
    ]
  },
  'https://schemas.verida.io/identity/kyc/AU/schema.json': {
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

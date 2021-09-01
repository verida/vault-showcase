// @todo: This should use the layouts in the schema

export const schemas = {
  'https://schemas.verida.io/health/pathology/tests/covid19/pcr/schema.json': {
    view: [
      'fullName',
      'dateOfBirth',
      'patientId',
      'testTimestamp',
      'result'
    ],
    create: [
      'fullName',
      'dateOfBirth',
      'patientId',
      'testTimestamp',
      'result'
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

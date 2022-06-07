// @todo: This should use the layouts in the schema

export const schemas = {
  'https://common.schemas.verida.io/health/pathology/tests/covid19/pcr/v0.1.0/schema.json': {
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
  'https://common.schemas.verida.io/shopping/coupon/v0.1.0/schema.json': {
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
  'https://common.schemas.verida.io/social/contact/v0.1.0/schema.json': {
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

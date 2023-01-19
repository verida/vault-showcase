// @todo: This should use the layouts in the schema

import { supportedSchemas } from "./schemas";

export const schemas = {
  [supportedSchemas.covid19PCRTest]: {
    view: [
      'fullName',
      'dateOfBirth',
      'testTimestamp',
      'result'
    ],
    create: [
      'fullName',
      'dateOfBirth',
      'testTimestamp',
      'result'
    ]
  },
  [supportedSchemas.shoppingCoupon]: {
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
  [supportedSchemas.contact]: {
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

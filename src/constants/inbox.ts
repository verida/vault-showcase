export const DATA_SEND = 'inbox/type/dataSend'
export const MESSAGING = 'inbox/type/message'
export const DATA_REQUEST = 'inbox/type/dataRequest'



export const fakeSchemaOptions = [
    {
        "text": "Coupon",
        "path": "https://common.schemas.verida.io/shopping/coupon/v0.1.0/schema.json",
        "schema": "https://common.schemas.verida.io/shopping/coupon/v0.1.0/schema.json",
        "properties": {
            "name": {
                "title": "Name",
                "description": "Name of the item within card list and details",
                "type": "string"
            },
            "summary": {
                "title": "Summary",
                "description": "Brief summary of item",
                "type": "string",
                "maxLength": 100
            },
            "archived": {
                "title": "Archived",
                "description": "Is this record archived?",
                "type": "boolean"
            },
            "schema": {
                "title": "Schema",
                "description": "URI of the schema for this record",
                "type": "string"
            },
            "signatures": {
                "title": "Signatures",
                "description": "Signatures verifying this data has been signed",
                "type": "object"
            },
            "sourceApplication": {
                "title": "Source application",
                "description": "Name of the application this data was sourced from",
                "type": "string"
            },
            "icon": {
                "title": "Icon",
                "description": "URL of an icon for this record. Must be square, prefer SVG, otherwise minimum 50p x 50p",
                "type": "string"
            },
            "insertedAt": {
                "title": "Inserted",
                "description": "Date/time this record was inserted",
                "type": "string",
                "format": "date-time"
            },
            "modifiedAt": {
                "title": "Modified",
                "description": "Date/time this record was modified",
                "type": "string",
                "format": "date-time"
            },
            "title": {
                "title": "Title",
                "type": "string"
            },
            "description": {
                "title": "Description",
                "type": "string"
            },
            "value": {
                "title": "Value",
                "type": "string"
            },
            "valueType": {
                "title": "Value Type",
                "type": "string"
            },
            "currency": {
                "title": "Currency",
                "type": "string"
            },
            "barcode": {
                "title": "Bar Code",
                "type": "string"
            }
        }
    },
    {
        "text": "COVID19 (PCR) Test",
        "path": "https://common.schemas.verida.io/health/pathology/tests/covid19/pcr/v0.1.0/schema.json",
        "schema": "https://common.schemas.verida.io/health/pathology/tests/covid19/pcr/v0.1.0/schema.json",
        "properties": {
            "name": {
                "title": "Name",
                "description": "Name of the item within card list and details",
                "type": "string"
            },
            "summary": {
                "title": "Summary",
                "description": "Brief summary of item",
                "type": "string",
                "maxLength": 100
            },
            "archived": {
                "title": "Archived",
                "description": "Is this record archived?",
                "type": "boolean"
            },
            "schema": {
                "title": "Schema",
                "description": "URI of the schema for this record",
                "type": "string"
            },
            "signatures": {
                "title": "Signatures",
                "description": "Signatures verifying this data has been signed",
                "type": "object"
            },
            "sourceApplication": {
                "title": "Source application",
                "description": "Name of the application this data was sourced from",
                "type": "string"
            },
            "icon": {
                "title": "Icon",
                "description": "URL of an icon for this record. Must be square, prefer SVG, otherwise minimum 50p x 50p",
                "type": "string"
            },
            "insertedAt": {
                "title": "Inserted",
                "description": "Date/time this record was inserted",
                "type": "string",
                "format": "date-time"
            },
            "modifiedAt": {
                "title": "Modified",
                "description": "Date/time this record was modified",
                "type": "string",
                "format": "date-time"
            },
            "didJwtVc": {
                "title": "DID-JWT Verifiable Credential",
                "description": "DID JWT representation of this credential",
                "type": "string"
            },
            "fullName": {
                "title": "Full name",
                "type": "string"
            },
            "dateOfBirth": {
                "title": "Date of birth",
                "type": "string",
                "format": "date",
                "description": "YYYY-MM-DD"
            },
            "patientId": {
                "title": "Patient ID",
                "type": "string"
            },
            "testTimestamp": {
                "title": "Test timestamp",
                "type": "string",
                "format": "date-time"
            },
            "result": {
                "title": "Result",
                "type": "string",
                "enum": [
                    "Positive",
                    "Negative"
                ]
            }
        }
    },
    {
        "text": "Contact",
        "path": "https://common.schemas.verida.io/social/contact/v0.1.0/schema.json",
        "schema": "https://common.schemas.verida.io/social/contact/v0.1.0/schema.json",
        "properties": {
            "name": {
                "title": "Name",
                "description": "Name of the item within card list and details",
                "type": "string"
            },
            "summary": {
                "title": "Summary",
                "description": "Brief summary of item",
                "type": "string",
                "maxLength": 100
            },
            "archived": {
                "title": "Archived",
                "description": "Is this record archived?",
                "type": "boolean"
            },
            "schema": {
                "title": "Schema",
                "description": "URI of the schema for this record",
                "type": "string"
            },
            "signatures": {
                "title": "Signatures",
                "description": "Signatures verifying this data has been signed",
                "type": "object"
            },
            "sourceApplication": {
                "title": "Source application",
                "description": "Name of the application this data was sourced from",
                "type": "string"
            },
            "icon": {
                "title": "Icon",
                "description": "URL of an icon for this record. Must be square, prefer SVG, otherwise minimum 50p x 50p",
                "type": "string"
            },
            "insertedAt": {
                "title": "Inserted",
                "description": "Date/time this record was inserted",
                "type": "string",
                "format": "date-time"
            },
            "modifiedAt": {
                "title": "Modified",
                "description": "Date/time this record was modified",
                "type": "string",
                "format": "date-time"
            },
            "firstName": {
                "title": "First Name",
                "type": "string"
            },
            "lastName": {
                "title": "Last Name",
                "type": "string"
            },
            "email": {
                "title": "Email",
                "type": "string",
                "format": "email"
            },
            "mobile": {
                "title": "Mobile",
                "type": "string"
            },
            "did": {
                "title": "DID",
                "type": "string"
            }
        }
    }
]
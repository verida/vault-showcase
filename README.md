# Vault-Examples

This demo showcases how you can perform the following actions:

- Send Data

- Send Message

- Request Data


The following schemas are used by the 'Send Data' and 'Request Data' actions:

- [COVID19 (PCR) Test](https://common.schemas.verida.io/health/pathology/tests/covid19/pcr/v0.1.0/schema.json)

- [Contact](https://common.schemas.verida.io/social/contact/v0.1.0/schema.json)

- [Coupon](https://common.schemas.verida.io/shopping/coupon/v0.1.0/schema.json)

## Project setup

## Install

```
yarn install
```

or

```
npm install
```

## Build

```
yarn build
```

or

```
npm run build
```

## Run

```
yarn serve
```

or

```
npm run serve
```

## Deployment

Deployment to https://vault-examples.demos.verida.io/ happens automatically on merge to `main`. See https://us-east-2.console.aws.amazon.com/amplify/home?region=us-east-2#/

Releases are automically tagged and built on pushes to `main` using a github action. Version numbers used for the tags generated automatically by increasing the patch number by one.

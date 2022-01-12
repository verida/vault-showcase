export function extract(data, collection) {
  switch (collection) {
    case 'https://common.schemas.verida.io/shopping/coupon/v0.1.0/schema.json':
      return data.title
    case 'https://common.schemas.verida.io/health/pathology/tests/covid19/pcr/v0.1.0/schema.json':
      return data.name
    case 'https://common.schemas.verida.io/social/contact/v0.1.0/schema.json': {
      const { firstName, lastName } = data
      return `${firstName} ${lastName}`
    }
    case 'https://core.schemas.verida.io/inbox/type/message/v0.1.0/schema.json': {
      return data.subject
    }
  }
}


import { supportedSchemas } from "@/config";

interface IData {
  title: string;
  name: string;
  subject: string;
  firstName: string;
  lastName: string;
}

export function extract(data: IData, collection: string) {
  switch (collection) {
    case supportedSchemas.shoppingCoupon:
      return data.title;
    case supportedSchemas.covid19PCRTest:
      return data.name;
    case supportedSchemas.contact: {
      const { firstName, lastName } = data;
      return `${firstName} ${lastName}`;
    }
    case supportedSchemas.inboxMessage: {
      return data.subject;
    }
  }
}

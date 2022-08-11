import { parse, isDate } from "date-fns";
import * as yup from "yup";

const parseDateString = (value: string, originalValue: string) => {
    const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, "yyyy-MM-dd", new Date());

    return parsedDate;
};

const today = new Date()


// Dynamically build schema from schema properties
export const buildSchema = (attributes: any) => {
    let schemaObject = {};

    for (const prop in attributes) {
        if (
            attributes[prop].format === "date" ||
            attributes[prop].format === "date-time"
        ) {
            schemaObject = {
                ...schemaObject,
                [prop]: yup.date().transform(parseDateString).max(today).required().label('Date of Birth')
            };
        } else if (attributes[prop].title.toLowerCase() === "mobile") {
            const phoneRegExp =
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
            schemaObject = {
                ...schemaObject,
                [prop]: yup
                    .string()
                    .matches(
                        phoneRegExp,
                        "Phone number is not valid (e.g +234 081xxxx)"
                    )
                    .min(11, "Phone number too short")
                    .max(11, "Phone number too long"),
            };
        } else if (attributes[prop].title.toLowerCase() === "did") {
            schemaObject = {
                ...schemaObject,
                [prop]: yup
                    .string()
                    .min(50, "DID length not valid")
                    .max(50, "DID length not valid"),
            };
        } else if (attributes[prop].format === "email") {
            schemaObject = {
                ...schemaObject,
                [prop]: yup.string().email().required(),
            };
        } else {
            schemaObject = {
                ...schemaObject,
                [prop]: yup.string().required(),
            };
        }
    }

    return schemaObject;
}
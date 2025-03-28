import {z} from "zod";

export function getFieldStates(formData: FormData, validatedFields: z.SafeParseError<any>) {
    const fields: Record<string, string> = {}
    for (const [key, value] of formData.entries()) {
        fields[key] = value.toString()
    }

    return {
        errors: validatedFields.error.flatten().fieldErrors,
        fieldsState: fields,
        message: 'Missing or invalid fields, failed to create account'
    }
}
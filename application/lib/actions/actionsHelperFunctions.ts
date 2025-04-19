import {z} from "zod";

// define schema normally, NO `as const`
export const formSchema = z.record(z.string(), z.string().or(z.number()));

// You can define the inferred type separately if you reuse it
export type FormSchema = z.infer<typeof formSchema>;

// your function, uses the schema type properly
export function generateFormResponse(
    formData: FormData,
    validatedFields: z.SafeParseError<FormSchema> | z.SafeParseSuccess<FormSchema>,
    message: string = "Missing or invalid fields, failed to create account",
) {
    const fields: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
        fields[key] = value.toString();
    }

    return {
        errors: validatedFields.error ? validatedFields.error.flatten().fieldErrors : undefined,
        fieldsState: fields,
        message: message,
    };
}

import { z } from "zod";

// define schema normally, NO `as const`
export const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

// You can define the inferred type separately if you reuse it
export type FormSchema = z.infer<typeof formSchema>;

// your function, uses the schema type properly
export function generateFormErrorResponse(
  formData: FormData,
  validatedFields: z.SafeParseError<FormSchema>,
) {
  const fields: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    fields[key] = value.toString();
  }

  return {
    errors: validatedFields.error.flatten().fieldErrors,
    fieldsState: fields,
    message: "Missing or invalid fields, failed to create account",
  };
}

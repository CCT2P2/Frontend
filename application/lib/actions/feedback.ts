import { z } from "zod";
import {} from /*generateFormErrorResponse */ "@/lib/actions/actionsHelperFunctions";

// for comments on how this works go to createAccount.ts, basically same logic
const FeedbackSchema = z.object({
  worked: z.string(),

  didnt: z.string(),

  other: z.string().optional(),
});

export interface FeedbackState {
  errors?: {
    worked: string;
    didnt: string;
    other?: string | null;
  };
  fieldsState?: {
    worked: string;
    didnt: string;
    other?: string | null;
  };
  message?: string | null;
}
export async function feedback(
  _prevState: FeedbackState,
  formData: FormData,
): Promise<FeedbackState> {
  const validatedFields = FeedbackSchema.safeParse({
    worked: formData.get("worked"),
    didnt: formData.get("didnt"),
    other: formData.get("other"),
  });

  if (!validatedFields.success) {
    return {
      errors: {
        worked:
          validatedFields.error.errors.find((e) => e.path[0] === "worked")
            ?.message || "",
        didnt:
          validatedFields.error.errors.find((e) => e.path[0] === "didnt")
            ?.message || "",
        other:
          validatedFields.error.errors.find((e) => e.path[0] === "other")
            ?.message || null,
      },
      fieldsState: {
        worked: formData.get("worked")?.toString() || "",
        didnt: formData.get("didnt")?.toString() || "",
        other: formData.get("other")?.toString() || null,
      },
      message: "Form validation failed",
    };
  }

  const requestData = {
    worked: validatedFields.data.worked,
    didnt: validatedFields.data.didnt,
    other: validatedFields.data.other,
  };

  const response = await fetch("api/feedback", {
    method: "POST",
    headers: {
      "Content-Type:": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    return {
      message: `Error with feedback: ${response.status}`,
    };
  }

  return { message: "Feedback submitted successfully" };
}

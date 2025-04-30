import { z } from "zod";

import { getSession } from "next-auth/react";

const FeedbackSchema = z.object({
	worked: z.string(),
	didnt: z.string(),
	other: z.string().optional(),
	rating: z.coerce.number().min(0).max(5),
});

export interface FeedbackState {
	errors?: {
		worked: string;
		didnt: string;
		other?: string;
		rating?: string | null;
	};
	fieldsState?: {
		worked: string;
		didnt: string;
		other?: string;
		rating?: number | null;
	};
	status?: number;
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
		rating: formData.get("rating"),
	});
	const session = await getSession();

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
						?.message || "",
				rating:
					validatedFields.error.errors.find((e) => e.path[0] === "rating")
						?.message || null,
			},
			fieldsState: {
				worked: formData.get("worked")?.toString() || "",
				didnt: formData.get("didnt")?.toString() || "",
				other: formData.get("other")?.toString() || "",
				rating: formData.get("rating") ? Number(formData.get("rating")) : null,
			},
			message: "Form validation failed",
		};
	}

	const requestData = {
		Worked: validatedFields.data.worked,
		Didnt: validatedFields.data.didnt,
		Other: validatedFields.data.other,
		Rating: validatedFields.data.rating,
	};

	const response = await fetch("api/feedback/submit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session?.accessToken}`,
		},
		body: JSON.stringify(requestData),
	});

	if (!response.ok) {
		return {
			message: `Error with feedback: ${response.status}`,
		};
	}

	return { status: 200, message: "Feedback submitted successfully" };
}

import {z} from "zod";
import {generateFormResponse} from "@/lib/actions/actionsHelperFunctions";
import {getSession} from "next-auth/react";

const CreateCommentSchema = z.object({
    text: z
        .string()
        .min(1)
        .max(100000)
});

export interface CreateCommentState {
    errors?: {
        text?: string[];
    };
    fieldState?: {
        text?: string;
    };
    message?: string | null;
}

export async function createComment(_prevState: CreateCommentState, formData: FormData): Promise<CreateCommentState> {
    const validatedField = CreateCommentSchema.safeParse({
        text: formData.get('text'),
    });

    if (!validatedField.success) {
        return generateFormResponse(formData, validatedField, "Missing or invalid field");
    }

    const session = await getSession();

    if (!session?.user) {
        return generateFormResponse(formData, validatedField, "Invalid user session, failed to create comment");
    }

    return generateFormResponse(formData, validatedField, "We cant post comments yet :pensive:")
}
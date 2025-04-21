"use client"

import {z} from "zod";
import {generateFormResponse} from "@/lib/actions/actionsHelperFunctions";
import {getSession} from "next-auth/react";
import {CreatePostRequest} from "@/lib/apiTypes";
import {router} from "next/client";

const CreateCommentSchema = z.object({
    text: z
        .string()
        .min(1)
        .max(100000),

    parentPostId: z.number(),
    communityId: z.number(),
});

// we only need this for the text, as the id fields are static
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
        parentPostId: Number(formData.get('parentPostId')),
        communityId: Number(formData.get('communityId')),
    });

    if (!validatedField.success) {
        return generateFormResponse(formData, validatedField, "Missing or invalid field");
    }

    const session = await getSession();

    if (!session?.user) {
        return generateFormResponse(formData, validatedField, "Invalid user session, failed to create comment");
    }

    const requestData: CreatePostRequest = {
        Title: "",
        MainText: validatedField.data.text,
        auth_id: Number(session.user.id),
        com_id: validatedField.data.communityId,
        comment_flag: true,
        post_id_ref: validatedField.data.parentPostId,
    }

    const response = await fetch('/api/post/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(requestData),
    });

    if (!response.ok) {
        return generateFormResponse(formData, validatedField, `Error while creating comment: ${response.status}`)
    }

    return generateFormResponse(formData, validatedField, "We cant post comments yet :pensive:")
}
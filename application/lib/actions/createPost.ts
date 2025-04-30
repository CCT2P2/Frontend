"use client"

import {z} from "zod";
import {generateFormResponse} from "@/lib/actions/actionsHelperFunctions";
import {CreatePostRequest, CreatePostResponse} from "@/lib/apiTypes";
import {getSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {updateCommunityBackend} from "@/lib/actions/updateCommunityBackend";
import {uploadImage} from "@/lib/actions/uploadImage";

// for comments on how this works go to createAccount, basically same logic
const CreatePostSchema = z.object({
    title: z
        .string()
        .min(3, {message: 'Post title must be at least 3 characters'})
        .max(300, {message: 'Post title must not be more than 300 characters'}),

    mainText: z
        .string()
        .max(100000, {message: 'Post content must not be more than 100,000 characters'}),

    communityId: z
        .number()
        .min(1, {message: 'No community chosen'}),
});

export interface CreatePostState {
    errors?: {
        title?: string[];
        mainText?: string[];
        communityId?: string[];
        image?: string[];
    };
    fieldsState?: {
        title?: string;
        mainText?: string;
        communityId?: string;
    };
    message?: string | null;
}

export async function createPost(_prevState: CreatePostState, formData: FormData): Promise<CreatePostState> {
    const validatedField = CreatePostSchema.safeParse({
        title: formData.get('title'),
        mainText: formData.get('mainText'),
        communityId: Number(formData.get('communityId')),
    });

    if (!validatedField.success) {
        return generateFormResponse(formData, validatedField, "Missing or invalid fields");
    }

    const session = await getSession()

    if (!session?.user) {
        return generateFormResponse(formData, validatedField, "Invalid user session, failed to create post")
    }

    // upload the image first
    const imageFile = formData.get('image') as File;
    let imageUrl;

    if (imageFile) {
        const response = await uploadImage(imageFile, session.accessToken);
        if (response.error) {
            return generateFormResponse(formData, validatedField, "Invalid file");
        }
        imageUrl = response.imageUrl;
    }

    const requestData: CreatePostRequest = {
        Title: validatedField.data.title,
        MainText: validatedField.data.mainText,
        auth_id: Number(session?.user.id),
        com_id: validatedField.data.communityId,
        comment_flag: false,
        Img: imageUrl,
    }

    const response = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(requestData),
    });

    if (!response.ok) {
        return generateFormResponse(formData, validatedField, `Error while creating post: ${response.status}`)
    }

    const responseData: CreatePostResponse = await response.json()

    await updateCommunityBackend({
        Id: validatedField.data.communityId,
        PostID: responseData.post_id.toString()
    });

    redirect(`/post/${responseData.post_id}`)
}
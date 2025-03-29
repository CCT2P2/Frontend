import {z} from "zod";
import {generateFormErrorResponse} from "@/lib/actions/actionsHelperFunctions.ts";
import {CreatePostRequest, CreatePostResponse} from "@/lib/apiTypes.ts";

// for comments on how this works go to createAccount, basically same logic
const createPostSchema = z.object({
    title: z
        .string()
        .min(3, {message: 'Post title must be at least 3 characters'})
        .max(100, {message: 'Post title must not be more than 100 characters'}),

    mainText: z
        .string()
        .max(10000, {message: 'Post content must not be more than 10,000 characters'}),
});

export interface CreatePostState {
    errors?: {
        title?: string[];
        mainText?: string[];
    };
    fieldState?: {
        title?: string;
        mainText?: string;
    };
    message?: string | null;
    postId?: number;
}

export async function createPost(_prevState: string | undefined, formData: FormData): Promise<CreatePostState> {
    const validatedField = createPostSchema.safeParse({
        title: formData.get('title'),
        mainText: formData.get('mainText'),
    });

    if (!validatedField.success) {
        return generateFormErrorResponse(formData, validatedField);
    }

    const requestData: CreatePostRequest = {
        title: validatedField.data.title,
        main_text: validatedField.data.mainText,
        // TODO: rest comes from user data which is not included in the form, add that once we actually have the data
        auth_id: 0,
        com_id: 0,
        comment_flag: false,
        post_id_ref: 0,
    }

    const response = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    });

    if (!response.ok) {
        return {
            message: `Error while creating post: ${response.status}`,
        };
    }

    const responseData: CreatePostResponse = await response.json()
    return {postId: responseData.post_id}
}
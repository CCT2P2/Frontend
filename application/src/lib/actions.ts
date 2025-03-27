'use server'

import {z} from "zod";
import {UserRegistrationRequest, UserRegistrationResponse} from "@/lib/apiTypes.ts";

export async function signIn(prevState: string | undefined, formData: FormData) {
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        // TODO
    } catch (error) {
        return {error: error};
    }
}

// Create account -------------------------------------------------------------

const CreateAccountSchema = z.object({
    username: z
        .string()
        .min(1, {message: 'Username must be at least 3 characters'})
        .max(20, {message: 'Username must not be more than 20 characters'})
        .regex(/^[a-zA-Z0-9_]+$/, {message: 'Username can only contain letters, numbers and underscores'}),

    email: z
        .string()
        .email({message: 'Invalid email address'}),

    password: z
        .string()
        .min(6, {message: 'Password must be at least 6 characters'})
});

export interface SignupState {
    error?: {
        username?: string[],
        email?: string[],
        password?: string[],
    },
    message?: string | null,
    userId?: null,
}

export async function createAccount(_prevState: SignupState, formData: FormData): Promise<SignupState> {
    const validatedField = CreateAccountSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedField.success) {
        return {
            errors: validatedField.error.flatten().fieldErrors,
            message: 'Missing or invalid fields, failed to create account'
        }
    }

    const requestData: UserRegistrationRequest = {
        username: validatedField.data.username,
        email: validatedField.data.email,
        password: validatedField.data.password,
    }

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData),
    });

    if (response.status !== 200) {
        return {
            message: `Error creating account: ${response.status}`
        }
    }

    const responseData: UserRegistrationResponse = await response.json()
    return {userId: responseData.user_id}
}

// Create Post -------------------------------------------------------------

const createPostSchema = z.object({
    title: z
        .string()
        .min(3, {message: 'Post title must be at least 3 characters'})
        .max(100, {message: 'Post title must not be more than 100 characters'}),

    content: z
        .string()
        .max(10000, {message: 'Post content myst not be more than 10,000 characters'}),
});

export async function createPost(prevState: string | undefined, formData: FormData) {
    const validatedField = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    })

    if (!validatedField.success) {
        return {
            errors: validatedField.error.flatten().fieldErrors,
            message: 'Missing or invalid fields, failed to create account'
        }
    }

    // TODO
}

// Create community -------------------------------------------------------------

const createCommunitySchema = z.object({
    name: z
        .string()
        .min(3, {message: 'Community name must be at least 3 characters'})
        .max(100, {message: 'Community name must not be more than 100 characters'}),

    description: z
        .string()
        .max(500, {message: 'Community description must not be more than 500 characters'}),
});

export async function createCommunity(prevState: string | undefined, formData: FormData) {
    const validatedField = createCommunitySchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    });

    if (!validatedField.success) {
        return {
            errors: validatedField.error.flatten().fieldErrors,
            message: 'Missing or invalid fields, failed to create account'
        }
    }

    // TODO
}
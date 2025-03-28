import {z} from "zod";

// for comments on how this works go to createAccount, basically same logic
const createPostSchema = z.object({
    title: z
        .string()
        .min(3, {message: 'Post title must be at least 3 characters'})
        .max(100, {message: 'Post title must not be more than 100 characters'}),

    content: z
        .string()
        .max(10000, {message: 'Post content myst not be more than 10,000 characters'}),
});

export async function createPost(_prevState: string | undefined, formData: FormData) {
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
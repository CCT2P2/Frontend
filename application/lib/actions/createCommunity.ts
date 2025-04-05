import {z} from "zod";

// for comments on how this works go to createAccount, basically same logic
const createCommunitySchema = z.object({
    name: z
        .string()
        .min(3, {message: 'Community name must be at least 3 characters'})
        .max(100, {message: 'Community name must not be more than 100 characters'}),

    description: z
        .string()
        .max(500, {message: 'Community description must not be more than 500 characters'}),
});

export async function createCommunity(_prevState: string | undefined, formData: FormData) {
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
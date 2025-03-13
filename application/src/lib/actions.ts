import {z} from "zod";

export async function signIn(prevState: string | undefined, formData: FormData) {
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        // TODO
    } catch (error) {
        return {error: error};
    }
}

const CreateAccountSchema = z.object({
    username: z
        .string()
        .min(3, {message: 'Username must be at least 3 characters'})
        .max(20, {message: 'Username must not be more than 20 characters'})
        .regex(/^[a-zA-Z0-9_]+$/, {message: 'Username can only contain letters, numbers and underscores'}),

    email: z
        .string()
        .email({message: 'Invalid email address'}),

    password: z
        .string()
        .min(6, {message: 'Password must be at least 6 characters'})
})

export async function createAccount(prevState: string | undefined, formData: FormData) {
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
    
    // TODO
}